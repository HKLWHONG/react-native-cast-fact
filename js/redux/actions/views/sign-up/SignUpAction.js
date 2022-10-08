/**
 * @format
 * @flow strict-local
 */

import { store, SignUpActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SignUpActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setName = (name) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_NAME,
    name: name,
  });

  return Promise.resolve(store.getState());
};

export const setNameMessage = (nameMessage) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_NAME_MESSAGE,
    nameMessage: nameMessage,
  });

  return Promise.resolve(store.getState());
};

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_EMAIL,
    email: email,
  });

  return Promise.resolve(store.getState());
};

export const setEmailMessage = (emailMessage) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_EMAIL_MESSAGE,
    emailMessage: emailMessage,
  });

  return Promise.resolve(store.getState());
};

export const setPhoneCode = (phoneCode) => (dispatch) => {
  console.log('[phoneCode] ', phoneCode);

  if (phoneCode && !phoneCode.startsWith('+')) {
    phoneCode = '+' + phoneCode;
  }

  dispatch({
    type: SignUpActionType.ACCOUNT_PHONE_CODE,
    phoneCode: phoneCode,
  });

  return Promise.resolve(store.getState());
};

export const setPhoneNumber = (phoneNumber) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_PHONE_NUMBER,
    phoneNumber: phoneNumber,
  });

  return Promise.resolve(store.getState());
};

export const setPhoneMessage = (phoneMessage) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_PHONE_MESSAGE,
    phoneMessage: phoneMessage,
  });

  return Promise.resolve(store.getState());
};

export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_PASSWORD,
    password: password,
  });

  return Promise.resolve(store.getState());
};

export const setPasswordMessage = (passwordMessage) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_PASSWORD_MESSAGE,
    passwordMessage: passwordMessage,
  });

  return Promise.resolve(store.getState());
};
