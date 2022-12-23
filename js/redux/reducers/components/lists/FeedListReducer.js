/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, FeedListActionType } from '../../../types';

const initState = () => {
  return {

  };
};

export default function recentSearchesReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case FeedListActionType.RESET:
      return initState();

    default:
      return state;
  }
}
