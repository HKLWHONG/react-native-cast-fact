/**
 * @format
 * @flow strict-local
 */

import { store, SearchBarActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchBarActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setText = (text) => (dispatch) => {
  dispatch({
    type: SearchBarActionType.TEXT,
    text: text,
  });

  return Promise.resolve(store.getState());
};
