/**
 * @format
 * @flow strict-local
 */

import { SearchResultActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: SearchResultActionType.RESET,
  });

  return Promise.resolve();
};
