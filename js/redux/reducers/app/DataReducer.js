/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, DataActionType } from '../../types';

const initialState = {
  dummyData: [],
  recentSearchesSectionTags: [],
  findTalentSectionTags: [],
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case DataActionType.RESET:
      return initialState;

    case DataActionType.DUMMY_DATA:
      return {
        ...state,
        dummyData: action.dummyData || [],
      };

    case DataActionType.RECENT_SEARCHES_SECTION_TAGS:
      return {
        ...state,
        recentSearchesSectionTags: action.recentSearchesSectionTags || [],
      };

    case DataActionType.FIND_TALENT_SECTION_TAGS:
      return {
        ...state,
        findTalentSectionTags: action.findTalentSectionTags || [],
      };

    default:
      return state;
  }
}
