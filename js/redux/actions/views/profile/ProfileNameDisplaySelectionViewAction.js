/**
 * @format
 * @flow strict-local
 */

import { store, ProfileNameDisplaySelectionViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: ProfileNameDisplaySelectionViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
