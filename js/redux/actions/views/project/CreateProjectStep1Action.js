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

export const setDurationFrom = (durationFrom) => (dispatch) => {
  dispatch({
    type: CreateProjectStep1ActionType.DURATION_FROM,
    durationFrom: durationFrom,
  });

  return Promise.resolve(store.getState());
};

export const setDurationTo = (durationTo) => (dispatch) => {
  dispatch({
    type: CreateProjectStep1ActionType.DURATION_TO,
    durationTo: durationTo,
  });

  return Promise.resolve(store.getState());
};
