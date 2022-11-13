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
  GetTagApi,
} from '../apis';

const IDENTIFIER = 'TagProvider';

export const prefetchTags = (props, params, options) => {
  return new Promise(async (resolve, reject) => {
    let cachedTags = await TagStorage.getTags()
      .catch((error) => {
        console.error(error);
      });

    if (cachedTags) {
      console.log(`[${IDENTIFIER}] cached-tags-found.`);

      store.dispatch(DataAction.setFindTalentSectionTags(cachedTags));
      store.dispatch(FindTalentSectionAction.setTags(cachedTags));

      TagProcessor.reload();

      getTags(props, params, options)
        .then((params) => {
          const { json } = params;

          let tags = TagProcessor.format(json.payload);

          TagStorage.setTags(tags)
            .catch((error) => {
              console.error(error);
            });

          if (JSON.stringify(cachedTags) !== JSON.stringify(tags)) {
            console.log(`[${IDENTIFIER}] need-to-reload-tags.`);

            store.dispatch(DataAction.setFindTalentSectionTags(tags));
            store.dispatch(FindTalentSectionAction.setTags(tags));

            TagProcessor.reload();
          } else {
            console.log(`[${IDENTIFIER}] no-need-to-reload-tags.`);
          }

          resolve(params);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      console.log(`[${IDENTIFIER}] no-cached-tags.`);

      getTags(props, params, options)
        .then((params) => {
          const { json } = params;

          let tags = TagProcessor.format(json.payload);

          TagStorage.setTags(tags)
            .catch((error) => {
              console.error(error);
            });

          store.dispatch(DataAction.setFindTalentSectionTags(tags));
          store.dispatch(FindTalentSectionAction.setTags(tags));

          TagProcessor.reload();

          resolve(params);
        })
        .catch((error) => {
          reject(error);
        });
    }
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
