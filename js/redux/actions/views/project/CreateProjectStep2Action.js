/**
 * @format
 * @flow strict-local
 */

import { store, CreateProjectStep2ActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: CreateProjectStep2ActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const addAvailability = (availability) => (dispatch) => {
  dispatch({
    type: CreateProjectStep2ActionType.ADD_AVAILABILITY,
    availability: availability,
  });

  return Promise.resolve(store.getState());
};

export const updateAvailability = (availabilityId, object) => (dispatch) => {
  dispatch({
    type: CreateProjectStep2ActionType.UPDATE_AVAILABILITY,
    availabilityId: availabilityId,
    object: object,
  });

  return Promise.resolve(store.getState());
};

export const deleteAvailability = (availabilityId) => (dispatch) => {
  dispatch({
    type: CreateProjectStep2ActionType.DELETE_AVAILABILITY,
    availabilityId: availabilityId,
  });

  return Promise.resolve(store.getState());
};
