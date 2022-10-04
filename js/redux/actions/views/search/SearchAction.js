/**
 * @format
 * @flow strict-local
 */

import { SearchActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchActionType.RESET,
  });

  return Promise.resolve();
};
