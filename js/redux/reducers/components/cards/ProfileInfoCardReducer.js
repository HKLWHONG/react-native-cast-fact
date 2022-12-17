/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileInfoCardActionType } from '../../../types';

const initialState = {

};

export default function profileInfoCardReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case ProfileInfoCardActionType.RESET:
      return initialState;

    default:
      return state;
  }
}
