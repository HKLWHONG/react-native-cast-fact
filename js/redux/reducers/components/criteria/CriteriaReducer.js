/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CriteriaActionType } from '../../../types';

const initialState = {
  text: '',
  tags: [],
};

export default function criteriaReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initialState;

    case CriteriaActionType.RESET:
      return initialState;

    case CriteriaActionType.TEXT:
      return {
        ...state,
        text: action.text || '',
      };

    case CriteriaActionType.TAGS:
      return {
        ...state,
        tags: action.tags || [],
      };

    case CriteriaActionType.TAGS_ADD_TAG:
    {
      let tags = state.tags.filter((item) => {
        return item.groupFrameId === '0';
      });

      if (tags.length == 0) {
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
        let maxTagId = 0;

        tags[0].data.forEach((item, i) => {
          let tagId = parseInt(item.tagId);
          if (tagId > maxTagId) {
            maxTagId = tagId;
          }
        });

        tags[0].data.push({
          ...action.tag,
          tagId: (maxTagId + 1).toString(),
          rightAccessoryType: 'delete',
        })
      }

      return {
        ...state,
        tags: tags,
      };
    }

    case CriteriaActionType.TAGS_DELETE_TAG:
    {
      let tags = state.tags.map((item) => {
        if (item.groupFrameId === action.groupFrameId) {
          let data = item.data.filter((tag) => {
            return tag.tagId !== action.tagId;
          });

          item.data = data;
        }

        return item;
      });

      tags = tags.filter((item) => {
        return item.data.length > 0;
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
