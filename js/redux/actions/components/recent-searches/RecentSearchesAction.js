/**
 * @format
 * @flow strict-local
 */

import { RecentSearchesActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: RecentSearchesActionType.RESET,
  });

  return Promise.resolve();
};

export const setTags = (tags) => (dispatch) => {
  dispatch({
    type: RecentSearchesActionType.TAGS,
    tags: tags,
  });

  return Promise.resolve();
};

export const deleteGroupFrame = (groupFrameId) => (dispatch) => {
  dispatch({
    type: RecentSearchesActionType.TAGS_DELETE_GROUP_FRAME,
    groupFrameId: groupFrameId,
  });

  return Promise.resolve();
};

export const deleteTags = () => (dispatch) => {
  dispatch({
    type: RecentSearchesActionType.TAGS,
    tags: [],
  });

  return Promise.resolve();
};
