/**
 * @format
 * @flow strict-local
 */

import { store, ProfileInfoSetupSectionActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupSectionActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setNumberOfIndicators = (numberOfIndicators) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupSectionActionType.NUMBER_OF_INDICATORS,
    numberOfIndicators: numberOfIndicators,
  });

  return Promise.resolve(store.getState());
};

export const setPhoto = (photo) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupSectionActionType.PHOTO,
    photo: photo,
  });

  return Promise.resolve(store.getState());
};

export const setFirstnameEn = (firstnameEn) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupSectionActionType.ACCOUNT_FIRSTNAME_EN,
    firstnameEn: firstnameEn,
  });

  return Promise.resolve(store.getState());
};

export const setLastnameEn = (lastnameEn) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupSectionActionType.ACCOUNT_LASTNAME_EN,
    lastnameEn: lastnameEn,
  });

  return Promise.resolve(store.getState());
};

export const setFirstnameZh = (firstnameZh) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupSectionActionType.ACCOUNT_FIRSTNAME_ZH,
    firstnameZh: firstnameZh,
  });

  return Promise.resolve(store.getState());
};

export const setLastnameZh = (lastnameZh) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupSectionActionType.ACCOUNT_LASTNAME_ZH,
    lastnameZh: lastnameZh,
  });

  return Promise.resolve(store.getState());
};

export const setNickname = (nickname) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupSectionActionType.ACCOUNT_NICKNAME,
    nickname: nickname,
  });

  return Promise.resolve(store.getState());
};

export const setDisplayFormat = (displayFormat) => (dispatch) => {
  dispatch({
    type: ProfileInfoSetupSectionActionType.DISPLAY_FORMAT,
    displayFormat: displayFormat,
  });

  return Promise.resolve(store.getState());
};
