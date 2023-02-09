/**
 * @format
 * @flow strict-local
 */

import { store, SearchViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setRefreshing = (refreshing) => (dispatch) => {
  dispatch({
    type: SearchViewActionType.REFRESHING,
    refreshing: refreshing,
  });

  return Promise.resolve(store.getState());
};
