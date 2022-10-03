/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, LoginActionType } from '../../../types';

const initialState = {
  credentials: {
    email: undefined,
    emailMessage: undefined,
    password: undefined,
    passwordMessage: undefined,
  },
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case LoginActionType.RESET:
      return initialState;

    case LoginActionType.CREDENTIALS_EMAIL:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          email: action.email,
        },
      };

    case LoginActionType.CREDENTIALS_EMAIL_MESSAGE:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          emailMessage: action.emailMessage,
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
