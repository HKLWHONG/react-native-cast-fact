/**
 * @format
 * @flow strict-local
 */

import { store, MainTabActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: MainTabActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setTapCount = (tapCount) => (dispatch) => {
  dispatch({
    type: MainTabActionType.TAP_COUNT,
    tapCount: tapCount,
  });

  return Promise.resolve(store.getState());
};

export const setTapTimer = (tapTimer) => (dispatch) => {
  dispatch({
    type: MainTabActionType.TAP_TIMER,
    tapTimer: tapTimer,
  });

  return Promise.resolve(store.getState());
};

export const select = (index) => (dispatch) => {
  dispatch({
    type: MainTabActionType.SELECTION,
    index: index,
  });

  return Promise.resolve(store.getState());
};

export const setListRef = (tabIndex, screenIndex, listRef) => (dispatch) => {
  dispatch({
    type: MainTabActionType.LIST_REFS,
    tabIndex: tabIndex,
    screenIndex: screenIndex,
    listRef: listRef,
  });

  return Promise.resolve(store.getState());
};
