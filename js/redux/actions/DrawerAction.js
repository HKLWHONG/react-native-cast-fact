/**
 * @format
 * @flow strict-local
 */

import { DrawerActionType } from '../types';

export const select = (index) => (dispatch) => {
  dispatch({
    type: DrawerActionType.SELECTION,
    index: index,
  });

  return Promise.resolve();
};
