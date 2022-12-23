/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CalendarModalActionType } from '../../../types';

const initState = () => {
  return {
    initialDate: undefined,
    callbacks: {
      onDayPress: undefined,
    },
  };
};

export default function calendarModalReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case CalendarModalActionType.RESET:
      return initState();


    case CalendarModalActionType.INITIAL_DATE:
      return {
        ...state,
        initialDate: action.initialDate,
      };

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
