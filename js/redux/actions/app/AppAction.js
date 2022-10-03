/**
 * @format
 * @flow strict-local
 */

import { AppActionType } from '../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: AppActionType.RESET,
  });

  return Promise.resolve();
};

export const showActivityIndicator = (message, options) => (dispatch) => {
  dispatch({
    type: AppActionType.ACTIVITY_INDICATOR,
    hidden: false,
    message: message,
    options: options,
  });

  return Promise.resolve();
};

export const hideActivityIndicator = (options) => (dispatch) => {
  dispatch({
    type: AppActionType.ACTIVITY_INDICATOR,
    hidden: true,
    options: options,
  });

  return Promise.resolve();
};
