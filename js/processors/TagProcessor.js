/**
 * @format
 * @flow strict-local
 */

import {
  store,
  RecentSearchesSectionAction,
  FindTalentSectionAction,
} from '../redux';

import {
  CommonProcessor,
  RecentSearchProcessor,
  FindTalentProcessor,
} from '../processors';

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

export const toReferenceString = (tag, referenceTag) => {
  if (!tag) {
    return '';
  }

  if (tag.type.toLowerCase() === 'input'.toLowerCase()) {
    return toString({
      ...tag,
      prefix: (referenceTag && referenceTag.prefix) || tag.prefix,
      suffix: (referenceTag && referenceTag.suffix) || tag.suffix,
    });
  } else if (tag.type.toLowerCase() === 'range'.toLowerCase()) {
    return toRangeString({
      ...tag,
      prefix: (referenceTag && referenceTag.prefix) || tag.prefix,
      suffix: (referenceTag && referenceTag.suffix) || tag.suffix,
    });
  }

  return '';
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

export const reload = () => {
  let recentSearchesTags = RecentSearchProcessor.getTags();
  let findTalentTags = [...store.getState().findTalentSectionReducer.tags];

  store.getState().recentSearchesSectionReducer.tags.forEach((recentSearchesGroupFrame) => {
    recentSearchesGroupFrame.data.forEach((recentSearchesTag) => {
      let matched = false;

      store.getState().criteriaSectionReducer.tags.forEach((criteriaGroupFrame) => {
        criteriaGroupFrame.data.forEach((criteriaTag) => {
          let criteriaTagText = toText(criteriaTag);
          let recentSearchesTagText = toText(recentSearchesTag);

          if (criteriaTagText.toLowerCase() === recentSearchesTagText.toLowerCase()) {
            matched = true;
          }
        });
      });

      recentSearchesTags = RecentSearchProcessor.updateTag(
        recentSearchesTags,
        recentSearchesGroupFrame.groupFrameId,
        recentSearchesTag.tagId,
        {
          disabled: matched,
        },
      );
    });
  });

  store.getState().findTalentSectionReducer.tags.forEach((findTalentGroupFrame) => {
    if (
      findTalentGroupFrame.rightAccessoryType
      &&
      (
        findTalentGroupFrame.rightAccessoryType.toLowerCase() === 'check'.toLowerCase()
        ||
        findTalentGroupFrame.rightAccessoryType.toLowerCase() === 'plus'.toLowerCase()
      )
    ) {
      let matched = false;

      findTalentGroupFrame.data.forEach((findTalentTag) => {
        store.getState().criteriaSectionReducer.tags.forEach((criteriaGroupFrame) => {
          criteriaGroupFrame.data.forEach((criteriaTag) => {
            let criteriaTagText = toText(criteriaTag);

            let referenceTag = undefined;

            let referenceTags = findTalentGroupFrame.data.filter((referenceTag) => {
              return (
                referenceTag.referenceId === findTalentTag.id
                &&
                referenceTag.checked
              );
            });

            if (referenceTags.length > 0) {
              referenceTag = referenceTags[0];
            }

            let findTalentTagText = toReferenceString(findTalentTag, referenceTag);

            if (criteriaTagText.toLowerCase() === findTalentTagText.toLowerCase()) {
              matched = true;
            }
          });
        });
      });

      let object = {
        disabled: matched,
      };

      if (findTalentGroupFrame.rightAccessoryType.toLowerCase() === 'check'.toLowerCase()) {
        object = {
          ...object,
          checked: matched,
        };
      }

      findTalentTags = FindTalentProcessor.updateGroupFrame(
        findTalentTags,
        findTalentGroupFrame.groupFrameId,
        object,
      );
    } else {
      findTalentGroupFrame.data.forEach((findTalentTag) => {
        let matched = false;

        store.getState().criteriaSectionReducer.tags.forEach((criteriaGroupFrame) => {
          criteriaGroupFrame.data.forEach((criteriaTag) => {
            let criteriaTagText = toText(criteriaTag);
            let findTalentTagText = toString(findTalentTag);

            if (criteriaTagText.toLowerCase() === findTalentTagText.toLowerCase()) {
              matched = true;
            }
          });
        });

        findTalentTags = FindTalentProcessor.updateTag(
          findTalentTags,
          findTalentGroupFrame.groupFrameId,
          findTalentTag.tagId,
          {
            disabled: matched,
          },
        );
      });
    }
  });

  store.dispatch(RecentSearchesSectionAction.setTags(recentSearchesTags));
  store.dispatch(FindTalentSectionAction.setTags(findTalentTags));
};
