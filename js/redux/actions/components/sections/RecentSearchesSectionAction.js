/**
 * @format
 * @flow strict-local
 */

import { RecentSearchesSectionActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: RecentSearchesSectionActionType.RESET,
  });

  return Promise.resolve();
};

export const setTags = (tags) => (dispatch) => {
  dispatch({
    type: RecentSearchesSectionActionType.TAGS,
    tags: tags,
  });

  return Promise.resolve();
};

export const deleteGroupFrame = (groupFrameId) => (dispatch) => {
  dispatch({
    type: RecentSearchesSectionActionType.TAGS_DELETE_GROUP_FRAME,
    groupFrameId: groupFrameId,
  });

  return Promise.resolve();
};

export const deleteTags = () => (dispatch) => {
  dispatch({
    type: RecentSearchesSectionActionType.TAGS,
    tags: [],
  });

  return Promise.resolve();
};
