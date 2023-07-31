/**
 * @format
 * @flow strict-local
 */

import { store, SearchResultProfileViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchResultProfileViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setUserProfile = (userProfile) => (dispatch) => {
  dispatch({
    type: SearchResultProfileViewActionType.USER_PROFILE,
    userProfile: userProfile,
  });

  return Promise.resolve(store.getState());
};

export const setIndex = (index) => (dispatch) => {
  dispatch({
    type: SearchResultProfileViewActionType.INDEX,
    index: index,
  });

  return Promise.resolve(store.getState());
};
