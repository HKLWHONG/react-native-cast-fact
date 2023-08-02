/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, FeedViewActionType } from '../../../types';

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

export default function feedViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case FeedViewActionType.RESET:
      return initState();

    case FeedViewActionType.REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };

    case FeedViewActionType.FEEDS_PAGING_LOADING:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          loading: action.loading,
        },
      };

    case FeedViewActionType.FEEDS_PAGING_PAGE:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          page: action.page,
        },
      };

    case FeedViewActionType.FEEDS_PAGING_LENGTH:
      return {
        ...state,
        feedsPaging: {
          ...state.feedsPaging,
          length: action.length,
        },
      };

    case FeedViewActionType.FEEDS:
      return {
        ...state,
        feeds: action.feeds,
      };

    case FeedViewActionType.FEEDS_UPDATE_FEED:
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
