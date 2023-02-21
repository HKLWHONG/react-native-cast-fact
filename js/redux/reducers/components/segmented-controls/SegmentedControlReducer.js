/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SegmentedControlActionType } from '../../../types';

const initState = () => {
  return {

  };
};

export default function segmentedControlReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SegmentedControlActionType.RESET:
      return initState();

    default:
      return state;
  }
}
