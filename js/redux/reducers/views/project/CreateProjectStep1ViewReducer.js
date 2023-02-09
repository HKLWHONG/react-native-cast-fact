/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CreateProjectStep1ViewActionType } from '../../../types';

import { CalendarProcessor } from '../../../../processors';

const initState = () => {
  return {
    data: {
      durationFrom: CalendarProcessor.formatDate(new Date()),
      durationTo: CalendarProcessor.formatDate(new Date()),
    },
  };
};

export default function createProjectStep1ViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case CreateProjectStep1ViewActionType.RESET:
      return initState();

    case CreateProjectStep1ViewActionType.DURATION_FROM:
      return {
        ...state,
        data: {
          ...state.data,
          durationFrom: action.durationFrom || CalendarProcessor.formatDate(new Date()),
        },
      };

    case CreateProjectStep1ViewActionType.DURATION_TO:
      return {
        ...state,
        data: {
          ...state.data,
          durationTo: action.durationTo || CalendarProcessor.formatDate(new Date()),
        },
      };

    default:
      return state;
  }
}
