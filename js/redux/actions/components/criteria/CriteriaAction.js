/**
 * @format
 * @flow strict-local
 */

import { CriteriaActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: CriteriaActionType.RESET,
  });

  return Promise.resolve();
};

export const setText = (text) => (dispatch) => {
  dispatch({
    type: CriteriaActionType.TEXT,
    text: text,
  });

  return Promise.resolve();
};

export const setTags = (tags) => (dispatch) => {
  dispatch({
    type: CriteriaActionType.TAGS,
    tags: tags,
  });

  return Promise.resolve();
};

export const addTag = (tag) => (dispatch) => {
  dispatch({
    type: CriteriaActionType.TAGS_ADD_TAG,
    tag: tag,
  });

  return Promise.resolve();
};

export const deleteTag = (groupFrameId, tagId) => (dispatch) => {
  dispatch({
    type: CriteriaActionType.TAGS_DELETE_TAG,
    groupFrameId: groupFrameId,
    tagId: tagId,
  });

  return Promise.resolve();
};
