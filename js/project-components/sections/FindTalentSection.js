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
                      disabled={groupFrame.disabled || tag.disabled}
                      fromText={tag.fromText}
                      fromPlaceholder={tag.fromPlaceholder}
                      toText={tag.toText}
                      toPlaceholder={tag.toPlaceholder}
                      regex={tag.regex}
                      maxLength={
                        tag.maxLength
                        &&
                        AppRegex.INTEGER_VALIDATION_REGEX.test(tag.maxLength)
                          ? parseInt(tag.maxLength)
                          : undefined
                      }
                      keyboardType={tag.keyboardType}
                      onChangeFromText={({ groupFrameId, tagId, text }) => {
                        // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}, [text] ${text}`);

                        props.updateTag(groupFrameId, tagId, { fromText: text, fromPlaceholder: text });

                        if (!groupFrame.checked) {
                          return;
                        }

                        SearchProvider.search(props, { prefetch: true }, {})
                          .catch((error) => {
                            console.error(error);
                          });
                      }}
                      onFocusFrom={(info) => {
                        // console.log('[onFocusFrom-info.fromText]', info.fromText);
                        // console.log('[onFocusFrom-info.fromPlaceholder]', info.fromPlaceholder);

                        props.updateTag(info.groupFrameId, info.tagId, { fromText: '', fromPlaceholder: info.fromText });
                      }}
                      onBlurFrom={(info) => {
                        // console.log('[onBlurFrom-info.fromText]', info.fromText);
                        // console.log('[onBlurFrom-info.fromPlaceholder]', info.fromPlaceholder);

                        if (
                          info.fromText && info.fromText.length > 0
                          &&
                          info.toText && info.toText.length > 0
                        ) {
                          let fromTextValue = AppRegex.FLOAT_VALIDATION_REGEX.test(info.fromText)
                                                  ? parseFloat(info.fromText)
                                                  : 0;

                          let toTextValue = AppRegex.FLOAT_VALIDATION_REGEX.test(info.toText)
                                                  ? parseFloat(info.toText)
                                                  : 0;

                          if (fromTextValue > toTextValue) {
                            let defaultText = info.defaultText || '0';

                            props.updateTag(info.groupFrameId, info.tagId, { fromText: defaultText, fromPlaceholder: defaultText });

                            return;
                          }
                        }

                        props.updateTag(info.groupFrameId, info.tagId, { fromText: info.fromPlaceholder, fromPlaceholder: '' });
                      }}
                      onChangeToText={({ groupFrameId, tagId, text }) => {
                        // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}, [text] ${text}`);

                        props.updateTag(groupFrameId, tagId, { toText: text, toPlaceholder: text });

                        if (!groupFrame.checked) {
                          return;
                        }

                        SearchProvider.search(props, { prefetch: true }, {})
                          .catch((error) => {
                            console.error(error);
                          });
                      }}
                      onFocusTo={(info) => {
                        // console.log('[onFocusTo-info.toText]', info.toText);
                        // console.log('[onFocusTo-info.toPlaceholder]', info.toPlaceholder);

                        props.updateTag(info.groupFrameId, info.tagId, { toText: '', toPlaceholder: info.toText });
                      }}
                      onBlurTo={(info) => {
                        // console.log('[onBlurTo-info.toText]', info.toText);
                        // console.log('[onBlurTo-info.toPlaceholder]', info.toPlaceholder);

                        if (
                          info.fromText && info.fromText.length > 0
                          &&
                          info.toText && info.toText.length > 0
                        ) {
                          let fromTextValue = AppRegex.FLOAT_VALIDATION_REGEX.test(info.fromText)
                                                  ? parseFloat(info.fromText)
                                                  : 0;

                          let toTextValue = AppRegex.FLOAT_VALIDATION_REGEX.test(info.toText)
                                                  ? parseFloat(info.toText)
                                                  : 0;

                          if (fromTextValue > toTextValue) {
                            let defaultText = info.defaultText || '0';

                            props.updateTag(info.groupFrameId, info.tagId, { toText: defaultText, toPlaceholder: defaultText });

                            return;
                          }
                        }

                        props.updateTag(info.groupFrameId, info.tagId, { toText: info.toPlaceholder, toPlaceholder: '' });
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
                    disabled={groupFrame.disabled || tag.disabled}
                    type={tag.type}
                    text={tag.text}
                    placeholder={tag.placeholder}
                    unit={tag.unit}
                    regex={tag.regex}
                    maxLength={
                      tag.maxLength
                      &&
                      AppRegex.INTEGER_VALIDATION_REGEX.test(tag.maxLength)
                        ? parseInt(tag.maxLength)
                        : undefined
                    }
                    keyboardType={tag.keyboardType}
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

                        TagProcessor.reload();
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

                      props.addCriteriaTag({
                        ...tag,
                        text: TagProcessor.toString(tag),
                      });

                      TagProcessor.reload();

                      SearchProvider.search(props, { prefetch: true }, {})
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                    onChangeText={({ groupFrameId, tagId, text }) => {
                      // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}`);

                      props.updateTag(groupFrameId, tagId, { text: text, placeholder: text });

                      TagProcessor.reload();

                      if (!groupFrame.checked) {
                        return;
                      }

                      SearchProvider.search(props, { prefetch: true }, {})
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                    onFocus={(info) => {
                      // console.log('[onFocus-info.text]', info.text);
                      // console.log('[onFocus-info.placeholder]', info.placeholder);

                      props.updateTag(info.groupFrameId, info.tagId, { text: '', placeholder: info.text });
                    }}
                    onBlur={(info) => {
                      // console.log('[onBlur-info.text]', info.text);
                      // console.log('[onBlur-info.placeholder]', info.placeholder);

                      props.updateTag(info.groupFrameId, info.tagId, { text: info.placeholder, placeholder: '' });
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
                disabled={groupFrame.disabled}
                rightAccessoryDisabled={groupFrame.rightAccessoryDisabled}
                rightAccessoryType={groupFrame.rightAccessoryType}
                checked={groupFrame.checked}
                onPressRightAccessory={({ groupFrameId }) => {
                  props.updateGroupFrame(groupFrameId, { checked: !groupFrame.checked });

                  SearchProcessor.reload();

                  TagProcessor.reload();

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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FindTalentSection);
