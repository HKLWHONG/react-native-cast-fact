/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, RecentSearchesSectionActionType } from '../../../types';

const initialState = {
  tags: [],
};

export default function recentSearchesSectionReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case RecentSearchesSectionActionType.RESET:
      return initialState;

    case RecentSearchesSectionActionType.TAGS_RESET:
    {
      let tags = state.tags.map((groupFrame) => {
        let data = groupFrame.data.map((tag) => {
          return {
            ...tag,
            disabled: false,
          };
        });

        return {
          ...groupFrame,
          data: data,
        };
      });

      return {
        ...state,
        tags: tags,
      };
    }

    case RecentSearchesSectionActionType.TAGS:
      return {
        ...state,
        tags: action.tags || [],
      };

    case RecentSearchesSectionActionType.TAGS_ADD_GROUP_FRAME:
    {
      if (!action.groupFrame) {
        return;
      }

      let maxGroupFrameId = -1;

      let tags = [...state.tags];

      tags.forEach((groupFrame, index) => {
        let groupFrameId = parseInt(groupFrame.groupFrameId);
        if (groupFrameId > maxGroupFrameId) {
          maxGroupFrameId = groupFrameId;
        }
      });

      let groupFrame = {
        ...action.groupFrame,
        groupFrameId: (maxGroupFrameId + 1).toString(),
        data: action.groupFrame.data || [],
        rightAccessoryType: 'delete',
      };

      /*
       * sorting from new to old
       */
      tags.splice(0, 0, groupFrame);

      tags = tags.filter((groupFrame, index) => {
        return index >= 0 && index < 2;
      });

      /*
       * sorting from old to new
       */
      // tags.push(groupFrame);

      return {
        ...state,
        tags: tags,
      };
    }

    case RecentSearchesSectionActionType.TAGS_DELETE_GROUP_FRAME:
    {
      let tags = state.tags.filter((groupFrame) => {
        return groupFrame.groupFrameId !== action.groupFrameId;
      });

      return {
        ...state,
        tags: tags,
      };
    }

    case RecentSearchesSectionActionType.TAGS_UPDATE_TAG:
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
