/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SearchStackNavigatorActionType } from '../../../types';

const initState = () => {
  return {
    callbacks: {
      onRightViewRenderList: {},
    },
  };
};

export default function searchStackNavigatorReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SearchStackNavigatorActionType.RESET:
      return initState();

    case SearchStackNavigatorActionType.ADD_ON_RIGHT_VIEW_RENDER:
      if (!action.key) {
        return state;
      }

      state.callbacks.onRightViewRenderList[action.key] = action.value;

      return state;

    default:
      return state;
  }
}
