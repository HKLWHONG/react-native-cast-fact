/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CreateProjectStep1ActionType } from '../../../types';

import { CalendarProcessor } from '../../../../processors';

const initialState = {
  data: {
    durationFrom: CalendarProcessor.formatDate(new Date()),
    durationTo: CalendarProcessor.formatDate(new Date()),
  },
};

export default function createProjectStep1Reducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case CreateProjectStep1ActionType.RESET:
      return initialState;

    case CreateProjectStep1ActionType.DATA:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.data,
        },
      };

    default:
      return state;
  }
}
