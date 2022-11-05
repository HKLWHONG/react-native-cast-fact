/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, FindTalentSectionActionType } from '../../../types';

import { FindTalentProcessor } from '../../../../processors';

const initialState = {
  tags: [],
};

export default function findTalentSectionReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case FindTalentSectionActionType.RESET:
      return initialState;

    case FindTalentSectionActionType.TAGS:
      return {
        ...state,
        tags: action.tags || [],
      };

    case FindTalentSectionActionType.TAGS_UPDATE_GROUP_FRAME:
    {
      return {
        ...state,
        tags: FindTalentProcessor.updateGroupFrame(
          state.tags,
          action.groupFrameId,
          action.object,
        ),
      };
    }

    case FindTalentSectionActionType.TAGS_UPDATE_TAG:
    {
      return {
        ...state,
        tags: FindTalentProcessor.updateTag(
          state.tags,
          action.groupFrameId,
          action.tagId,
          action.object,
        ),
      };
    }

    default:
      return state;
  }
}
