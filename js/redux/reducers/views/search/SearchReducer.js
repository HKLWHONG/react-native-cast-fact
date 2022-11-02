/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchActionType } from '../../../types';

const initialState = {
  refreshing: false,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case SearchActionType.RESET:
      return initialState;

    case SearchActionType.REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };

    default:
      return state;
  }
}
