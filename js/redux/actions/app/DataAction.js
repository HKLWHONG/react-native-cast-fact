/**
 * @format
 * @flow strict-local
 */

import { store, DataActionType } from '../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: DataActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setDummyData = (dummyData) => (dispatch) => {
  dispatch({
    type: DataActionType.DUMMY_DATA,
    dummyData: dummyData,
  });

  return Promise.resolve(store.getState());
};

export const setTags = (tags) => (dispatch) => {
  dispatch({
    type: DataActionType.TAGS,
    tags: tags,
  });

  return Promise.resolve(store.getState());
};
