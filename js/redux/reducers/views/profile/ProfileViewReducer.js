/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileViewActionType } from '../../../types';

const initState = () => {
  return {
    index: 0,
  };
};

export default function profileViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case ProfileViewActionType.RESET:
      return initState();

    case ProfileViewActionType.INDEX:
      return {
        ...state,
        index: action.index,
      };

    default:
      return state;
  }
}
