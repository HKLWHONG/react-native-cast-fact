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
      if (!action.key) {
        return state;
      }

      state.refs[action.key] = action.value;

      return state;

    case SlideSheetActionType.ADD_PROPS:
      if (!action.key) {
        return state;
      }

      state.propsList[action.key] = action.value;

      return state;

    default:
      return state;
  }
}
