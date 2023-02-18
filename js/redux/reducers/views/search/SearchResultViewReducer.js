/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchResultViewActionType } from '../../../types';

const initState = () => {
  return {
    refreshing: false,
    searched: false,
    results: [],
    searchResultListType: undefined,
    searchResultListPaging: {
      loading: false,
      page: 0,
      length: 30,
    },
    searchResultListData: [],
  };
};

export default function searchResultViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SearchResultViewActionType.RESET:
      return initState();

    case SearchResultViewActionType.REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };

    case SearchResultViewActionType.SEARCHED:
      return {
        ...state,
        searched: action.searched,
      };

    case SearchResultViewActionType.RESULTS:
      return {
        ...state,
        results: action.results || [],
      };

    case SearchResultViewActionType.SEARCH_RESULT_LIST_TYPE:
      return {
        ...state,
        searchResultListType: action.searchResultListType,
      };

    case SearchResultViewActionType.SEARCH_RESULT_LIST_PAGING_LOADING:
      return {
        ...state,
        searchResultListPaging: {
          ...state.searchResultListPaging,
          loading: action.loading,
        },
      };

    case SearchResultViewActionType.SEARCH_RESULT_LIST_PAGING_PAGE:
      return {
        ...state,
        searchResultListPaging: {
          ...state.searchResultListPaging,
          page: action.page,
        },
      };

    case SearchResultViewActionType.SEARCH_RESULT_LIST_PAGING_LENGTH:
      return {
        ...state,
        searchResultListPaging: {
          ...state.searchResultListPaging,
          length: action.length,
        },
      };

    case SearchResultViewActionType.SEARCH_RESULT_LIST_DATA:
      return {
        ...state,
        searchResultListData: action.searchResultListData || [],
      };

    case SearchResultViewActionType.SEARCH_RESULT_LIST_UPDATE_DATA:
    {
      // console.log('[action.resultId]', action.resultId);
      // console.log('[action.object]', action.object);

      let data = state.searchResultListData.map((item) => {
        if (item.resultId === action.resultId) {
          item = {
            ...item,
            ...action.object,
          };
        }

        return item;
      });

      return {
        ...state,
        searchResultListData: data,
      };
    }

    default:
      return state;
  }
}
