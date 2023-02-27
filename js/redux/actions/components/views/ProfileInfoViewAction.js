/**
 * @format
 * @flow strict-local
 */

import { store, ProfileInfoViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: ProfileInfoViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
