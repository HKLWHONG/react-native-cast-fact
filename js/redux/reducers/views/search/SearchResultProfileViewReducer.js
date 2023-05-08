/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchResultProfileViewActionType } from '../../../types';

const initState = () => {
  return {
    userProfile: undefined,
    userProfileImage: undefined,
    index: 0,
  };
};

export default function searchResultProfileViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SearchResultProfileViewActionType.RESET:
      return initState();

    case SearchResultProfileViewActionType.USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
      };

    case SearchResultProfileViewActionType.USER_PROFILE_IMAGE:
      return {
        ...state,
        userProfileImage: action.userProfileImage,
      };

    case SearchResultProfileViewActionType.INDEX:
      return {
        ...state,
        index: action.index,
      };

    default:
      return state;
  }
}
