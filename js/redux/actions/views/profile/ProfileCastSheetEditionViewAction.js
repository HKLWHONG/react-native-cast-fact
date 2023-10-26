/**
 * @format
 * @flow strict-local
 */

import { store, ProfileCastSheetEditionViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: ProfileCastSheetEditionViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setAccountInfo = (info) => (dispatch) => {
  dispatch({
    type: ProfileCastSheetEditionViewActionType.SET_ACCOUNT_INFO,
    info: info,
  });

  return Promise.resolve(store.getState());
};

export const addAccountInfo = (key, value) => (dispatch) => {
  dispatch({
    type: ProfileCastSheetEditionViewActionType.ADD_ACCOUNT_INFO,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};

export const deleteAccountInfo = (key) => (dispatch) => {
  dispatch({
    type: ProfileCastSheetEditionViewActionType.DELETE_ACCOUNT_INFO,
    key: key,
  });

  return Promise.resolve(store.getState());
};

export const setDeleteInfo = (key, deleteTag) => (dispatch) => {
  dispatch({
    type: ProfileCastSheetEditionViewActionType.SET_DELETE_INFO,
    key: key,
    deleteTag: deleteTag
  });

  return Promise.resolve(store.getState());
};

export const setFocusedTag = (focusedTag) => (dispatch) => {
  dispatch({
    type: ProfileCastSheetEditionViewActionType.FOCUSED_TAG,
    focusedTag: focusedTag,
  });

  return Promise.resolve(store.getState());
};

export const setNavigator = (navigator) => (dispatch) => {
  dispatch({
    type: ProfileCastSheetEditionViewActionType.SET_NAVIGATOR,
    navigator: navigator
  })
}