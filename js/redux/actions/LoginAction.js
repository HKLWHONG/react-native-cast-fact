/**
 * @format
 * @flow strict-local
 */

import { LoginActionType } from '../types';

export const setLoginId = (loginId) => (dispatch) => {
  dispatch({
    type: LoginActionType.CREDENTIALS_ID,
    loginId: loginId,
  });

  return Promise.resolve();
};

export const setLoginIdMessage = (loginIdMessage) => (dispatch) => {
  dispatch({
    type: LoginActionType.CREDENTIALS_ID_MESSAGE,
    loginIdMessage: loginIdMessage,
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
