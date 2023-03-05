/**
 * @format
 * @flow strict-local
 */

import { store, SettingsViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: SettingsViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};
