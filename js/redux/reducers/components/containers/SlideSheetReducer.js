/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SlideSheetActionType } from '../../../types';

const initState = () => {
  return {
    refs: {},
    propsList: {},
  };
};

export default function slideSheetReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SlideSheetActionType.RESET:
      return initState();

    case SlideSheetActionType.ADD_REF:
      if (!action.id) {
        return state;
      }

      state.refs[action.id] = action.object;

      return state;

    case SlideSheetActionType.ADD_PROPS:
      if (!action.id) {
        return state;
      }

      state.propsList[action.id] = action.object;

      return state;

    default:
      return state;
  }
}
