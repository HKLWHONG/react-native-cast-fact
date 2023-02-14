/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileNameEditionViewActionType } from '../../../types';

const initState = () => {
  return {
    refs: {},
  };
};

export default function profileNameEditionViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case ProfileNameEditionViewActionType.RESET:
      return initState();

    case ProfileNameEditionViewActionType.ADD_REF:
      if (!action.id) {
        return state;
      }

      state.refs[action.id] = action.object;

      return state;

    default:
      return state;
  }
}
