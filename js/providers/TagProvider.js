/**
 * @format
 * @flow strict-local
 */

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

import {
  ListTagByCategoryApi,
} from '../apis';

import i18n from '../../i18n';

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
        .then((tags) => {
          if (JSON.stringify(cachedTags) !== JSON.stringify(tags)) {
            console.log(`[${IDENTIFIER}] need-to-reload-tags.`);

            store.dispatch(FindTalentSectionAction.setTags(tags));

            TagProcessor.reload();
          } else {
            console.log(`[${IDENTIFIER}] no-need-to-reload-tags.`);
          }

          resolve(tags);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      console.log(`[${IDENTIFIER}] no-cached-tags.`);

      getTags(props, params, options)
        .then((tags) => {
          store.dispatch(FindTalentSectionAction.setTags(tags));

          TagProcessor.reload();

          resolve(tags);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

export const getTags = (props, params, options) => {
  return new Promise((resolve, reject) => {
    ListTagByCategoryApi.request(
      props,
      params,
      options,
    )
      .then((params) => {
        const { json } = params;

        let tags = Constants.TAGS.map((tag) => {
          if (
            tag.label.toLowerCase() === Constants.HEIGHT.toLowerCase()
            ||
            tag.label.toLowerCase() === Constants.WEIGHT.toLowerCase()
            ||
            tag.label.toLowerCase() === Constants.AGE.toLowerCase()
          ) {
            return tag;
          }

          json.forEach((item) => {
            // console.log('[tag-item]', item);

            if (tag.label.toLowerCase() !== item.category_name.toLowerCase()) {
              return;
            }

            tag.data = item.tags.map((tag) => {
              if (
                item.category_name.toLowerCase() === Constants.EYES_COLOR.toLowerCase()
                ||
                item.category_name.toLowerCase() === Constants.HAIR_COLOR.toLowerCase()
                ||
                item.category_name.toLowerCase() === Constants.SKIN_COLOR.toLowerCase()
              ) {
                tag = {
                  ...tag,
                  leftAccessoryType: 'dot',
                  suffix: Constants.TAGS_SUFFIX_MAPPING[item.category_name.toLowerCase()],
                  color: Constants.TAGS_COLOR_MAPPING[tag.text.toLowerCase()],
                }
              }

              return {
                ...tag,
              }
            });
          });

          return tag;
        });

        tags = TagProcessor.format(tags);

        console.log('[tags]', JSON.stringify(tags));

        TagStorage.setTags(tags)
          .catch((error) => {
            console.error(error);
          });

        store.dispatch(DataAction.setFindTalentSectionTags(tags));

        resolve(tags);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
