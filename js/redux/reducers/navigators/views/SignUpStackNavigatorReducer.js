/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SignUpStackNavigatorActionType } from '../../../types';

const initState = () => {
  return {
    hiddenRight: false,
    enabledRight: false,
    callbacks: {
      onScreenAppearList: {},
      onRightButtonPressList: {},
    },
  };
};

export default function signUpStackNavigatorReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SignUpStackNavigatorActionType.RESET:
      return initState();

    case SignUpStackNavigatorActionType.HIDDEN_RIGHT:
      return {
        ...state,
        hiddenRight: action.hiddenRight,
      };

    case SignUpStackNavigatorActionType.ENABLED_RIGHT:
      return {
        ...state,
        enabledRight: action.enabledRight,
      };

    case SignUpStackNavigatorActionType.ADD_ON_SCREEN_APPEAR:
      if (!action.key) {
        return state;
      }

      state.callbacks.onScreenAppearList[action.key] = action.value;

      return state;

    case SignUpStackNavigatorActionType.ADD_ON_RIGHT_BUTTON_PRESS:
      if (!action.key) {
        return state;
      }

      state.callbacks.onRightButtonPressList[action.key] = action.value;

      return state;

    default:
      return state;
  }
}
