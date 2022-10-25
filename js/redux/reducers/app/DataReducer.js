/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, DataActionType } from '../../types';

const initialState = {
  dummyData: [],
  tags: [],
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case DataActionType.RESET:
      return initialState;

    case DataActionType.DUMMY_DATA:
      return {
        ...state,
        dummyData: action.dummyData || [],
      };

    case DataActionType.TAGS:
      return {
        ...state,
        tags: action.tags || [],
      };

    default:
      return state;
  }
}
