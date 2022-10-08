/**
 * @format
 * @flow strict-local
 */

import { store, SearchActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
