/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchActionType } from '../../../types';

const initialState = {

};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case SearchActionType.RESET:
      return initialState;

    default:
      return state;
  }
}
