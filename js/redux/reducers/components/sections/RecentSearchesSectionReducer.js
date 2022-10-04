/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, RecentSearchesSectionActionType } from '../../../types';

const initialState = {
  tags: [],
};

export default function recentSearchesSectionReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case RecentSearchesSectionActionType.RESET:
      return initialState;

    case RecentSearchesSectionActionType.TAGS:
      return {
        ...state,
        tags: action.tags || [],
      };

    case RecentSearchesSectionActionType.TAGS_DELETE_GROUP_FRAME:
      let tags = state.tags.filter((groupFrame) => {
        return groupFrame.groupFrameId !== action.groupFrameId;
      });

      return {
        ...state,
        tags: tags,
      };

    default:
      return state;
  }
}
