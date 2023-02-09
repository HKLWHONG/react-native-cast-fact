/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CalendarModalViewActionType } from '../../../types';

const initState = () => {
  return {
    initialDate: undefined,
    callbacks: {
      onDayPress: undefined,
    },
  };
};

export default function calendarModalViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case CalendarModalViewActionType.RESET:
      return initState();


    case CalendarModalViewActionType.INITIAL_DATE:
      return {
        ...state,
        initialDate: action.initialDate,
      };

    case CalendarModalViewActionType.ON_DAY_PRESS:
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
