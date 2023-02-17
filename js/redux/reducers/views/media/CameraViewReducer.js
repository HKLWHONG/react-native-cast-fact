/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CameraViewActionType } from '../../../types';

const initState = () => {
  return {
    refs: {},
    devices: undefined,
    backDevice: undefined,
    frontDevice: undefined,
    device: undefined,
    format: undefined,
    flash: undefined,
  };
};

export default function cameraViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case CameraViewActionType.RESET:
      return initState();

    case CameraViewActionType.ADD_REF:
      if (!action.key) {
        return state;
      }

      state.refs[action.key] = action.value;

      return state;

    case CameraViewActionType.DEVICES:
      return {
        ...state,
        devices: action.devices,
      };

    case CameraViewActionType.BACK_DEVICE:
      return {
        ...state,
        backDevice: action.backDevice,
      };

    case CameraViewActionType.FRONT_DEVICE:
      return {
        ...state,
        frontDevice: action.frontDevice,
      };

    case CameraViewActionType.DEVICE:
      return {
        ...state,
        device: action.device,
      };

    case CameraViewActionType.FORMAT:
      return {
        ...state,
        format: action.format,
      };

    case CameraViewActionType.FLASH:
      return {
        ...state,
        flash: action.flash,
      };

    default:
      return state;
  }
}
