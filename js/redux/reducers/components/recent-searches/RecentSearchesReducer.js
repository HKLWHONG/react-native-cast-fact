/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, RecentSearchesActionType } from '../../types';

const initialState = {
  tags: [],
};

export default function recentSearchesReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case RecentSearchesActionType.RESET:
      return initialState;

    default:
      return state;
  }
}
