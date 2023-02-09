/**
 * @format
 * @flow strict-local
 */

import { store, CreateProjectStep2ViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: CreateProjectStep2ViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const addAvailability = (availability) => (dispatch) => {
  dispatch({
    type: CreateProjectStep2ViewActionType.ADD_AVAILABILITY,
    availability: availability,
  });

  return Promise.resolve(store.getState());
};

export const updateAvailability = (availabilityId, object) => (dispatch) => {
  dispatch({
    type: CreateProjectStep2ViewActionType.UPDATE_AVAILABILITY,
    availabilityId: availabilityId,
    object: object,
  });

  return Promise.resolve(store.getState());
};

export const deleteAvailability = (availabilityId) => (dispatch) => {
  dispatch({
    type: CreateProjectStep2ViewActionType.DELETE_AVAILABILITY,
    availabilityId: availabilityId,
  });

  return Promise.resolve(store.getState());
};
