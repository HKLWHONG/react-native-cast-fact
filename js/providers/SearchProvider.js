/**
 * @format
 * @flow strict-local
 */

import {
  store,
  CriteriaSectionAction,
  SearchResultAction,
} from '../redux';

import {
  SearchApi,
} from '../apis';

export const search = (props, params, options) => {
  return new Promise((resolve, reject) => {
    let tags = [];

    store.getState().criteriaSectionReducer.tags.forEach((groupFrame) => {
      let data = groupFrame.data || [];

      tags = [...tags, ...data];
    });

    SearchApi.request(
      props,
      {
        tags: (params && params.tags) || JSON.stringify(tags),
        page: params && params.page,
        length: params && params.length,
        prefetch: params && params.prefetch,
      },
      {},
    )
      .then((json) => {
        if (params && params.prefetch) {
          console.log('[json.payload.length]', json.payload.length);
          store.dispatch(CriteriaSectionAction.setLengthOfResults(json.payload.length));
        } else {
          store.dispatch(SearchResultAction.setResults(json.payload));
        }

        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
