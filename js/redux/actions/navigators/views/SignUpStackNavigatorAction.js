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

export const addOnScreenAppear = (id, object) => (dispatch) => {
  dispatch({
    type: SignUpStackNavigatorActionType.ADD_ON_SCREEN_APPEAR,
    id: id,
    object: object,
  });

  return Promise.resolve(store.getState());
};

export const addOnRightButtonPress = (id, object) => (dispatch) => {
  dispatch({
    type: SignUpStackNavigatorActionType.ADD_ON_RIGHT_BUTTON_PRESS,
    id: id,
    object: object,
  });

  return Promise.resolve(store.getState());
};
