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
  Common,
  FeedProcessor,
} from '../utils';

import {
  SearchApi,
} from '../apis';

const IDENTIFIER = 'SearchProvider';

export const presearch = async (props) => {
  let page = 1;

  let json = await search(props, {
    page: page,
    length: store.getState().searchResultReducer.feedsPaging.length,
  })
    .catch((error) => {
      console.error(error);
    });

  if (json && json.payload) {
    store.dispatch(SearchResultAction.setFeedsPagingPage(page));

    let feeds = FeedProcessor.format([], json.payload);

    store.dispatch(SearchResultAction.setFeeds(feeds));
  }
};

export const search = (props, params, options) => {
  return new Promise((resolve, reject) => {
    if (!params || !params.prefetch) {
      store.dispatch(SearchResultAction.setSearched(false));
    }

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

          store.dispatch(SearchResultAction.setSearched(true));
        }

        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
