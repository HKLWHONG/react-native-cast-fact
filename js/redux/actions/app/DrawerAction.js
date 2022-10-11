/**
 * @format
 * @flow strict-local
 */

import { store, DrawerActionType } from '../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: DrawerActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const select = (index) => (dispatch) => {
  dispatch({
    type: DrawerActionType.SELECTION,
    index: index,
  });

  return Promise.resolve(store.getState());
};
