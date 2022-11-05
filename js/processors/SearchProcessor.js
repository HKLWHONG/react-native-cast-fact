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

      let referenceTag = undefined;

      let referenceTags = groupFrame.data.filter((referenceTag) => {
        return (
          referenceTag.referenceId === tag.id
          &&
          referenceTag.checked
        );
      });

      if (referenceTags.length > 0) {
        referenceTag = referenceTags[0];
      }

      tags = CriteriaProcessor.addTag(
        tags,
        {
          ...tag,
          text: TagProcessor.toReferenceString(tag, referenceTag),
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
