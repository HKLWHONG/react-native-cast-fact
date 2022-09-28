/**
 * @format
 * @flow strict-local
 */

import { MainTabActionType } from '../types';

export const select = (index) => (dispatch) => {
  dispatch({
    type: MainTabActionType.SELECTION,
    index: index,
  });

  return Promise.resolve();
};
