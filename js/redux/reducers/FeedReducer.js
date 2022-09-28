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

    default:
      return state;
  }
}
