/**
 * @format
 * @flow strict-local
 */

import { store, SearchResultActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchResultActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setRefreshing = (refreshing) => (dispatch) => {
  dispatch({
    type: SearchResultActionType.REFRESHING,
    refreshing: refreshing,
  });

  return Promise.resolve(store.getState());
};

export const setResults = (results) => (dispatch) => {
  dispatch({
    type: SearchResultActionType.RESULTS,
    results: results,
  });

  return Promise.resolve(store.getState());
};

export const setFeedsPagingLoading = (loading) => (dispatch) => {
  dispatch({
    type: SearchResultActionType.FEEDS_PAGING_LOADING,
    loading: loading,
  });

  return Promise.resolve(store.getState());
};

export const setFeedsPagingPage = (page) => (dispatch) => {
  dispatch({
    type: SearchResultActionType.FEEDS_PAGING_PAGE,
    page: page,
  });

  return Promise.resolve(store.getState());
};

export const setFeedsPagingLength = (length) => (dispatch) => {
  dispatch({
    type: SearchResultActionType.FEEDS_PAGING_LENGTH,
    length: length,
  });

  return Promise.resolve(store.getState());
};

export const setFeeds = (feeds) => (dispatch) => {
  dispatch({
    type: SearchResultActionType.FEEDS,
    feeds: feeds,
  });

  return Promise.resolve(store.getState());
};

export const updateFeed = (feedId, object) => (dispatch) => {
  dispatch({
    type: SearchResultActionType.FEEDS_UPDATE_FEED,
    feedId: feedId,
    object: object,
  });

  return Promise.resolve(store.getState());
};
