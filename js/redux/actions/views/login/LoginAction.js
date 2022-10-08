/**
 * @format
 * @flow strict-local
 */

import { store, LoginActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: LoginActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: LoginActionType.CREDENTIALS_EMAIL,
    email: email,
  });

  return Promise.resolve(store.getState());
};

export const setEmailMessage = (emailMessage) => (dispatch) => {
  dispatch({
    type: LoginActionType.CREDENTIALS_EMAIL_MESSAGE,
    emailMessage: emailMessage,
  });

  return Promise.resolve(store.getState());
};

export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: LoginActionType.CREDENTIALS_PASSWORD,
    password: password,
  });

  return Promise.resolve(store.getState());
};

export const setPasswordMessage = (passwordMessage) => (dispatch) => {
  dispatch({
    type: LoginActionType.CREDENTIALS_PASSWORD_MESSAGE,
    passwordMessage: passwordMessage,
  });

  return Promise.resolve(store.getState());
};
