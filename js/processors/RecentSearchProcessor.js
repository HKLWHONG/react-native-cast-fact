/**
 * @format
 * @flow strict-local
 */

import { Environment } from '../config';

import { store, RecentSearchesSectionAction } from '../redux';

export const format = (tags) => {
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

  let recentSearches = [...store.getState().dataReducer.recentSearchesSectionTags];

  if (recentSearches.length === 0) {
    return;
  }

  let tags = [];

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

  store.dispatch(RecentSearchesSectionAction.setTags(tags));
};

export const addGroupFrame = (tags, groupFrame) => {
  tags = [...tags];
  
  if (!groupFrame) {
    return tags;
  }

  let data = format(groupFrame.data);

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

  tags = tags.filter((groupFrame, index) => {
    return index >= 0 && index < Environment.MAX_RECENT_SEARCHES_NUM;
  });

  return tags;
};
