/**
 * @format
 * @flow strict-local
 */

import { Environment } from '../config';

import { store } from '../redux';

export const updateGroupFrame = (tags, groupFrameId, object) => {
  tags = [...tags];

  if (!groupFrameId || !object) {
    return tags;
  }

  tags = tags.map((groupFrame) => {
    if (groupFrame.groupFrameId === groupFrameId) {
      groupFrame = {
        ...groupFrame,
        ...object,
      };
    }

    return groupFrame;
  });

  return tags;
};

export const updateTag = (tags, groupFrameId, tagId, object) => {
  tags = [...tags];

  if (!groupFrameId || !tagId || !object) {
    return tags;
  }

  tags = tags.map((groupFrame) => {
    if (groupFrame.groupFrameId === groupFrameId) {
      let data = groupFrame.data.map((tag) => {
        if (tag.tagId === tagId) {
          tag = {
            ...tag,
            ...object,
          };
        }

        return tag;
      });

      groupFrame.data = data;
    }

    return groupFrame;
  });

  return tags;
};
