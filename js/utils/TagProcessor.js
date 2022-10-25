/**
 * @format
 * @flow strict-local
 */

export const toPrefix = (tag) => {
 if (!tag) {
   return '';
 }

 return tag.prefix || '';
};

export const toText = (tag) => {
  if (!tag) {
    return '';
  }

  return tag.text || '';
};

export const toSuffix = (tag) => {
  if (!tag) {
    return '';
  }

  return tag.suffix || '';
};

export const toString = (tag) => {
  if (!tag) {
    return '';
  }

  return (toPrefix(tag) + ' ' + toText(tag) + ' ' + toSuffix(tag)).trim();
};

export const format = (data) => {
  let tags = [
    ...data,
  ].map((groupFrame, groupFrameId) => {
    return {
      groupFrameId: groupFrameId.toString(),
      label: groupFrame.label,
      data: groupFrame.data.map((tag, tagId) => {
        return {
          ...tag,
          tagId: tagId.toString(),
        };
      }),
    };
  });

  return tags;
};

export const cloneTags = (tags) => {
  return tags.map((tag) => {
    return { ...tag };
  });
};
