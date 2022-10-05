/**
 * @format
 * @flow strict-local
 */

import { SearchResultActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchResultActionType.RESET,
  });

  return Promise.resolve();
};

export const setFeeds = (feeds) => (dispatch) => {
  dispatch({
    type: SearchResultActionType.FEEDS,
    feeds: feeds || [],
  });

  return Promise.resolve();
};

export const updateFeed = (feedId, object) => (dispatch) => {
  dispatch({
    type: SearchResultActionType.FEEDS_UPDATE_FEED,
    feedId: feedId,
    object: object,
  });

  return Promise.resolve();
};
