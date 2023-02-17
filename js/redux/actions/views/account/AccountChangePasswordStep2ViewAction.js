/**
 * @format
 * @flow strict-local
 */

import { store, AccountChangePasswordStep2ViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: AccountChangePasswordStep2ViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const addRef = (key, value) => (dispatch) => {
  dispatch({
    type: AccountChangePasswordStep2ViewActionType.ADD_REF,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};

export const setNewPassword = (newPassword) => (dispatch) => {
  dispatch({
    type: AccountChangePasswordStep2ViewActionType.ACCOUNT_NEW_PASSWORD,
    newPassword: newPassword,
  });

  return Promise.resolve(store.getState());
};

export const setConfirmation = (confirmation) => (dispatch) => {
  dispatch({
    type: AccountChangePasswordStep2ViewActionType.ACCOUNT_CONFIRMATION,
    confirmation: confirmation,
  });

  return Promise.resolve(store.getState());
};
