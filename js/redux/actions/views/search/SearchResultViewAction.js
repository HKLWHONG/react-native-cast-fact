/**
 * @format
 * @flow strict-local
 */

import { store, SearchResultViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setRefreshing = (refreshing) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.REFRESHING,
    refreshing: refreshing,
  });

  return Promise.resolve(store.getState());
};

export const setSearched = (searched) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.SEARCHED,
    searched: searched,
  });

  return Promise.resolve(store.getState());
};

export const setResults = (results) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.RESULTS,
    results: results,
  });

  return Promise.resolve(store.getState());
};

export const setFeedsPagingLoading = (loading) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.FEEDS_PAGING_LOADING,
    loading: loading,
  });

  return Promise.resolve(store.getState());
};

export const setFeedsPagingPage = (page) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.FEEDS_PAGING_PAGE,
    page: page,
  });

  return Promise.resolve(store.getState());
};

export const setFeedsPagingLength = (length) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.FEEDS_PAGING_LENGTH,
    length: length,
  });

  return Promise.resolve(store.getState());
};

export const setFeeds = (feeds) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.FEEDS,
    feeds: feeds,
  });

  return Promise.resolve(store.getState());
};

export const updateFeed = (feedId, object) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.FEEDS_UPDATE_FEED,
    feedId: feedId,
    object: object,
  });

  return Promise.resolve(store.getState());
};
