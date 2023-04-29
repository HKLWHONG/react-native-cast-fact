/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileCastSheetEditionViewActionType } from '../../../types';

const initState = () => {
  return {
    account: {
      info: {},
    },
    focusedTag: undefined,
  };
};

export default function profileCastSheetEditionViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case ProfileCastSheetEditionViewActionType.RESET:
      return initState();

    case ProfileCastSheetEditionViewActionType.SET_ACCOUNT_INFO:
      return {
        ...state,
        account: {
          ...state.account,
          info: action.info,
        },
      };

    case ProfileCastSheetEditionViewActionType.ADD_ACCOUNT_INFO:
      if (!action.key) {
        return state;
      }

      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            [action.key]: action.value,
          },
        },
      };

    case ProfileCastSheetEditionViewActionType.DELETE_ACCOUNT_INFO:
      if (!action.key) {
        return state;
      }

      console.log('[before]', state.account.info);

      delete state.account.info[action.key];

      console.log('[after]', state.account.info);

      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
          },
        },
      };

    case ProfileCastSheetEditionViewActionType.FOCUSED_TAG:
      return {
        ...state,
        focusedTag: action.focusedTag,
      };

    default:
      return state;
  }
}
