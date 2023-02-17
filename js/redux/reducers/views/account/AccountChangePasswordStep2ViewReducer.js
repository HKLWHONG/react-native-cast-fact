/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, AccountChangePasswordStep2ViewActionType } from '../../../types';

const initState = () => {
  return {
    refs: {},
    account: {
      credentials: {
        newPassword: undefined,
        confirmation: undefined,
      },
    },
  };
};

export default function accountChangePasswordStep1ViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case AccountChangePasswordStep2ViewActionType.RESET:
      return initState();

    case AccountChangePasswordStep2ViewActionType.ADD_REF:
      if (!action.key) {
        return state;
      }

      state.refs[action.key] = action.value;

      return state;

    case AccountChangePasswordStep2ViewActionType.ACCOUNT_NEW_PASSWORD:
      return {
        ...state,
        account: {
          ...state.account,
          credentials: {
            ...state.account.credentials,
            newPassword: action.newPassword,
          },
        },
      };

    case AccountChangePasswordStep2ViewActionType.ACCOUNT_CONFIRMATION:
      return {
        ...state,
        account: {
          ...state.account,
          credentials: {
            ...state.account.credentials,
            confirmation: action.confirmation,
          },
        },
      };

    default:
      return state;
  }
}
