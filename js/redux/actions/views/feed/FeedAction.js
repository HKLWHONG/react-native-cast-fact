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

export const setFeedList = (feedList) => (dispatch) => {
  dispatch({
    type: FeedActionType.FEED_LIST,
    feedList: feedList || [],
  });

  return Promise.resolve();
};

export const setFeedListFollowed = (feedId, isFollowed) => (dispatch) => {
  dispatch({
    type: FeedActionType.FEED_LIST_SET_FOLLOWED,
    feedId: feedId,
    isFollowed: isFollowed,
  });

  return Promise.resolve();
};

export const setFeedListLiked = (feedId, isLiked) => (dispatch) => {
  dispatch({
    type: FeedActionType.FEED_LIST_SET_LIKED,
    feedId: feedId,
    isLiked: isLiked,
  });

  return Promise.resolve();
};

export const setFeedListBookmarked = (feedId, isBookmarked) => (dispatch) => {
  dispatch({
    type: FeedActionType.FEED_LIST_SET_BOOKMARKED,
    feedId: feedId,
    isBookmarked: isBookmarked,
  });

  return Promise.resolve();
};
