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

export const addRef = (id, object) => (dispatch) => {
  dispatch({
    type: SlideSheetActionType.ADD_REF,
    id: id,
    object: object,
  });

  return Promise.resolve(store.getState());
};

export const addProps = (id, object) => (dispatch) => {
  dispatch({
    type: SlideSheetActionType.ADD_PROPS,
    id: id,
    object: object,
  });

  return Promise.resolve(store.getState());
};
