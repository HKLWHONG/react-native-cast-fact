/**
 * @format
 * @flow strict-local
 */

import { store, CreateProjectStep1ViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: CreateProjectStep1ViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setDurationFrom = (durationFrom) => (dispatch) => {
  dispatch({
    type: CreateProjectStep1ViewActionType.DURATION_FROM,
    durationFrom: durationFrom,
  });

  return Promise.resolve(store.getState());
};

export const setDurationTo = (durationTo) => (dispatch) => {
  dispatch({
    type: CreateProjectStep1ViewActionType.DURATION_TO,
    durationTo: durationTo,
  });

  return Promise.resolve(store.getState());
};
