/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SignUpActionType } from '../../../types';

const initialState = {
  account: {
    info: {
      name: undefined,
      nameMessage: undefined,
      phoneCode: '+852',
      phoneNumber: undefined,
      phoneMessage: undefined,
    },
    credentials: {
      email: undefined,
      emailMessage: undefined,
      password: undefined,
      passwordMessage: undefined,
    },
  },
};

export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case SignUpActionType.RESET:
      return initialState;

    case SignUpActionType.ACCOUNT_NAME:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            name: action.name,
          },
        },
      };

    case SignUpActionType.ACCOUNT_NAME_MESSAGE:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            nameMessage: action.nameMessage,
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

    case SignUpActionType.ACCOUNT_EMAIL_MESSAGE:
      return {
        ...state,
        account: {
          ...state.account,
          credentials: {
            ...state.account.credentials,
            emailMessage: action.emailMessage,
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

    case SignUpActionType.ACCOUNT_PHONE_MESSAGE:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            phoneMessage: action.phoneMessage,
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

    case SignUpActionType.ACCOUNT_PASSWORD_MESSAGE:
      return {
        ...state,
        account: {
          ...state.account,
          credentials: {
            ...state.account.credentials,
            passwordMessage: action.passwordMessage,
          },
        },
      };

    default:
      return state;
  }
}
