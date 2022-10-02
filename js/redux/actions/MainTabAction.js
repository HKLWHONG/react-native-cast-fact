/**
 * @format
 * @flow strict-local
 */

import { MainTabActionType } from '../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: MainTabActionType.RESET,
  });

  return Promise.resolve();
};

export const select = (index) => (dispatch) => {
  dispatch({
    type: MainTabActionType.SELECTION,
    index: index,
  });

  return Promise.resolve();
};
