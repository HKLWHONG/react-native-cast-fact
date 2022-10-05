/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, FeedActionType } from '../../../types';

const initialState = {
  feeds: [],
};

export default function feedReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case FeedActionType.RESET:
      return initialState;

    case FeedActionType.FEEDS:
      return {
        ...state,
        feeds: action.feeds,
      };

    case FeedActionType.FEEDS_UPDATE_FEED:
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
