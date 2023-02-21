/**
 * @format
 * @flow strict-local
 */

import { store, SegmentedControlActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SegmentedControlActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
