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

export const setFocusedTag = (focusedTag) => (dispatch) => {
  dispatch({
    type: ProfileCastSheetEditionViewActionType.FOCUSED_TAG,
    focusedTag: focusedTag,
  });

  return Promise.resolve(store.getState());
};
