/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';
import {
  FindTalentSectionAction,
  CriteriaSectionAction,
  RecentSearchesSectionAction,
} from '../../redux';

import {
  Image,
  SingleTouch,
  TextInput,
} from '../../components';

import {
  Section,
  CollapsibleSection,
  GroupFrame,
  Tag,
  RangeTag,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme } from '../../utils';

import { SearchProcessor, TagProcessor } from '../../processors';

import { SearchProvider } from '../../providers';

import { Translation } from 'react-i18next';

const ic_search_gray = require('../../../assets/images/ic_search_gray/ic_search_gray.png');

class FindTalentSection extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    let children = (
      Array(props.tags.length)
        .fill()
        .map((_, i) => i)
        .map((i) => {
          let groupFrame = props.tags[i];

          // console.log('[groupFrame] ', groupFrame);

          let style = {};

          if (i > 0) {
            style = {
              ...style,
              marginTop: 16,
            };
          }

          let tags = (
            Array(groupFrame.data.length)
              .fill()
              .map((_, t) => t)
              .map((t) => {
                let tag = groupFrame.data[t];

                // console.log('[tag.tagId]', tag.tagId);

                if (tag.type && tag.type.toLowerCase() === 'range'.toLowerCase()) {
                  return (
                    <RangeTag
                      key={t.toString()}
                      info={{
                        ...tag,
                        groupFrameId: groupFrame.groupFrameId,
                      }}
                      fromText={tag.fromText}
                      toText={tag.toText}
                      regexOfFromText={tag.regexOfFromText}
                      regexOfToText={tag.regexOfToText}
                      maxLengthOfFromText={
                        tag.maxLengthOfFromText
                        &&
                        AppRegex.INTEGER_VALIDATION_REGEX.test(tag.maxLengthOfFromText)
                          ? parseInt(tag.maxLengthOfFromText)
                          : undefined
                      }
                      maxLengthOfToText={
                        tag.maxLengthOfToText
                        &&
                        AppRegex.INTEGER_VALIDATION_REGEX.test(tag.maxLengthOfToText)
                          ? parseInt(tag.maxLengthOfToText)
                          : undefined
                      }
                      onChangeFromText={({ groupFrameId, tagId, text }) => {
                        // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}, [text] ${text}`);

                        props.updateTag(groupFrameId, tagId, { fromText: text });

                        if (!groupFrame.checked) {
                          return;
                        }

                        SearchProvider.search(props, { prefetch: true }, {})
                          .catch((error) => {
                            console.error(error);
                          });
                      }}
                      onChangeToText={({ groupFrameId, tagId, text }) => {
                        // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}, [text] ${text}`);

                        props.updateTag(groupFrameId, tagId, { toText: text });

                        if (!groupFrame.checked) {
                          return;
                        }

                        SearchProvider.search(props, { prefetch: true }, {})
                          .catch((error) => {
                            console.error(error);
                          });
                      }}
                    />
                  );
                }

                return (
                  <Tag
                    key={t.toString()}
                    info={{
                      ...tag,
                      groupFrameId: groupFrame.groupFrameId,
                    }}
                    dotStyle={{ backgroundColor: tag.color }}
                    disabled={tag.disabled}
                    type={tag.type}
                    text={tag.text}
                    unit={tag.unit}
                    keyboardType={tag.keyboardType}
                    regex={tag.regex}
                    maxLength={
                      tag.maxLength
                      &&
                      AppRegex.INTEGER_VALIDATION_REGEX.test(tag.maxLength)
                        ? parseInt(tag.maxLength)
                        : undefined
                    }
                    leftAccessoryType={tag.leftAccessoryType}
                    rightAccessoryType={tag.rightAccessoryType}
                    source={(() => {
                      if (!tag.source) {
                        return;
                      }

                      if ((typeof tag.source).toLowerCase() === 'string'.toLowerCase()) {
                        return { uri: tag.source };
                      } else if ((typeof tag.source).toLowerCase() === 'number'.toLowerCase()) {
                        return tag.source;
                      }
                    })()}
                    resizeMode={tag.resizeMode}
                    checked={tag.checked}
                    onPress={(info) => {
                      // console.log('[info] ', info);

                      if (
                        tag.leftAccessoryType
                        &&
                        tag.leftAccessoryType.toLowerCase() === 'check'.toLowerCase()
                      ) {
                        props.updateTag(info.groupFrameId, info.tagId, { checked: !info.checked });
                      }

                      if (
                        tag.type
                        &&
                        tag.type.toLowerCase() === 'reference'.toLowerCase()
                      ) {
                        if (!groupFrame.checked) {
                          return;
                        }

                        SearchProvider.search(props, { prefetch: true }, {})
                          .catch((error) => {
                            console.error(error);
                          });

                        return;
                      }

                      let infoText = TagProcessor.toString(info);

                      props.recentSearchesTags.forEach((groupFrame) => {
                        let tags = groupFrame.data.filter((tag) => {
                          let text = TagProcessor.toString(tag);

                          return infoText.toLowerCase() === text.toLowerCase();
                        });

                        tags.forEach((tag) => {
                          props.updateRecentSearchesTag(groupFrame.groupFrameId, tag.tagId, { disabled: true });
                        });
                      });

                      props.tags.forEach((groupFrame) => {
                        let tags = groupFrame.data.filter((tag) => {
                          let text = TagProcessor.toString(tag);

                          return infoText.toLowerCase() === text.toLowerCase();
                        });

                        tags.forEach((tag) => {
                          props.updateTag(groupFrame.groupFrameId, tag.tagId, { disabled: true });
                        });
                      });

                      props.addCriteriaTag({
                        ...tag,
                        text: TagProcessor.toString(tag),
                      });

                      SearchProvider.search(props, { prefetch: true }, {})
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                    onChangeText={({ groupFrameId, tagId, text }) => {
                      // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}`);

                      props.updateTag(groupFrameId, tagId, { text: text });

                      if (!groupFrame.checked) {
                        return;
                      }

                      SearchProvider.search(props, { prefetch: true }, {})
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                  />
                );
              })
          );

          return (
            <CollapsibleSection
              key={i.toString()}
              style={style}
              text={groupFrame.label}
            >
              <GroupFrame
                info={groupFrame}
                style={{ borderColor: Theme.colors.general.transparent }}
                rightAccessoryType={groupFrame.rightAccessoryType}
                checked={groupFrame.checked}
                onPressRightAccessory={({ groupFrameId }) => {
                  // console.log('[groupFrameId] ', groupFrameId);

                  props.updateGroupFrame(groupFrameId, { checked: !groupFrame.checked });

                  SearchProvider.search(props, { prefetch: true }, {})
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                {tags}
              </GroupFrame>
            </CollapsibleSection>
          );
        })
    );

    return (
      <Translation>
        {(t) => (
          <Section
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            source={ic_search_gray}
            label={props.label}
          >
            {children}
          </Section>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
  },
});

FindTalentSection.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  label: PropTypes.string,
};

FindTalentSection.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  label: undefined,
};

function mapStateToProps(state) {
  return {
    tags: state.findTalentSectionReducer.tags,
    recentSearchesTags: state.recentSearchesSectionReducer.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(FindTalentSectionAction.reset(...args)),
    updateGroupFrame: (...args) => dispatch(FindTalentSectionAction.updateGroupFrame(...args)),
    updateTag: (...args) => dispatch(FindTalentSectionAction.updateTag(...args)),
    addCriteriaTag: (...args) => dispatch(CriteriaSectionAction.addTag(...args)),
    updateRecentSearchesTag: (...args) => dispatch(RecentSearchesSectionAction.updateTag(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FindTalentSection);
