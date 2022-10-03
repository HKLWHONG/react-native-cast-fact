/**
 * @format
 * @flow strict-local
 */

import { LaunchActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: LaunchActionType.RESET,
  });

  return Promise.resolve();
};
