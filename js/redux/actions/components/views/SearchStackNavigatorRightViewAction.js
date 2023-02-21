/**
 * @format
 * @flow strict-local
 */

import { store, SearchStackNavigatorRightViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchStackNavigatorRightViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setSearchResultListType = (searchResultListType) => (dispatch) => {
  dispatch({
    type: SearchStackNavigatorRightViewActionType.SEARCH_RESULT_LIST_TYPE,
    searchResultListType: searchResultListType,
  });

  return Promise.resolve(store.getState());
};
