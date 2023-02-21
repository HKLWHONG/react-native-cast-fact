/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchStackNavigatorRightViewActionType } from '../../../types';

const initState = () => {
  return {
    searchResultListType: undefined,
  };
};

export default function searchStackNavigatorRightViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SearchStackNavigatorRightViewActionType.RESET:
      return initState();

    case SearchStackNavigatorRightViewActionType.SEARCH_RESULT_LIST_TYPE:
      return {
        ...state,
        searchResultListType: action.searchResultListType,
      };

    default:
      return state;
  }
}
