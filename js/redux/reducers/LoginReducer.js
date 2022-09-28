/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, LoginActionType } from '../types';

const initialState = {
  credentials: {
    loginId: undefined,
    loginIdMessage: undefined,
    password: undefined,
    passwordMessage: undefined,
  },
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case LoginActionType.CREDENTIALS_ID:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          loginId: action.loginId,
        },
      };

    case LoginActionType.CREDENTIALS_ID_MESSAGE:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          loginIdMessage: action.loginIdMessage,
        },
      };

    case LoginActionType.CREDENTIALS_PASSWORD:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          password: action.password,
        },
      };

    case LoginActionType.CREDENTIALS_PASSWORD_MESSAGE:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          passwordMessage: action.passwordMessage,
        },
      };

    default:
      return state;
  }
}
