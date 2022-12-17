/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SlideSheetActionType } from '../../../types';

const initialState = {
  refs: {},
};

export default function slideSheetReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case SlideSheetActionType.RESET:
      return initialState;

    case SlideSheetActionType.ADD_REF:
      if (!action.refId) {
        return state;
      }

      state.refs[action.refId] = action.refObject;

      return state;

    default:
      return state;
  }
}
