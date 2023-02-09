/**
 * @format
 * @flow strict-local
 */

import { store, CalendarModalViewActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: CalendarModalViewActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setInitialDate = (initialDate) => (dispatch) => {
  dispatch({
    type: CalendarModalViewActionType.INITIAL_DATE,
    initialDate: initialDate,
  });

  return Promise.resolve(store.getState());
};

export const setOnDayPress = (onDayPress) => (dispatch) => {
  dispatch({
    type: CalendarModalViewActionType.ON_DAY_PRESS,
    onDayPress: onDayPress,
  });

  return Promise.resolve(store.getState());
};
