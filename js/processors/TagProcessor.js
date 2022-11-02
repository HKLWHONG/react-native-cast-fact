/**
 * @format
 * @flow strict-local
 */

export const toPrefix = (tag) => {
 if (!tag) {
   return '';
 }

 return (tag.prefix || '').trim();
};

export const toText = (tag) => {
  if (!tag) {
    return '';
  }

  return (tag.text || '').trim();
};

export const toRangeText = (tag) => {
  if (!tag) {
    return '';
  }

  return ((tag.fromText || '') + ' - ' + (tag.toText || '')).trim();
};

export const toSuffix = (tag) => {
  if (!tag) {
    return '';
  }

  return (tag.suffix || '').trim();
};

export const toString = (tag) => {
  if (!tag) {
    return '';
  }

  return (toPrefix(tag) + ' ' + toText(tag) + ' ' + toSuffix(tag)).trim();
};

export const toRangeString = (tag) => {
  if (!tag) {
    return '';
  }

  return (toPrefix(tag) + ' ' + toRangeText(tag) + ' ' + toSuffix(tag)).trim();
};

export const format = (data) => {
  let tags = [
    ...data,
  ].map((groupFrame, groupFrameId) => {
    return {
      ...groupFrame,
      groupFrameId: groupFrameId.toString(),
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
