/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, MainTabNavigatorActionType } from '../../../types';

const initState = () => {
  return {
    index: 0,
    tapCount: 0,
    tapTimer: undefined,
    listRefs: [],
  };
};

export default function mainTabNavigatorReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case MainTabNavigatorActionType.RESET:
      return initState();

    case MainTabNavigatorActionType.TAP_COUNT:
      return {...state, tapCount: action.tapCount};

    case MainTabNavigatorActionType.TAP_TIMER:
      return {...state, tapTimer: action.tapTimer};

    case MainTabNavigatorActionType.SELECTION:
      return {...state, index: action.index};

    case MainTabNavigatorActionType.LIST_REFS:
      if (action.tabIndex >= state.listRefs.length) {
        let difference = action.tabIndex - state.listRefs.length + 1;

        for (let i = 0; i < difference; i += 1) {
          state.listRefs.push([]);
        }
      }

      if (action.screenIndex >= state.listRefs[action.tabIndex].length) {
        let difference = action.screenIndex - state.listRefs[action.tabIndex].length + 1;

        for (let i = 0; i < difference; i += 1) {
          state.listRefs[action.tabIndex].push([]);
        }
      }

      state.listRefs[action.tabIndex][action.screenIndex] = action.listRef;

      return state;

    default:
      return state;
  }
}
