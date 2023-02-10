/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SignUpStackNavigatorActionType } from '../../../types';

const initState = () => {
  return {
    hiddenRight: false,
    callbacks: {
      onRightButtonPress: undefined,
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

    case SignUpStackNavigatorActionType.ON_RIGHT_BUTTON_PRESS:
      return {
        ...state,
        callbacks: {
          ...state.callbacks,
          onRightButtonPress: action.onRightButtonPress,
        },
      };

    default:
      return state;
  }
}
