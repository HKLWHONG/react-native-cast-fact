/**
 * @format
 * @flow strict-local
 */

import { store } from '../redux';

import { AppRegex } from '../regex';

import { Constants } from '../constants';

import { CalendarProcessor } from '../processors';

import i18n from '../../i18n';

export const validateNameDisplayFormat_0 = () => {
  const { account } = store.getState().profileInfoSetupViewReducer;

  let isValid = false;

  if (
    account.info.nickname
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.nickname)
  ) {
    isValid = true;
  } else if (
    account.info.lastnameEn
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.lastnameEn)
  ) {
    isValid = true;
  } else if (
    account.info.lastnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.lastnameZh)
  ) {
    isValid = true;
  } else if (
    account.info.firstnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.firstnameZh)
  ) {
    isValid = true;
  }

  return isValid;
};

export const validateNameDisplayFormat_1 = () => {
  const { account } = store.getState().profileInfoSetupViewReducer;

  let isValid = false;

  if (
    account.info.firstnameEn
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.firstnameEn)
  ) {
    isValid = true;
  } else if (
    account.info.lastnameEn
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.lastnameEn)
  ) {
    isValid = true;
  } else if (
    account.info.lastnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.lastnameZh)
  ) {
    isValid = true;
  } else if (
    account.info.firstnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.firstnameZh)
  ) {
    isValid = true;
  }

  return isValid;
};

export const validateNameDisplayFormat_2 = () => {
  const { account } = store.getState().profileInfoSetupViewReducer;

  let isValid = false;

  if (
    account.info.nickname
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.nickname)
  ) {
    isValid = true;
  } else if (
    account.info.lastnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.lastnameZh)
  ) {
    isValid = true;
  } else if (
    account.info.firstnameZh
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.firstnameZh)
  ) {
    isValid = true;
  }

  return isValid;
};

export const validateNameDisplayFormat_3 = () => {
  const { account } = store.getState().profileInfoSetupViewReducer;

  let isValid = false;

  if (
    account.info.nickname
    &&
    AppRegex.EMPTY_FIELD_REGEX.test(account.info.nickname)
  ) {
    isValid = true;
  }

  return isValid;
};

export const fetchGroupFrames = (key) => {
  if (!store.getState().profileCastSheetEditionViewReducer.account.info) {
    store.getState().profileCastSheetEditionViewReducer.account.info = {};
  }

  const { info } = store.getState().profileCastSheetEditionViewReducer.account;

  if (!info[key] || !info[key].groupFrames) {
    info[key] = {
      ...info[key],
      groupFrames: [],
    }
  }

  return info[key].groupFrames;
};

export const fetchGroupFrame = (key, groupFrameId) => {
  let groupFrames = fetchGroupFrames(key);

  let groupFrame = groupFrames.filter((groupFrame) => {
    return groupFrame.groupFrameId === groupFrameId;
  });

  if (groupFrame.length === 0) {
    groupFrame = [
      ...groupFrame,
      {
        groupFrameId: groupFrameId,
        data: [],
      },
    ];

    groupFrames = [
      ...groupFrames,
      groupFrame[0],
    ];

    store.getState().profileCastSheetEditionViewReducer.account.info[key].groupFrames = groupFrames;
  }

  return groupFrame[0];
};

export const fetchTag = (key, groupFrameId, tagKey) => {
  const groupFrame = fetchGroupFrame(key, groupFrameId);

  let tag = groupFrame.data.filter((tag) => {
    return tag.key === tagKey;
  });

  if (tag.length === 0) {
    tag = [
      ...tag,
      {
        key: tagKey,
      },
    ];

    groupFrame.data = [
      ...groupFrame.data,
      tag[0],
    ];
  }

  return tag[0];
};

export const addGroupFrame = (key) => {
  let groupFrames = fetchGroupFrames(key);

  groupFrames = groupFrames.map((groupFrame) => {
    if (groupFrame.groupFrameId !== 'input') {
      return groupFrame;
    }

    return {
      ...groupFrame,
      groupFrameId: groupFrames.filter((groupFrame) => {
        return groupFrame.groupFrameId !== 'input';
      }).length.toString(),
    };
  });

  return groupFrames;
};

