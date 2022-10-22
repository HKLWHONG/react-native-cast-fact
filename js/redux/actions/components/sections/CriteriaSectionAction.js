/**
 * @format
 * @flow strict-local
 */

import { store, CriteriaSectionActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: CriteriaSectionActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setTags = (tags) => (dispatch) => {
  dispatch({
    type: CriteriaSectionActionType.TAGS,
    tags: tags,
  });

  return Promise.resolve(store.getState());
};

export const addTag = (tag) => (dispatch) => {
  dispatch({
    type: CriteriaSectionActionType.TAGS_ADD_TAG,
    tag: tag,
  });

  return Promise.resolve(store.getState());
};

export const deleteTag = (groupFrameId, tagId) => (dispatch) => {
  dispatch({
    type: CriteriaSectionActionType.TAGS_DELETE_TAG,
    groupFrameId: groupFrameId,
    tagId: tagId,
  });

  return Promise.resolve(store.getState());
};

export const setLengthOfResults = (lengthOfResults) => (dispatch) => {
  dispatch({
    type: CriteriaSectionActionType.LENGTH_OF_RESULTS,
    lengthOfResults: lengthOfResults,
  });

  return Promise.resolve(store.getState());
};
