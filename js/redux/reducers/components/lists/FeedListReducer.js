/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, FeedListActionType } from '../../../types';

const initialState = {

};

export default function recentSearchesReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case FeedListActionType.RESET:
      return initialState;

    default:
      return state;
  }
}
