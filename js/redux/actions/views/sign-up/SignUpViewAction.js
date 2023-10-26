/**
 * @format
 * @flow strict-local
 */

import { store, SignUpViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const addRef = (key, value) => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.ADD_REF,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};

// export const setFirstnameEn = (firstnameEn) => (dispatch) => {
//   dispatch({
//     type: SignUpViewActionType.ACCOUNT_FIRSTNAME_EN,
//     firstnameEn: firstnameEn,
//   });
//
//   return Promise.resolve(store.getState());
// };
//
// export const setLastnameEn = (lastnameEn) => (dispatch) => {
//   dispatch({
//     type: SignUpViewActionType.ACCOUNT_LASTNAME_EN,
//     lastnameEn: lastnameEn,
//   });
//
//   return Promise.resolve(store.getState());
// };
//
// export const setFirstnameZh = (firstnameZh) => (dispatch) => {
//   dispatch({
//     type: SignUpViewActionType.ACCOUNT_FIRSTNAME_ZH,
//     firstnameZh: firstnameZh,
//   });
//
//   return Promise.resolve(store.getState());
// };
//
// export const setLastnameZh = (lastnameZh) => (dispatch) => {
//   dispatch({
//     type: SignUpViewActionType.ACCOUNT_LASTNAME_ZH,
//     lastnameZh: lastnameZh,
//   });
//
//   return Promise.resolve(store.getState());
// };
//
// export const setNickname = (nickname) => (dispatch) => {
//   dispatch({
//     type: SignUpViewActionType.ACCOUNT_NICKNAME,
//     nickname: nickname,
//   });
//
//   return Promise.resolve(store.getState());
// };

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.ACCOUNT_EMAIL,
    email: email,
  });

  return Promise.resolve(store.getState());
};

export const setPhoneCode = (phoneCode) => (dispatch) => {
  if (phoneCode && !phoneCode.startsWith('+')) {
    phoneCode = '+' + phoneCode;
  }

  dispatch({
    type: SignUpViewActionType.ACCOUNT_PHONE_CODE,
    phoneCode: phoneCode,
  });

  return Promise.resolve(store.getState());
};

export const setPhoneNumber = (phoneNumber) => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.ACCOUNT_PHONE_NUMBER,
    phoneNumber: phoneNumber,
  });

  return Promise.resolve(store.getState());
};

export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.ACCOUNT_PASSWORD,
    password: password,
  });

  return Promise.resolve(store.getState());
};

export const setPasswordValidationLength = (passwordValidationLength) => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.ACCOUNT_PASSWORD_VALIDATION_LENGTH,
    passwordValidationLength: passwordValidationLength,
  });

  return Promise.resolve(store.getState());
};

export const setPasswordValidationSymbol = (passwordValidationSymbol) => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.ACCOUNT_PASSWORD_VALIDATION_SYMBOL,
    passwordValidationSymbol: passwordValidationSymbol,
  });

  return Promise.resolve(store.getState());
};

export const setPasswordValidationLowerCase = (passwordValidationLowerCase) => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.ACCOUNT_PASSWORD_VALIDATION_LOWER_CASE,
    passwordValidationLowerCase: passwordValidationLowerCase,
  });

  return Promise.resolve(store.getState());
};

export const setPasswordValidationUpperCase = (passwordValidationUpperCase) => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.ACCOUNT_PASSWORD_VALIDATION_UPPER_CASE,
    passwordValidationUpperCase: passwordValidationUpperCase,
  });

  return Promise.resolve(store.getState());
};

export const setRedeem = (redeem, id) => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.ACCOUNT_REDEEM,
    redeem: redeem,
    id: id
  });
};

export const setPasswordMessage = (passwordMessage) => (dispatch) => {
  dispatch({
    type: SignUpViewActionType.ACCOUNT_PASSWORD_MESSAGE,
    passwordMessage: passwordMessage
  })
}