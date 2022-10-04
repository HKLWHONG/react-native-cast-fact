/**
 * @format
 * @flow strict-local
 */

import { SearchBarActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchBarActionType.RESET,
  });

  return Promise.resolve();
};

export const setText = (text) => (dispatch) => {
  dispatch({
    type: SearchBarActionType.TEXT,
    text: text,
  });

  return Promise.resolve();
};
