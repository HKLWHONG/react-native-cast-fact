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
    feedsPaging: {
      loading: false,
      page: 0,
      length: 30,
    },
    feeds: [],
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

    case SearchResultViewActionType.FEEDS_PAGING_LOADING:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          loading: action.loading,
        },
      };

    case SearchResultViewActionType.FEEDS_PAGING_PAGE:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          page: action.page,
        },
      };

    case SearchResultViewActionType.FEEDS_PAGING_LENGTH:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          length: action.length,
        },
      };

    case SearchResultViewActionType.FEEDS:
      return {
        ...state,
        feeds: action.feeds || [],
      };

    case SearchResultViewActionType.FEEDS_UPDATE_FEED:
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
