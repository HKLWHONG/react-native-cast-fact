/**
 * @format
 * @flow strict-local
 */

import { DataActionType } from '../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: DataActionType.RESET,
  });

  return Promise.resolve();
};
