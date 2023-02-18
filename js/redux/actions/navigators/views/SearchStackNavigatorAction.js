/**
 * @format
 * @flow strict-local
 */

import { store, SearchStackNavigatorActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchStackNavigatorActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const addOnRightViewRender = (key, value) => (dispatch) => {
  dispatch({
    type: SearchStackNavigatorActionType.ADD_ON_RIGHT_VIEW_RENDER,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};
