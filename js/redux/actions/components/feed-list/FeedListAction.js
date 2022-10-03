/**
 * @format
 * @flow strict-local
 */

import { FeedListActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: FeedListActionType.RESET,
  });

  return Promise.resolve();
};
