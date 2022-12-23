/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CriteriaSectionActionType } from '../../../types';

import { CriteriaProcessor } from '../../../../processors';

const initState = () => {
  return {
    tags: [],
    lengthOfResults: 0,
  };
};

export default function criteriaSectionReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case CriteriaSectionActionType.RESET:
      return initState();

    case CriteriaSectionActionType.TAGS:
      return {
        ...state,
        tags: action.tags || [],
      };

    case CriteriaSectionActionType.TAGS_ADD_TAG:
    {
      if (!action.tag) {
        return state;
      }

      return {
        ...state,
        tags: CriteriaProcessor.addTag(state.tags, action.tag),
      };
    }

    case CriteriaSectionActionType.TAGS_DELETE_TAG:
    {
      let tags = state.tags.map((groupFrame) => {
        if (groupFrame.groupFrameId === action.groupFrameId) {
          let data = groupFrame.data.filter((tag) => {
            return tag.tagId !== action.tagId;
          });

          groupFrame.data = data;
        }

        return groupFrame;
      });

      tags = tags.filter((groupFrame) => {
        return groupFrame.data.length > 0;
      });

      return {
        ...state,
        tags: tags,
      };
    }

    case CriteriaSectionActionType.LENGTH_OF_RESULTS:
      return {
        ...state,
        lengthOfResults: action.lengthOfResults || 0,
      };

    default:
      return state;
  }
}
