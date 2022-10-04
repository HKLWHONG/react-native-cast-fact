/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchBarActionType } from '../../../types';

const initialState = {
  text: '',
};

export default function searchBarReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case SearchBarActionType.RESET:
      return initialState;

    case SearchBarActionType.TEXT:
      return {
        ...state,
        text: action.text || '',
      };

    default:
      return state;
  }
}
