/**
 * @format
 * @flow strict-local
 */

import { FeedActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: FeedActionType.RESET,
  });

  return Promise.resolve();
};

export const setFeeds = (feeds) => (dispatch) => {
  dispatch({
    type: FeedActionType.FEEDS,
    feeds: feeds || [],
  });

  return Promise.resolve();
};

export const updateFeed = (feedId, object) => (dispatch) => {
  dispatch({
    type: FeedActionType.FEEDS_UPDATE_FEED,
    feedId: feedId,
    object: object,
  });

  return Promise.resolve();
};
