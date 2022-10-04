/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, FindTalentSectionActionType } from '../../../types';

const initialState = {

};

export default function findTalentSectionReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case FindTalentSectionActionType.RESET:
      return initialState;

    default:
      return state;
  }
}
