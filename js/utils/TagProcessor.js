/**
 * @format
 * @flow strict-local
 */

export const toPrefix = (tag) => {
 if (!tag) {
   return '';
 }

 return tag.prefix || '';
}

export const toText = (tag) => {
  if (!tag) {
    return '';
  }

  return tag.text || '';
}

export const toSuffix = (tag) => {
  if (!tag) {
    return '';
  }

  return tag.suffix || '';
}

export const toString = (tag) => {
  if (!tag) {
    return '';
  }

  return (toPrefix(tag) + ' ' + toText(tag) + ' ' + toSuffix(tag)).trim();
}
