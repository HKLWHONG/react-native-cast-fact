/**
 * @format
 * @flow strict-local
 */

import { store, ProfileViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: ProfileViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setIndex = (index) => (dispatch) => {
  dispatch({
    type: ProfileViewActionType.INDEX,
    index: index,
  });

  return Promise.resolve(store.getState());
};
