/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileInfoViewActionType } from '../../../types';

const initState = () => {
  return {

  };
};

export default function profileInfoViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case ProfileInfoViewActionType.RESET:
      return initState();

    default:
      return state;
  }
}
