/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, LaunchViewActionType } from '../../../types';

const initState = () => {
  return {};
};

export default function launchViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case LaunchViewActionType.RESET:
      return initState();

    default:
      return state;
  }
}
