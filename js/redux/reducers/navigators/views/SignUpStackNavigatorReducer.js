/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SignUpStackNavigatorActionType } from '../../../types';

const initState = () => {
  return {
    hiddenRight: false,
    callbacks: {
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

    case SignUpStackNavigatorActionType.ADD_ON_RIGHT_BUTTON_PRESS:
      if (!action.id) {
        return state;
      }

      state.callbacks.onRightButtonPressList[action.id] = action.object;

      return state;

    default:
      return state;
  }
}
