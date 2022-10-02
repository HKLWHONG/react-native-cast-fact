/**
 * @format
 * @flow strict-local
 */

import { LoginActionType } from '../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: LoginActionType.RESET,
  });

  return Promise.resolve();
};

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: LoginActionType.CREDENTIALS_EMAIL,
    email: email,
  });

  return Promise.resolve();
};

export const setEmailMessage = (emailMessage) => (dispatch) => {
  dispatch({
    type: LoginActionType.CREDENTIALS_EMAIL_MESSAGE,
    emailMessage: emailMessage,
  });

  return Promise.resolve();
};

export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: LoginActionType.CREDENTIALS_PASSWORD,
    password: password,
  });

  return Promise.resolve();
};

export const setPasswordMessage = (passwordMessage) => (dispatch) => {
  dispatch({
    type: LoginActionType.CREDENTIALS_PASSWORD_MESSAGE,
    passwordMessage: passwordMessage,
  });

  return Promise.resolve();
};