export const updateGroupFrame = (key, newGroupFrame) => {
  let groupFrames = fetchGroupFrames(key);

  groupFrames = groupFrames.map((groupFrame) => {
    if (groupFrame.groupFrameId !== newGroupFrame.groupFrameId) {
      return groupFrame;
    }

    return newGroupFrame;
  });

  return groupFrames;
};

export const deleteGroupFrame = (key, groupFrameId) => {
  let groupFrames = fetchGroupFrames(key);

  groupFrames = groupFrames.map((groupFrame) => {
    if (groupFrame.groupFrameId !== groupFrameId) {
      return groupFrame;
    }

    return {
      ...groupFrame,
      groupFrameId: `deleted-${groupFrame.groupFrameId}`,
    };
  });

  return groupFrames;
};

export const updateTag = (key, groupFrameId, newTag) => {
  let groupFrames = fetchGroupFrames(key);

  groupFrames = groupFrames.map((groupFrame) => {
    if (groupFrame.groupFrameId !== groupFrameId) {
      return groupFrame;
    }

    const data = groupFrame.data.map((tag) => {
      if (tag.key !== newTag.key) {
        return tag;
      }

      return newTag;
    });

    return {
      ...groupFrame,
      data: data,
    };
  });

  return groupFrames;
}

export const fetchApiField = (key) => {
  const info = store.getState().profileCastSheetEditionViewReducer.account.info[key];

  if (info) {
    if (info.text && info.text.length > 0) {
      return info.text;
    } else if (info.tags && info.tags.length > 0) {
      return info.tags[0].text;
    }
  }

  return '';
};

export const fetchApiFields = (key) => {
  const info = store.getState().profileCastSheetEditionViewReducer.account.info[key];

  let tags = (info && info.tags) || [];

  if (info && info.text && info.text.length > 0) {
    tags = [
      ...tags,
      {
        text: info.text,
      }
    ];
  }

  return tags.map((tag) => {
    return {
      text: tag.text,
    };
  });
};

export const fetchApiMultipleField = (key, propertyList = []) => {
  const { info } = store.getState().profileCastSheetEditionViewReducer.account;

  if (!info || !info[key] || !info[key].groupFrames) {
    return [];
  }

  return info[key].groupFrames
    .filter((groupFrame) => {
      return (
        groupFrame.groupFrameId !== 'input'
        &&
        !groupFrame.groupFrameId.startsWith('deleted')
      );
    })
    .map((groupFrame) => {
      let field = {};

      propertyList.forEach((propertyKey) => {
        field = {
          ...field,
          [propertyKey]: fetchTagValue(propertyKey, groupFrame),
        };
      });

      return field;
    });
};

export const fetchTagValue = (key, groupFrame) => {
  let value = groupFrame.data
    .filter((tag) => {
      return tag.key === key;
    })
    .map((tag) => {
      return tag.text || '';
    });

  return value.length > 0 ? value[0] : '';
};

export const fetchTagSuggessionList = (key) => {
  let label = Constants.TAGS_CAST_SHEET_KEY_MAPPING[key];

  if (!label) {
    label = i18n.t(`app.${key}`, { lng: 'en' });
  }

  let list = store.getState().findTalentSectionReducer.tags.filter((tags) => {
      return tags.label.toLowerCase() === label.toLowerCase();
  });

  if (list.length > 0) {
    list = list[0].data.map((tag) => {
      return tag.text;
    });
  }

  return list;
};

export const addTag = (text, state) => {
  let tags = (
    (
      store.getState().profileCastSheetEditionViewReducer.account.info[key]
      &&
      store.getState().profileCastSheetEditionViewReducer.account.info[key].tags
    )
    ||
    []
  );

  if (text && text.length > 0 && (state === undefined || state === 'success')) {
    tags = [
      ...tags,
      {
        text: text.trim(),
      },
    ];
  }

  return tags.map((tag, index) => {
    return {
      ...tag,
      tagId: index.toString(),
    };
  });
};
