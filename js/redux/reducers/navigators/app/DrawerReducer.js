/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, DrawerActionType } from '../../../types';

const initState = () => {
  return {
    index: 0,
  };
};

export default function drawerReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case DrawerActionType.RESET:
      return initState();

    case DrawerActionType.SELECTION:
      return { ...state, index: action.index };

    default:
      return state;
  }
}
