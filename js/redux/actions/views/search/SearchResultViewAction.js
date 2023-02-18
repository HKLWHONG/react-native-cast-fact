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

export const setSearchResultListType = (searchResultListType) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.SEARCH_RESULT_LIST_TYPE,
    searchResultListType: searchResultListType,
  });

  return Promise.resolve(store.getState());
};

export const setSearchResultListPagingLoading = (loading) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.SEARCH_RESULT_LIST_PAGING_LOADING,
    loading: loading,
  });

  return Promise.resolve(store.getState());
};

export const setSearchResultListPagingPage = (page) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.SEARCH_RESULT_LIST_PAGING_PAGE,
    page: page,
  });

  return Promise.resolve(store.getState());
};

export const setSearchResultListPagingLength = (length) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.SEARCH_RESULT_LIST_PAGING_LENGTH,
    length: length,
  });

  return Promise.resolve(store.getState());
};

export const setSearchResultListData = (searchResultListData) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.SEARCH_RESULT_LIST_DATA,
    searchResultListData: searchResultListData,
  });

  return Promise.resolve(store.getState());
};

export const updateSearchResultListData = (resultId, object) => (dispatch) => {
  dispatch({
    type: SearchResultViewActionType.SEARCH_RESULT_LIST_UPDATE_DATA,
    resultId: resultId,
    object: object,
  });

  return Promise.resolve(store.getState());
};
