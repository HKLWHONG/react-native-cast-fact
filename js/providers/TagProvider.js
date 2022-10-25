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
  TagProcessor,
} from '../utils';

import {
  TagStorage,
} from '../storages';

import {
  GetTagApi,
} from '../apis';

const IDENTIFIER = 'TagProvider';

export const fetchTags = async (props) => {
  let cachedTags = await TagStorage.getTags()
    .catch((error) => {
      console.error(error);
    });

  if (cachedTags) {
    console.log(`[${IDENTIFIER}] cached-tags-found.`);

    store.dispatch(DataAction.setTags(cachedTags));
    store.dispatch(FindTalentSectionAction.setTags(cachedTags));

    getTags(props, {})
      .then((json) => {
        let tags = TagProcessor.format(json.payload);

        TagStorage.setTags(tags)
          .catch((error) => {
            console.error(error);
          });

        if (JSON.stringify(cachedTags) !== JSON.stringify(tags)) {
          console.log(`[${IDENTIFIER}] need-to-reload-tags.`);

          store.dispatch(DataAction.setTags(tags));
          store.dispatch(FindTalentSectionAction.setTags(tags));
        } else {
          console.log(`[${IDENTIFIER}] no-need-to-reload-tags.`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log(`[${IDENTIFIER}] no-cached-tags.`);

    let json = await getTags(props, {})
      .catch((error) => {
        console.error(error);
      });

    if (json && json.payload) {
      let tags = TagProcessor.format(json.payload);

      TagStorage.setTags(tags)
        .catch((error) => {
          console.error(error);
        });

      store.dispatch(DataAction.setTags(tags));
      store.dispatch(FindTalentSectionAction.setTags(tags));
    }
  }
};

export const getTags = (props, params, options) => {
  return new Promise((resolve, reject) => {
    GetTagApi.request(
      props,
      {},
      {},
    )
      .then((json) => {
        store.dispatch(DataAction.setTags(TagProcessor.format(json.payload)));

        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
