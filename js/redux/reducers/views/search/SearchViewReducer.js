/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchViewActionType } from '../../../types';

const initState = () => {
  return {
    refreshing: false,
  };
};

export default function searchViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SearchViewActionType.RESET:
      return initState();

    case SearchViewActionType.REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };

    default:
      return state;
  }
}
