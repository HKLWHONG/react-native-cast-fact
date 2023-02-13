/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfilePictureSelectionViewActionType } from '../../../types';

const initState = () => {
  return {
    photo: undefined,
  };
};

export default function profilePictureSelectionViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case ProfilePictureSelectionViewActionType.RESET:
      return initState();

    case ProfilePictureSelectionViewActionType.PHOTO:
      return {
        ...state,
        photo: action.photo,
      };

    default:
      return state;
  }
}
