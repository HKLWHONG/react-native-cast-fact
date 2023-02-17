/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, AccountChangePasswordStep1ViewActionType } from '../../../types';

const initState = () => {
  return {
    refs: {},
    account: {
      credentials: {
        password: undefined,
      },
    },
  };
};

export default function accountChangePasswordStep1ViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case AccountChangePasswordStep1ViewActionType.RESET:
      return initState();

    case AccountChangePasswordStep1ViewActionType.ADD_REF:
      if (!action.key) {
        return state;
      }

      state.refs[action.key] = action.value;

      return state;

    case AccountChangePasswordStep1ViewActionType.ACCOUNT_PASSWORD:
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
