/**
 * @format
 * @flow strict-local
 */

import { store, CameraViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: CameraViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const addRef = (id, object) => (dispatch) => {
  dispatch({
    type: CameraViewActionType.ADD_REF,
    id: id,
    object: object,
  });

  return Promise.resolve(store.getState());
};

export const setDevices = (devices) => (dispatch) => {
  dispatch({
    type: CameraViewActionType.DEVICES,
    devices: devices,
  });

  return Promise.resolve(store.getState());
};

export const setBackDevice = (backDevice) => (dispatch) => {
  dispatch({
    type: CameraViewActionType.BACK_DEVICE,
    backDevice: backDevice,
  });

  return Promise.resolve(store.getState());
};

export const setFrontDevice = (frontDevice) => (dispatch) => {
  dispatch({
    type: CameraViewActionType.FRONT_DEVICE,
    frontDevice: frontDevice,
  });

  return Promise.resolve(store.getState());
};

export const setDevice = (device) => (dispatch) => {
  dispatch({
    type: CameraViewActionType.DEVICE,
    device: device,
  });

  return Promise.resolve(store.getState());
};

export const setFormat = (format) => (dispatch) => {
  dispatch({
    type: CameraViewActionType.FORMAT,
    format: format,
  });

  return Promise.resolve(store.getState());
};

export const setFlash = (flash) => (dispatch) => {
  dispatch({
    type: CameraViewActionType.FLASH,
    flash: flash,
  });

  return Promise.resolve(store.getState());
};
