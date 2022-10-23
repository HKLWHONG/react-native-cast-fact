/**
 * @format
 * @flow strict-local
 */

export const format = (list, data) => {
  let feeds = [
    ...data,
  ];

  feeds = feeds.map((feed, index) => {
    return {
      ...feed,
      feedId: (list.length + index).toString(),
    }
  })

  return [...list, ...feeds];
};
