/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SignUpActionType } from '../../../types';

const initState = () => {
  return {
    account: {
      info: {
        firstnameEn: undefined,
        lastnameEn: undefined,
        firstnameZh: undefined,
        lastnameZh: undefined,
        nickname: undefined,
        phoneCode: '+852',
        phoneNumber: undefined,
      },
      credentials: {
        email: undefined,
        password: undefined,
      },
    },
  };
};

export default function signUpReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SignUpActionType.RESET:
      return initState();

    case SignUpActionType.ACCOUNT_FIRSTNAME_EN:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            firstnameEn: action.firstnameEn,
          },
        },
      };

    case SignUpActionType.ACCOUNT_LASTNAME_EN:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            lastnameEn: action.lastnameEn,
          },
        },
      };

    case SignUpActionType.ACCOUNT_FIRSTNAME_ZH:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            firstnameZh: action.firstnameZh,
          },
        },
      };

    case SignUpActionType.ACCOUNT_LASTNAME_ZH:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            lastnameZh: action.lastnameZh,
          },
        },
      };

    case SignUpActionType.ACCOUNT_NICKNAME:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            nickname: action.nickname,
          },
        },
      };

    case SignUpActionType.ACCOUNT_EMAIL:
      return {
        ...state,
        account: {
          ...state.account,
          credentials: {
            ...state.account.credentials,
            email: action.email,
          },
        },
      };

    case SignUpActionType.ACCOUNT_PHONE_CODE:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            phoneCode: action.phoneCode,
          },
        },
      };

    case SignUpActionType.ACCOUNT_PHONE_NUMBER:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            phoneNumber: action.phoneNumber,
          },
        },
      };

    case SignUpActionType.ACCOUNT_PASSWORD:
      return {
        ...state,
        account: {
          ...state.account,
          credentials: {
            ...state.account.credentials,
            password: action.password,
          },
        },
      };

    default:
      return state;
  }
}
