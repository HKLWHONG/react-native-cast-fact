/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchResultActionType } from '../../../types';

const initialState = {
  feeds: [],
};

export default function searchResultReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case SearchResultActionType.RESET:
      return initialState;

    case SearchResultActionType.FEEDS:
      return {
        ...state,
        feeds: action.feeds,
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
