/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, MainTabActionType } from '../../types';

const initialState = {
  index: 1,
  listRefs: [],
};

export default function mainTabReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case MainTabActionType.RESET:
      return initialState;

    case MainTabActionType.SELECTION:
      return {...state, index: action.index};

    case MainTabActionType.LIST_REFS:
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
