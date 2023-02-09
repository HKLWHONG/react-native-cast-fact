/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, LoginViewActionType } from '../../../types';

const initState = () => {
  return {
    refs: {},
    credentials: {
      email: undefined,
      emailMessage: undefined,
      password: undefined,
      passwordMessage: undefined,
    },
  };
};

export default function loginViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case LoginViewActionType.RESET:
      return initState();

    case LoginViewActionType.ADD_REF:
      if (!action.refId) {
        return state;
      }

      state.refs[action.refId] = action.refObject;

      return state;

    case LoginViewActionType.CREDENTIALS_EMAIL:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          email: action.email,
        },
      };

    case LoginViewActionType.CREDENTIALS_EMAIL_MESSAGE:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          emailMessage: action.emailMessage,
        },
      };

    case LoginViewActionType.CREDENTIALS_PASSWORD:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          password: action.password,
        },
      };

    case LoginViewActionType.CREDENTIALS_PASSWORD_MESSAGE:
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
