/**
 * @format
 * @flow strict-local
 */

import { store, LoginViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: LoginViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const addRef = (key, value) => (dispatch) => {
  dispatch({
    type: LoginViewActionType.ADD_REF,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: LoginViewActionType.CREDENTIALS_EMAIL,
    email: email,
  });

  return Promise.resolve(store.getState());
};

export const setEmailMessage = (emailMessage) => (dispatch) => {
  dispatch({
    type: LoginViewActionType.CREDENTIALS_EMAIL_MESSAGE,
    emailMessage: emailMessage,
  });

  return Promise.resolve(store.getState());
};

export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: LoginViewActionType.CREDENTIALS_PASSWORD,
    password: password,
  });

  return Promise.resolve(store.getState());
};

export const setPasswordMessage = (passwordMessage) => (dispatch) => {
  dispatch({
    type: LoginViewActionType.CREDENTIALS_PASSWORD_MESSAGE,
    passwordMessage: passwordMessage,
  });

  return Promise.resolve(store.getState());
};
