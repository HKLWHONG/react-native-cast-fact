/**
 * @format
 * @flow strict-local
 */

import { store } from '../redux';

import { AppRegex } from '../regex';

export const validateNameDisplayFormat_0 = () => {
  const { props } = this;

  const { account } = store.getState().profileInfoSetupViewReducer;

  let isValid = false;

  if (
    account.info.nickname
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.nickname)
  ) {
    isValid = true;
  } else if (
    account.info.lastnameEn
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.lastnameEn)
  ) {
    isValid = true;
  } else if (
    account.info.lastnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.lastnameZh)
  ) {
    isValid = true;
  } else if (
    account.info.firstnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.firstnameZh)
  ) {
    isValid = true;
  }

  return isValid;
};

export const validateNameDisplayFormat_1 = () => {
  const { props } = this;

  const { account } = store.getState().profileInfoSetupViewReducer;

  let isValid = false;

  if (
    account.info.firstnameEn
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.firstnameEn)
  ) {
    isValid = true;
  } else if (
    account.info.lastnameEn
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.lastnameEn)
  ) {
    isValid = true;
  } else if (
    account.info.lastnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.lastnameZh)
  ) {
    isValid = true;
  } else if (
    account.info.firstnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.firstnameZh)
  ) {
    isValid = true;
  }

  return isValid;
};

export const validateNameDisplayFormat_2 = () => {
  const { props } = this;

  const { account } = store.getState().profileInfoSetupViewReducer;

  let isValid = false;

  if (
    account.info.nickname
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.nickname)
  ) {
    isValid = true;
  } else if (
    account.info.lastnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.lastnameZh)
  ) {
    isValid = true;
  } else if (
    account.info.firstnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.firstnameZh)
  ) {
    isValid = true;
  }

  return isValid;
};

export const validateNameDisplayFormat_3 = () => {
  const { props } = this;

  const { account } = store.getState().profileInfoSetupViewReducer;

  let isValid = false;

  if (
    account.info.nickname
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.nickname)
  ) {
    isValid = true;
  }

  return isValid;
};
