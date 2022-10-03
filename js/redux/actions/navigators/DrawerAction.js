/**
 * @format
 * @flow strict-local
 */

import { DrawerActionType } from '../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: DrawerActionType.RESET,
  });

  return Promise.resolve();
};

export const select = (index) => (dispatch) => {
  dispatch({
    type: DrawerActionType.SELECTION,
    index: index,
  });

  return Promise.resolve();
};
