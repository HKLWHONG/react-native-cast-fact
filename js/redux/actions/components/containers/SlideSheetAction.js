/**
 * @format
 * @flow strict-local
 */

import { store, SlideSheetActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SlideSheetActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const addRef = (key, value) => (dispatch) => {
  dispatch({
    type: SlideSheetActionType.ADD_REF,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};

export const addProps = (key, value) => (dispatch) => {
  dispatch({
    type: SlideSheetActionType.ADD_PROPS,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};
