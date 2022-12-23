/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, LaunchActionType } from '../../../types';

const initState = () => {
  return {};
};

export default function launchReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case LaunchActionType.RESET:
      return initState();

    default:
      return state;
  }
}
