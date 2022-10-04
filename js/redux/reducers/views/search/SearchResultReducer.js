/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchResultActionType } from '../../../types';

const initialState = {

};

export default function searchResultReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case SearchResultActionType.RESET:
      return initialState;

    default:
      return state;
  }
}
