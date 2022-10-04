/**
 * @format
 * @flow strict-local
 */

import { CriteriaSectionActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: CriteriaSectionActionType.RESET,
  });

  return Promise.resolve();
};

export const setTags = (tags) => (dispatch) => {
  dispatch({
    type: CriteriaSectionActionType.TAGS,
    tags: tags,
  });

  return Promise.resolve();
};

export const addTag = (tag) => (dispatch) => {
  dispatch({
    type: CriteriaSectionActionType.TAGS_ADD_TAG,
    tag: tag,
  });

  return Promise.resolve();
};

export const deleteTag = (groupFrameId, tagId) => (dispatch) => {
  dispatch({
    type: CriteriaSectionActionType.TAGS_DELETE_TAG,
    groupFrameId: groupFrameId,
    tagId: tagId,
  });

  return Promise.resolve();
};
