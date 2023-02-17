/**
 * @format
 * @flow strict-local
 */

import { store, ProfileNameEditionViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: ProfileNameEditionViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const addRef = (key, value) => (dispatch) => {
  dispatch({
    type: ProfileNameEditionViewActionType.ADD_REF,
    key: key,
    value: value,
  });

  return Promise.resolve(store.getState());
};
