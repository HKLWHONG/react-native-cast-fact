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
        ||
        tag.type.toLowerCase() === 'reference'.toLowerCase()
      ) {
        return;
      }

      if (!groupFrame.checked) {
        return;
      }

      tags = CriteriaProcessor.addTag(
        tags,
        {
          ...tag,
          text: TagProcessor.toReferenceString(tag, TagProcessor.getReferenceTag(groupFrame, tag)),
        },
      );
    });
  });

  let text = store.getState().searchBarReducer.text;

  if (text && text.length > 0) {
    tags = CriteriaProcessor.addTag(tags, { text: text, isManual: true });
  }

  return tags;
};
