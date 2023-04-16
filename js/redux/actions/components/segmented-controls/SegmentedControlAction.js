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

export const setIndex = (index) => (dispatch) => {
  dispatch({
    type: SegmentedControlActionType.INDEX,
    index: index,
  });

  return Promise.resolve(store.getState());
};
