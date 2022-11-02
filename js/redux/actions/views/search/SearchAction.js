/**
 * @format
 * @flow strict-local
 */

import { store, SearchActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setRefreshing = (refreshing) => (dispatch) => {
  dispatch({
    type: SearchActionType.REFRESHING,
    refreshing: refreshing,
  });

  return Promise.resolve(store.getState());
};
