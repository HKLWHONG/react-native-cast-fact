/**
 * @format
 * @flow strict-local
 */

import { store, ProfileInfoSetupViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setNumberOfIndicators = (numberOfIndicators) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupViewActionType.NUMBER_OF_INDICATORS,
    numberOfIndicators: numberOfIndicators,
  });

  return Promise.resolve(store.getState());
};

export const setPhoto = (photo) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupViewActionType.PHOTO,
    photo: photo,
  });

  return Promise.resolve(store.getState());
};

export const setFirstnameEn = (firstnameEn) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupViewActionType.ACCOUNT_FIRSTNAME_EN,
    firstnameEn: firstnameEn,
  });

  return Promise.resolve(store.getState());
};

export const setLastnameEn = (lastnameEn) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupViewActionType.ACCOUNT_LASTNAME_EN,
    lastnameEn: lastnameEn,
  });

  return Promise.resolve(store.getState());
};

export const setFirstnameZh = (firstnameZh) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupViewActionType.ACCOUNT_FIRSTNAME_ZH,
    firstnameZh: firstnameZh,
  });

  return Promise.resolve(store.getState());
};

export const setLastnameZh = (lastnameZh) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupViewActionType.ACCOUNT_LASTNAME_ZH,
    lastnameZh: lastnameZh,
  });

  return Promise.resolve(store.getState());
};

export const setNickname = (nickname) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupViewActionType.ACCOUNT_NICKNAME,
    nickname: nickname,
  });

  return Promise.resolve(store.getState());
};

export const setDisplayFormat = (displayFormat) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupViewActionType.ACCOUNT_DISPLAY_FORMAT,
    displayFormat: displayFormat,
  });

  return Promise.resolve(store.getState());
};
