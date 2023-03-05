/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SettingsViewActionType } from '../../../types';

const initState = () => {
  return {

  };
};

export default function settingsViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SettingsViewActionType.RESET:
      return initState();

    default:
      return state;
  }
}
