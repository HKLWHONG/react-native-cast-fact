/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, FeedActionType } from '../../../types';

const initState = () => {
  return {
    refreshing: false,
    feedsPaging: {
      loading: false,
      page: 0,
      length: 30,
    },
    feeds: [],
  };
};

export default function feedReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case FeedActionType.RESET:
      return initState();

    case FeedActionType.REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };

    case FeedActionType.FEEDS_PAGING_LOADING:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          loading: action.loading,
        },
      };

    case FeedActionType.FEEDS_PAGING_PAGE:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          page: action.page,
        },
      };

    case FeedActionType.FEEDS_PAGING_LENGTH:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          length: action.length,
        },
      };

    case FeedActionType.FEEDS:
      return {
        ...state,
        feeds: action.feeds,
      };

    case FeedActionType.FEEDS_UPDATE_FEED:
    {
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
