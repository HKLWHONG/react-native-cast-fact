/**
 * @format
 * @flow strict-local
 */

import { store, FindTalentSectionActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: FindTalentSectionActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setTags = (tags) => (dispatch) => {
  dispatch({
    type: FindTalentSectionActionType.TAGS,
    tags: tags,
  });

  return Promise.resolve(store.getState());
};

export const updateGroupFrame = (groupFrameId, object) => (dispatch) => {
  dispatch({
    type: FindTalentSectionActionType.TAGS_UPDATE_GROUP_FRAME,
    groupFrameId: groupFrameId,
    object: object,
  });

  return Promise.resolve(store.getState());
};

export const updateTag = (groupFrameId, tagId, object) => (dispatch) => {
  dispatch({
    type: FindTalentSectionActionType.TAGS_UPDATE_TAG,
    groupFrameId: groupFrameId,
    tagId: tagId,
    object: object,
  });

  return Promise.resolve(store.getState());
};
