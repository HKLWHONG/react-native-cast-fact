/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, FindTalentSectionActionType } from '../../../types';

import { TagProcessor } from '../../../../utils';

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
        tags: TagProcessor.cloneTags(action.tags || []),
      };

    case FindTalentSectionActionType.TAGS_UPDATE_GROUP_FRAME:
    {
      let tags = state.tags.map((groupFrame) => {
        if (groupFrame.groupFrameId === action.groupFrameId) {
          groupFrame = {
            ...groupFrame,
            ...action.object,
          };
        }

        return groupFrame;
      });

      return {
        ...state,
        tags: tags,
      };
    }

    case FindTalentSectionActionType.TAGS_UPDATE_TAG:
    {
      let tags = state.tags.map((groupFrame) => {
        if (groupFrame.groupFrameId === action.groupFrameId) {
          let data = groupFrame.data.map((tag) => {
            if (tag.tagId === action.tagId) {
              tag = {
                ...tag,
                ...action.object,
              };
            }

            return tag;
          });

          groupFrame.data = data;
        }

        return groupFrame;
      });

      return {
        ...state,
        tags: tags,
      };
    }

    default:
      return state;
  }
}
