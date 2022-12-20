/**
 * @format
 * @flow strict-local
 */

import { store, CalendarModalActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
  dispatch({
    type: CalendarModalActionType.RESET,
  });

  return Promise.resolve(store.getState());
};

export const setInitialDate = (initialDate) => (dispatch) => {
  dispatch({
    type: CalendarModalActionType.INITIAL_DATE,
    initialDate: initialDate,
  });

  return Promise.resolve(store.getState());
};

export const setOnDayPress = (onDayPress) => (dispatch) => {
  dispatch({
    type: CalendarModalActionType.ON_DAY_PRESS,
    onDayPress: onDayPress,
  });

  return Promise.resolve(store.getState());
};
