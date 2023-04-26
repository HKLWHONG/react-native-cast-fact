/**
 * @format
 * @flow strict-local
 */

import { store, SettingsStackNavigatorActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SettingsStackNavigatorActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setHiddenRight = (hiddenRight) => (dispatch) => {
  dispatch({
    type: SettingsStackNavigatorActionType.HIDDEN_RIGHT,
    hiddenRight: hiddenRight,
  });

  return Promise.resolve(store.getState());
};

export const setEnabledRight = (enabledRight) => (dispatch) => {
  dispatch({
    type: SettingsStackNavigatorActionType.ENABLED_RIGHT,
    enabledRight: enabledRight,
  });

  return Promise.resolve(store.getState());
};

export const addOnScreenAppear = (key, value) => (dispatch) => {
  dispatch({
    type: SettingsStackNavigatorActionType.ADD_ON_SCREEN_APPEAR,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};

export const addOnRightButtonPress = (key, value) => (dispatch) => {
  dispatch({
    type: SettingsStackNavigatorActionType.ADD_ON_RIGHT_BUTTON_PRESS,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};
