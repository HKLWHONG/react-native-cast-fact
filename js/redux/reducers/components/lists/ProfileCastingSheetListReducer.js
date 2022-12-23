/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileCastingSheetListActionType } from '../../../types';

const initState = () => {
  return {

  };
};

export default function profileCastingSheetListReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case ProfileCastingSheetListActionType.RESET:
      return initState();

    default:
      return state;
  }
}
