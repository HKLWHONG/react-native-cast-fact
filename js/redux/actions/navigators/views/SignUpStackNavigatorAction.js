/**
 * @format
 * @flow strict-local
 */

import { store, SignUpStackNavigatorActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SignUpStackNavigatorActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
