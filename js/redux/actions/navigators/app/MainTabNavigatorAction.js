/**
 * @format
 * @flow strict-local
 */

import { store, MainTabNavigatorActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: MainTabNavigatorActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setTapCount = (tapCount) => (dispatch) => {
  dispatch({
    type: MainTabNavigatorActionType.TAP_COUNT,
    tapCount: tapCount,
  });

  return Promise.resolve(store.getState());
};

export const setTapTimer = (tapTimer) => (dispatch) => {
  dispatch({
    type: MainTabNavigatorActionType.TAP_TIMER,
    tapTimer: tapTimer,
  });

  return Promise.resolve(store.getState());
};

export const select = (index) => (dispatch) => {
  dispatch({
    type: MainTabNavigatorActionType.SELECTION,
    index: index,
  });

  return Promise.resolve(store.getState());
};

export const setListRef = (tabIndex, screenIndex, listRef) => (dispatch) => {
  dispatch({
    type: MainTabNavigatorActionType.LIST_REFS,
    tabIndex: tabIndex,
    screenIndex: screenIndex,
    listRef: listRef,
  });

  return Promise.resolve(store.getState());
};
