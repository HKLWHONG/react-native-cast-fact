/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, FeedActionType } from '../../../types';

const initialState = {
  feedList: [],
};

export default function feedReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case FeedActionType.RESET:
      return initialState;

    case FeedActionType.FEED_LIST:
      return {
        ...state,
        feedList: action.feedList,
      };

    case FeedActionType.FEED_LIST_SET_FOLLOWED:
      // console.log('[action.feedId]', action.feedId);
      // console.log('[action.isFollowed]', action.isFollowed);

      let feedList = state.feedList.map((item) => {
        if (item.feedId === action.feedId) {
          item.isFollowed = action.isFollowed;
        }

        return item;
      });

      return {
        ...state,
        feedList: feedList,
      };

    case FeedActionType.FEED_LIST_SET_LIKED:
    {
      // console.log('[action.feedId]', action.feedId);
      // console.log('[action.isLiked]', action.isLiked);

      let feedList = state.feedList.map((item) => {
        if (item.feedId === action.feedId) {
          item.isLiked = action.isLiked;
        }

        return item;
      });

      return {
        ...state,
        feedList: feedList,
      };
    }

    case FeedActionType.FEED_LIST_SET_BOOKMARKED:
    {
      // console.log('[action.feedId]', action.feedId);
      // console.log('[action.isBookmarked]', action.isBookmarked);

      let feedList = state.feedList.map((item) => {
        if (item.feedId === action.feedId) {
          item.isBookmarked = action.isBookmarked;
        }

        return item;
      });

      return {
        ...state,
        feedList: feedList,
      };
    }

    default:
      return state;
  }
}
