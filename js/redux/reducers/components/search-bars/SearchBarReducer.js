/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchBarActionType } from '../../../types';

const initState = () => {
  return {
    text: '',
  };
};

export default function searchBarReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SearchBarActionType.RESET:
      return initState();

    case SearchBarActionType.TEXT:
      return {
        ...state,
        text: action.text || '',
      };

    default:
      return state;
  }
}
