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

export const setOnDayPress = (onDayPress) => (dispatch) => {
  dispatch({
    type: CalendarModalActionType.ON_DAY_PRESS,
    onDayPress: onDayPress,
  });

  return Promise.resolve(store.getState());
};
