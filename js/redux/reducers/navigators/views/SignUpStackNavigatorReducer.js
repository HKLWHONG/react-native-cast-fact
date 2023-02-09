/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SignUpStackNavigatorActionType } from '../../../types';

const initState = () => {
  return {

  };
};

export default function signUpStackNavigatorReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SignUpStackNavigatorActionType.RESET:
      return initState();

    default:
      return state;
  }
}
