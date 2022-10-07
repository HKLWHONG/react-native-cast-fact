/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';
import {
  FindTalentSectionAction,
  CriteriaSectionAction,
  RecentSearchesSectionAction,
} from '../../redux';

import {
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

import { Theme } from '../../utils';

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
                      fromValue={tag.fromValue}
                      toValue={tag.toValue}
                      regexOfFromValue={tag.regexOfFromValue}
                      regexOfToValue={tag.regexOfToValue}
                      maxLengthOfFromValue={parseInt(tag.maxLengthOfFromValue)}
                      maxLengthOfToValue={parseInt(tag.maxLengthOfToValue)}
                      onChangeFromValue={({ groupFrameId, tagId, value }) => {
                        // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}, [value] ${value}`);

                        props.updateTag(groupFrameId, tagId, { fromValue: value });
                      }}
                      onChangeToValue={({ groupFrameId, tagId, value }) => {
                        // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}, [value] ${value}`);

                        props.updateTag(groupFrameId, tagId, { toValue: value });
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
                    dotStyle={{ backgroundColor: tag.dotColor }}
                    disabled={tag.disabled}
                    type={tag.type}
                    value={tag.value}
                    text={tag.text}
                    keyboardType={tag.keyboardType}
                    regex={tag.regex}
                    maxLength={parseInt(tag.maxLength)}
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
                      // console.log(`[groupFrameId] ${info.groupFrameId}, [tagId] ${info.tagId}`);

                      if (
                        tag.leftAccessoryType
                        &&
                        tag.leftAccessoryType.toLowerCase() === 'check'.toLowerCase()
                      ) {
                        props.updateTag(info.groupFrameId, info.tagId, { checked: !tag.checked });
                      } else {
                        let prefix = tag.prefix ? tag.prefix + ' ' : '';
                        let suffix = tag.suffix ? ' ' + tag.suffix : '';

                        let recentSearchesInfo = undefined;

                        props.recentSearchesTags.forEach((groupFrame) => {
                          let data = groupFrame.data.filter((tag) => {
                            return (
                              tag.findTalentInfo
                              &&
                              tag.findTalentInfo.groupFrameId === info.groupFrameId
                              &&
                              tag.findTalentInfo.tagId === info.tagId
                            );
                          });

                          data.forEach((tag) => {
                            recentSearchesInfo = {
                              ...tag,
                              groupFrameId: groupFrame.groupFrameId,
                            };

                            props.updateRecentSearchesTag(groupFrame.groupFrameId, tag.tagId, { disabled: true });
                          });
                        });

                        props.addCriteriaTag({
                          ...tag,
                          text: prefix + tag.text + suffix,
                          recentSearchesInfo: recentSearchesInfo,
                          findTalentInfo: info,
                        });

                        props.updateTag(info.groupFrameId, info.tagId, { disabled: true });
                      }
                    }}
                    onChangeValue={({ groupFrameId, tagId, value }) => {
                      // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}`);

                      props.updateTag(groupFrameId, tagId, { value: value });
                    }}
                  />
                );
              })
          );

          return (
            <CollapsibleSection
              key={i.toString()}
              style={style}
              text={groupFrame.label}>
              <GroupFrame
                info={groupFrame}
                style={{ borderColor: Theme.colors.general.transparent }}
                rightAccessoryType={groupFrame.rightAccessoryType}
                checked={groupFrame.checked}
                onPressRightAccessory={({ groupFrameId }) => {
                  // console.log('[groupFrameId] ', groupFrameId);

                  props.updateGroupFrame(groupFrameId, { checked: !groupFrame.checked });
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
            label={props.label}>
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
