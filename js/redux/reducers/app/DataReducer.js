/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, DataActionType } from '../../types';

const initialState = {

};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case DataActionType.RESET:
      return initialState;

    default:
      return state;
  }
}
