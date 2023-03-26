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

import {
  ListTagByCategoryApi,
} from '../apis';

const IDENTIFIER = 'TagProvider';

export const prefetchTags = (props, params, options) => {
  return new Promise(async (resolve, reject) => {

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

        store.dispatch(DataAction.setFindTalentSectionTags(tags));
        store.dispatch(FindTalentSectionAction.setTags(tags));

        TagProcessor.reload();

        resolve(params);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
