/**
 * @format
 * @flow strict-local
 */

import i18n from '../../i18n';

import {
  store,
  DataAction,
  FindTalentSectionAction,
} from '../redux';

import {
  Common,
} from '../utils';

import {
  TagProcessor
} from '../processors';

import {
  TagStorage,
} from '../storages';

import {
  Constants,
} from '../constants';

const IDENTIFIER = 'TagProvider';

export const prefetchTags = () => {
  return new Promise(async (resolve, reject) => {
    console.log(`[${IDENTIFIER}] cached-tags-found.`);

    const tags = TagProcessor.format(Constants.TAGS);

    store.dispatch(DataAction.setFindTalentSectionTags(tags));
    store.dispatch(FindTalentSectionAction.setTags(tags));

    TagProcessor.reload();

    resolve();
  });
};

export const getTags = (props, params, options) => {
  return new Promise((resolve, reject) => {
    GetTagApi.request(
      props,
      params,
      options,
    )
      .then((params) => {
        const { json } = params;

        store.dispatch(DataAction.setFindTalentSectionTags(TagProcessor.format(json.payload)));

        resolve(params);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
