/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileInfoCardActionType } from '../../../types';

const initState = () => {
  return {

  };
};

export default function profileInfoCardReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case ProfileInfoCardActionType.RESET:
      return initState();

    default:
      return state;
  }
}
