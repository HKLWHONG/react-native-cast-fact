/**
 * @format
 * @flow strict-local
 */

import { store, LaunchActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: LaunchActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
