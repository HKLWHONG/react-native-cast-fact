/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, DrawerActionType } from '../types';

const initialState = {
  index: 0,
};

export default function drawerReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case DrawerActionType.SELECTION:
      return { ...state, index: action.index };

    default:
      return state;
  }
}
