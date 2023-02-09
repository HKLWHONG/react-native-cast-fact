/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, DrawerNavigatorActionType } from '../../../types';

const initState = () => {
  return {
    index: 0,
  };
};

export default function drawerNavigatorReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case DrawerNavigatorActionType.RESET:
      return initState();

    case DrawerNavigatorActionType.SELECTION:
      return { ...state, index: action.index };

    default:
      return state;
  }
}
