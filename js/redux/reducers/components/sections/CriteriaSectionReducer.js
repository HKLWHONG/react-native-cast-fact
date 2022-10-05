/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CriteriaSectionActionType } from '../../../types';

const initialState = {
  text: '',
  tags: [],
};

export default function criteriaSectionReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case CriteriaSectionActionType.RESET:
      return initialState;

    case CriteriaSectionActionType.TEXT:
      return {
        ...state,
        text: action.text || '',
      };

    case CriteriaSectionActionType.TAGS:
      return {
        ...state,
        tags: action.tags || [],
      };

    case CriteriaSectionActionType.TAGS_ADD_TAG:
    {
      if (!action.tag) {
        return;
      }

      let tags = state.tags.filter((groupFrame) => {
        return groupFrame.groupFrameId === '0';
      });

      if (tags.length === 0) {
        tags.push({
          groupFrameId: '0',
          data: [
            {
              ...action.tag,
              tagId: '0',
              rightAccessoryType: 'delete',
            },
          ],
        });
      } else {
        let existingTags = tags[0].data.filter((tag) => {
          return (
            tag.text && action.tag.text
            &&
            tag.text.toLowerCase() === action.tag.text.toLowerCase()
          );
        });

        if (existingTags.length === 0) {
          let maxTagId = 0;

          tags[0].data.forEach((tag, i) => {
            let tagId = parseInt(tag.tagId);
            if (tagId > maxTagId) {
              maxTagId = tagId;
            }
          });

          let tag = {
            ...action.tag,
            tagId: (maxTagId + 1).toString(),
            rightAccessoryType: 'delete',
          };

          if (action.tag.isManual) {
            tags[0].data.splice(0, 0, tag);
          } else {
            tags[0].data.push(tag);
          }
        }
      }

      return {
        ...state,
        tags: tags,
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

    default:
      return state;
  }
}
