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

export const addRef = (refId, refObject) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ADD_REF,
    refId: refId,
    refObject: refObject,
  });

  return Promise.resolve(store.getState());
};

export const setFirstnameEn = (firstnameEn) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_FIRSTNAME_EN,
    firstnameEn: firstnameEn,
  });

  return Promise.resolve(store.getState());
};

export const setLastnameEn = (lastnameEn) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_LASTNAME_EN,
    lastnameEn: lastnameEn,
  });

  return Promise.resolve(store.getState());
};

export const setFirstnameZh = (firstnameZh) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_FIRSTNAME_ZH,
    firstnameZh: firstnameZh,
  });

  return Promise.resolve(store.getState());
};

export const setLastnameZh = (lastnameZh) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_LASTNAME_ZH,
    lastnameZh: lastnameZh,
  });

  return Promise.resolve(store.getState());
};

export const setNickname = (nickname) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_NICKNAME,
    nickname: nickname,
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

export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: SignUpActionType.ACCOUNT_PASSWORD,
    password: password,
  });

  return Promise.resolve(store.getState());
};
