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

export const addRef = (refId, refObject) => (dispatch) => {
  dispatch({
    type: SlideSheetActionType.ADD_REF,
    refId: refId,
    refObject: refObject,
  });

  return Promise.resolve(store.getState());
};

export const addProps = (propsId, propsObject) => (dispatch) => {
  dispatch({
    type: SlideSheetActionType.ADD_PROPS,
    propsId: propsId,
    propsObject: propsObject,
  });

  return Promise.resolve(store.getState());
};
