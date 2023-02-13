/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CameraViewActionType } from '../../../types';

const initState = () => {
  return {
    refs: {},
    devices: undefined,
    device: undefined,
    format: undefined,
  };
};

export default function cameraViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case CameraViewActionType.RESET:
      return initState();

    case CameraViewActionType.ADD_REF:
      if (!action.id) {
        return state;
      }

      state.refs[action.id] = action.object;

      return state;

    case CameraViewActionType.DEVICES:
      return {
        ...state,
        devices: action.devices,
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

    default:
      return state;
  }
}
