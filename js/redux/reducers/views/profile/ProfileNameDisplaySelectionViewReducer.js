/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileNameDisplaySelectionViewActionType } from '../../../types';

const initState = () => {
  return {

  };
};

export default function profileNameDisplaySelectionViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case ProfileNameDisplaySelectionViewActionType.RESET:
      return initState();

    default:
      return state;
  }
}
