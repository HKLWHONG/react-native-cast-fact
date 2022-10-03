/**
 * @format
 * @flow strict-local
 */

import { FeedActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: FeedActionType.RESET,
  });

  return Promise.resolve();
};
