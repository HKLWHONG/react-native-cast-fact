/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SlideSheetActionType } from '../../../types';

const initState = () => {
  return {
    refs: {},
  };
};

export default function slideSheetReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SlideSheetActionType.RESET:
      return initState();

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
