/**
 * @format
 * @flow strict-local
 */

import { store, ProfileInfoCardActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: ProfileInfoCardActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
