/**
 * @format
 * @flow strict-local
 */

import { store, AppActionType } from '../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: AppActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const showActivityIndicator = (message, options) => (dispatch) => {
  dispatch({
    type: AppActionType.ACTIVITY_INDICATOR,
    hidden: false,
    message: message,
    options: options,
  });

  return Promise.resolve(store.getState());
};

export const hideActivityIndicator = (options) => (dispatch) => {
  dispatch({
    type: AppActionType.ACTIVITY_INDICATOR,
    hidden: true,
    options: options,
  });

  return Promise.resolve(store.getState());
};
