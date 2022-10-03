/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, RecentSearchesActionType } from '../../../types';

const initialState = {
  tags: [],
};

export default function recentSearchesReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case RecentSearchesActionType.RESET:
      return initialState;

    case RecentSearchesActionType.TAGS:
      return {
        ...state,
        tags: action.tags || [],
      };

    case RecentSearchesActionType.TAGS_DELETE_GROUP_FRAME:
      let tags = state.tags.filter((item) => {
        return item.groupFrameId !== action.groupFrameId;
      });

      return {
        ...state,
        tags: tags,
      };

    default:
      return state;
  }
}
