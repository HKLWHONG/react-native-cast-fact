/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CalendarModalActionType } from '../../../types';

const initialState = {
  callbacks: {
    onDayPress: undefined,
  },
};

export default function calendarModalReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case CalendarModalActionType.RESET:
      return initialState;

    case CalendarModalActionType.ON_DAY_PRESS:
      return {
        ...state,
        callbacks: {
          ...state.callbacks,
          onDayPress: action.onDayPress,
        },
      };

    default:
      return state;
  }
}
