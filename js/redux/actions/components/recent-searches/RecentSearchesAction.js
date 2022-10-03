/**
 * @format
 * @flow strict-local
 */

import { RecentSearchesActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: RecentSearchesActionType.RESET,
  });

  return Promise.resolve();
};
