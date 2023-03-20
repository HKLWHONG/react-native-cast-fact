/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, DataActionType } from '../../types';

const initState = () => {
  return {
    dummyData: [],
    recentSearchesSectionTags: [],
    findTalentSectionTags: [],
    isLoggedIn: false,
    userProfile: undefined,
  };
};

export default function dataReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case DataActionType.RESET:
      return initState();

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

    case DataActionType.IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };

    case DataActionType.USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
      };

    default:
      return state;
  }
}
