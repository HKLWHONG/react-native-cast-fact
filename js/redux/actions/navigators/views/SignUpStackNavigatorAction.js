/**
 * @format
 * @flow strict-local
 */

import { store, SignUpStackNavigatorActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SignUpStackNavigatorActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setHiddenRight = (hiddenRight) => (dispatch) => {
  dispatch({
    type: SignUpStackNavigatorActionType.HIDDEN_RIGHT,
    hiddenRight: hiddenRight,
  });

  return Promise.resolve(store.getState());
};

export const setOnRightButtonPress = (onRightButtonPress) => (dispatch) => {
  dispatch({
    type: SignUpStackNavigatorActionType.ON_RIGHT_BUTTON_PRESS,
    onRightButtonPress: onRightButtonPress,
  });

  return Promise.resolve(store.getState());
};
