/**
 * @format
 * @flow strict-local
 */

import { store, FeedListActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: FeedListActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
