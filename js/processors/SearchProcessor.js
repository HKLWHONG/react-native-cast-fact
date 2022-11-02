/**
 * @format
 * @flow strict-local
 */

import { Environment } from '../config';

import { store, CriteriaSectionAction } from '../redux';

import { CriteriaProcessor, TagProcessor } from '../processors';

export const format = (tags) => {
  if (!tags || tags.length === 0) {
    return [];
  }

  // console.log('[tags]', tags);

  let formattedTags = [];

  tags.forEach((groupFrame) => {
    let data = groupFrame.data || [];

    formattedTags = [...formattedTags, ...data];
  });

  return formattedTags;
};

export const reload = () => {
  store.dispatch(CriteriaSectionAction.setTags(getCriteriaTags()));
};

export const getCriteriaTags = () => {
  let tags = [...store.getState().criteriaSectionReducer.tags];

  store.getState().findTalentSectionReducer.tags.forEach((groupFrame) => {
    groupFrame.data.forEach((tag) => {
      if (
        !tag.type
        ||
        tag.type.toLowerCase() === 'default'.toLowerCase()
      ) {
        return;
      }

      if (!groupFrame.checked) {
        return;
      }

      let referencePrefix = undefined;
      let referenceSuffix = undefined;

      let referenceTags = groupFrame.data.filter((referenceTag) => {
        return (
          referenceTag.referenceId === tag.id
          &&
          referenceTag.checked
        );
      });

      if (referenceTags.length > 0) {
        referencePrefix = referenceTags[0].prefix;
        referenceSuffix = referenceTags[0].suffix;
      }

      if (tag.type.toLowerCase() === 'input'.toLowerCase()) {
        tags = CriteriaProcessor.addTag(
          tags,
          {
            ...tag,
            text: TagProcessor.toString({
              ...tag,
              prefix: referencePrefix || tag.prefix,
              suffix: referenceSuffix || tag.suffix,
            }),
          },
        );
      } else if (tag.type.toLowerCase() === 'range'.toLowerCase()) {
        tags = CriteriaProcessor.addTag(
          tags,
          {
            ...tag,
            text: TagProcessor.toRangeString({
              ...tag,
              prefix: referencePrefix || tag.prefix,
              suffix: referenceSuffix || tag.suffix,
            }),
          },
        );
      }
    });
  });

  let text = store.getState().searchBarReducer.text;

  if (text && text.length > 0) {
    tags = CriteriaProcessor.addTag(tags, { text: text, isManual: true });
  }

  return tags;
};
