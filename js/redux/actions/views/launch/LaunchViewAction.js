/**
 * @format
 * @flow strict-local
 */

import { store, LaunchViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: LaunchViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
