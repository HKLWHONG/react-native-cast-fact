/**
 * @format
 * @flow strict-local
 */

import { Environment } from '../config';

import { store, RecentSearchesSectionAction } from '../redux';

import { CommonProcessor } from '../processors';

export const formatTags = (tags) => {
  if (!tags || tags.length === 0) {
    return [];
  }

  // console.log('[tags]', tags);

  let data = tags.map((tag) => {
    tag = { ...tag };

    delete tag.rightAccessoryType;

    return tag;
  });

  return data;
};

export const toIds = (ids) => {
  if (!ids || ids.length === 0) {
    return '';
  }

  ids = ids.join(",");

  return ids;
};

export const reload = () => {
  store.dispatch(RecentSearchesSectionAction.reset());

  store.dispatch(RecentSearchesSectionAction.setTags(getTags()));
};

export const getTags = () => {
  let tags = [];

  let recentSearches = [...CommonProcessor.deepCopy(store.getState().dataReducer.recentSearchesSectionTags)];

  if (recentSearches.length === 0) {
    return [];
  }

  recentSearches.reverse().forEach((recentSearch, index) => {
    if (!recentSearch.tags) {
      return;
    }

    let groupFrame = {
      data: JSON.parse(recentSearch.tags),
      origin: recentSearch,
    };

    tags = addGroupFrame(tags, groupFrame);
  });

  return tags;
};

export const addGroupFrame = (tags, groupFrame) => {
  tags = [...tags];

  if (!groupFrame) {
    return tags;
  }

  let data = formatTags(groupFrame.data);

  if (data.length === 0) {
    return tags;
  }

  groupFrame = {
    ...groupFrame,
    data: data,
  };

  let maxGroupFrameId = -1;

  tags.forEach((groupFrame, index) => {
    let groupFrameId = parseInt(groupFrame.groupFrameId);
    if (groupFrameId > maxGroupFrameId) {
      maxGroupFrameId = groupFrameId;
    }
  });

  groupFrame = {
    ...groupFrame,
    groupFrameId: (maxGroupFrameId + 1).toString(),
    rightAccessoryType: 'delete',
  };

  /*
   * sorting from new to old
   */
  tags.splice(0, 0, groupFrame);

  /*
   * sorting from old to new
   */
  // tags.push(groupFrame);

  /*
   * set maximum items
   */
  tags = tags.filter((groupFrame, index) => {
    return index >= 0 && index < Environment.MAX_RECENT_SEARCHES_NUM;
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
