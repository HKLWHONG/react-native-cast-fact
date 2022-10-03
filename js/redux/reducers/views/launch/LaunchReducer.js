/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, LaunchActionType } from '../../../types';

const initialState = {};

export default function launchReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case LaunchActionType.RESET:
      return initialState;

    default:
      return state;
  }
}
