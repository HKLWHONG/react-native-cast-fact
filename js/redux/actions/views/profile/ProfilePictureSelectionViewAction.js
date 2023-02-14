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
