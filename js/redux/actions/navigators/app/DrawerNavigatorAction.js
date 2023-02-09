/**
 * @format
 * @flow strict-local
 */

import { store, DrawerNavigatorActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: DrawerNavigatorActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const select = (index) => (dispatch) => {
  dispatch({
    type: DrawerNavigatorActionType.SELECTION,
    index: index,
  });

  return Promise.resolve(store.getState());
};
