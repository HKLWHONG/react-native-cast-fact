/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, FeedActionType } from '../types';

const initialState = {};

export default function feedReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case FeedActionType.RESET:
      return initialState;

    default:
      return state;
  }
}
