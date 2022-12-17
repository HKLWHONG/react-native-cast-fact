/**
 * @format
 * @flow strict-local
 */

import { store, ProfileCastingSheetListActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: ProfileCastingSheetListActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
