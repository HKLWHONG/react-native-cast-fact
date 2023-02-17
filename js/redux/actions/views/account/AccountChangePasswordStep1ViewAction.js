/**
 * @format
 * @flow strict-local
 */

import { store, AccountChangePasswordStep1ViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: AccountChangePasswordStep1ViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const addRef = (key, value) => (dispatch) => {
  dispatch({
    type: AccountChangePasswordStep1ViewActionType.ADD_REF,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};

export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: AccountChangePasswordStep1ViewActionType.ACCOUNT_PASSWORD,
    password: password,
  });

  return Promise.resolve(store.getState());
};
