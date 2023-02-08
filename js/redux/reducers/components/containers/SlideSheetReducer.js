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
      if (!action.refId) {
        return state;
      }

      state.refs[action.refId] = action.refObject;

      return state;

    case SlideSheetActionType.ADD_PROPS:
      if (!action.propsId) {
        return state;
      }

      state.propsList[action.propsId] = action.propsObject;

      return state;

    default:
      return state;
  }
}
