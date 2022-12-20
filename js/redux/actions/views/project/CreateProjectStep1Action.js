/**
 * @format
 * @flow strict-local
 */

import { store, CreateProjectStep1ActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: CreateProjectStep1ActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const updateData = (data) => (dispatch) => {
  dispatch({
    type: CreateProjectStep1ActionType.DATA,
    data: data,
  });

  return Promise.resolve(store.getState());
};
