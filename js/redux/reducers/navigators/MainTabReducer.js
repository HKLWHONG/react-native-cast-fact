/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, MainTabActionType } from '../../types';

const initialState = {
  index: 1,
};

export default function mainTabReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case MainTabActionType.RESET:
      return initialState;

    case MainTabActionType.SELECTION:
      return {...state, index: action.index};

    default:
      return state;
  }
}
