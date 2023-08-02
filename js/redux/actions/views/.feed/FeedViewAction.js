/**
 * @format
 * @flow strict-local
 */

import { store, FeedViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: FeedViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setRefreshing = (refreshing) => (dispatch) => {
  dispatch({
    type: FeedViewActionType.REFRESHING,
    refreshing: refreshing,
  });

  return Promise.resolve(store.getState());
};

export const setFeedsPagingLoading = (loading) => (dispatch) => {
  dispatch({
    type: FeedViewActionType.FEEDS_PAGING_LOADING,
    loading: loading,
  });

  return Promise.resolve(store.getState());
};

export const setFeedsPagingPage = (page) => (dispatch) => {
  dispatch({
    type: FeedViewActionType.FEEDS_PAGING_PAGE,
    page: page,
  });

  return Promise.resolve(store.getState());
};

export const setFeedsPagingLength = (length) => (dispatch) => {
  dispatch({
    type: FeedViewActionType.FEEDS_PAGING_LENGTH,
    length: length,
  });

  return Promise.resolve(store.getState());
};

export const setFeeds = (feeds) => (dispatch) => {
  dispatch({
    type: FeedViewActionType.FEEDS,
    feeds: feeds || [],
  });

  return Promise.resolve(store.getState());
};

export const updateFeed = (feedId, object) => (dispatch) => {
  dispatch({
    type: FeedViewActionType.FEEDS_UPDATE_FEED,
    feedId: feedId,
    object: object,
  });

  return Promise.resolve(store.getState());
};
