/**
 * @format
 * @flow strict-local
 */

import { store, DataActionType } from '../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: DataActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setDummyData = (dummyData) => (dispatch) => {
  dispatch({
    type: DataActionType.DUMMY_DATA,
    dummyData: dummyData,
  });

  return Promise.resolve(store.getState());
};

export const setRecentSearchesSectionTags = (recentSearchesSectionTags) => (dispatch) => {
  dispatch({
    type: DataActionType.RECENT_SEARCHES_SECTION_TAGS,
    recentSearchesSectionTags: recentSearchesSectionTags,
  });

  return Promise.resolve(store.getState());
};

export const setFindTalentSectionTags = (findTalentSectionTags) => (dispatch) => {
  dispatch({
    type: DataActionType.FIND_TALENT_SECTION_TAGS,
    findTalentSectionTags: findTalentSectionTags,
  });

  return Promise.resolve(store.getState());
};

export const setIsLoggedIn = (isLoggedIn) => (dispatch) => {
  dispatch({
    type: DataActionType.IS_LOGGED_IN,
    isLoggedIn: isLoggedIn,
  });

  return Promise.resolve(store.getState());
};

export const setUserData = (userData) => (dispatch) => {
  dispatch({
    type: DataActionType.USER_DATA,
    userData: userData,
  });

  return Promise.resolve(store.getState());
};

export const setUserProfile = (userProfile) => (dispatch) => {
  dispatch({
    type: DataActionType.USER_PROFILE,
    userProfile: userProfile,
  });

  return Promise.resolve(store.getState());
};

export const setUserProfileImage = (userProfileImage) => (dispatch) => {
  dispatch({
    type: DataActionType.USER_PROFILE_IMAGE,
    userProfileImage: userProfileImage,
  });

  return Promise.resolve(store.getState());
};
