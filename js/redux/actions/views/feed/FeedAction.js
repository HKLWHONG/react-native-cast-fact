/**
 * @format
 * @flow strict-local
 */

import { store, FeedActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: FeedActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setRef = (ref) => (dispatch) => {
  dispatch({
    type: FeedActionType.REF,
    ref: ref,
  });

  return Promise.resolve(store.getState());
};

export const setRefreshing = (refreshing) => (dispatch) => {
  dispatch({
    type: FeedActionType.REFRESHING,
    refreshing: refreshing,
  });

  return Promise.resolve(store.getState());
};

export const setFeeds = (feeds) => (dispatch) => {
  dispatch({
    type: FeedActionType.FEEDS,
    feeds: feeds || [],
  });

  return Promise.resolve(store.getState());
};

export const updateFeed = (feedId, object) => (dispatch) => {
  dispatch({
    type: FeedActionType.FEEDS_UPDATE_FEED,
    feedId: feedId,
    object: object,
  });

  return Promise.resolve(store.getState());
};
