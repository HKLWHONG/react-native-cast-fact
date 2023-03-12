/**
 * @format
 * @flow strict-local
 */

import { store } from '../redux';

export const addTag = (tags, tag) => {
  tags = [...tags];

  if (!tag) {
    return tags;
  }

  if (tag.text) {
    tag.text = tag.text.trim();
  }

  tags = tags.map((groupFrame) => {
    return {
      ...groupFrame,
      data: [ ...groupFrame.data ],
    };
  })
    .filter((groupFrame) => {
      return groupFrame.groupFrameId === '0';
    });

  if (tags.length === 0) {
    tags.push({
      groupFrameId: '0',
      data: [
        {
          ...tag,
          tagId: '0',
          rightAccessoryType: 'delete',
        },
      ],
    });
  } else {
    let existingTags = tags[0].data.filter((existingTag) => {
      return (
        existingTag.text && tag.text
        &&
        existingTag.text.toLowerCase() === tag.text.toLowerCase()
      );
    });

    if (existingTags.length === 0) {
      let maxTagId = -1;

      tags[0].data.forEach((tag, i) => {
        let tagId = parseInt(tag.tagId);
        if (tagId > maxTagId) {
          maxTagId = tagId;
        }
      });

      tag = {
        ...tag,
        tagId: (maxTagId + 1).toString(),
        rightAccessoryType: 'delete',
      };

      if (tag.isManual) {
        tags[0].data.splice(0, 0, tag);
      } else {
        tags[0].data.push(tag);
      }
    }
  }

  return tags;
};
