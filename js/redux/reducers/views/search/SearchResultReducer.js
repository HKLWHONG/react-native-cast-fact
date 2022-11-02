/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchResultActionType } from '../../../types';

const initialState = {
  refreshing: false,
  searched: false,
  results: [],
  feedsPaging: {
    loading: false,
    page: 0,
    length: 30,
  },
  feeds: [],
};

export default function searchResultReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case SearchResultActionType.RESET:
      return initialState;

    case SearchResultActionType.REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };

    case SearchResultActionType.SEARCHED:
      return {
        ...state,
        searched: action.searched,
      };

    case SearchResultActionType.RESULTS:
      return {
        ...state,
        results: action.results || [],
      };

    case SearchResultActionType.FEEDS_PAGING_LOADING:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          loading: action.loading,
        },
      };

    case SearchResultActionType.FEEDS_PAGING_PAGE:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          page: action.page,
        },
      };

    case SearchResultActionType.FEEDS_PAGING_LENGTH:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          length: action.length,
        },
      };

    case SearchResultActionType.FEEDS:
      return {
        ...state,
        feeds: action.feeds || [],
      };

    case SearchResultActionType.FEEDS_UPDATE_FEED:
    {
      // console.log('[action.feedId]', action.feedId);
      // console.log('[action.object]', action.object);

      let feeds = state.feeds.map((feed) => {
        if (feed.feedId === action.feedId) {
          feed = {
            ...feed,
            ...action.object,
          };
        }

        return feed;
      });

      return {
        ...state,
        feeds: feeds,
      };
    }

    default:
      return state;
  }
}
