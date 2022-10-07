/**
 * @format
 * @flow strict-local
 */

import { DataActionType } from '../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: DataActionType.RESET,
  });

  return Promise.resolve();
};

export const setDummyData = (dummyData) => (dispatch) => {
  dispatch({
    type: DataActionType.DUMMY_DATA,
    dummyData: dummyData,
  });

  return Promise.resolve();
};
