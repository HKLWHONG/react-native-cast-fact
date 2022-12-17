/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileCastingSheetListActionType } from '../../../types';

const initialState = {

};

export default function profileCastingSheetListReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case ProfileCastingSheetListActionType.RESET:
      return initialState;

    default:
      return state;
  }
}
