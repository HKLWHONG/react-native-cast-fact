/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchActionType } from '../../../types';

const initState = () => {
  return {
    refreshing: false,
  };
};

export default function searchReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SearchActionType.RESET:
      return initState();

    case SearchActionType.REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };

    default:
      return state;
  }
}
