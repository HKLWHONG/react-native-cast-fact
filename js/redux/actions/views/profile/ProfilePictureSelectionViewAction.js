/**
 * @format
 * @flow strict-local
 */

import { store, ProfilePictureSelectionViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: ProfilePictureSelectionViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setPhoto = (photo) => (dispatch) => {
  dispatch({
    type: ProfilePictureSelectionViewActionType.PHOTO,
    photo: photo,
  });

  return Promise.resolve(store.getState());
};
