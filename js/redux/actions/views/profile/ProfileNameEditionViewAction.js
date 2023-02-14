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

export const addRef = (id, object) => (dispatch) => {
  dispatch({
    type: ProfileNameEditionViewActionType.ADD_REF,
    id: id,
    object: object,
  });

  return Promise.resolve(store.getState());
};
