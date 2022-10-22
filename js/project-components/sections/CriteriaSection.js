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
  store,
  CriteriaSectionAction,
  RecentSearchesSectionAction,
  FindTalentSectionAction,
} from '../../redux';

import { SingleTouch, TextInput } from '../../components';

import { Section, SearchBar, GroupFrame, Tag } from '../../project-components';

import { Theme, TagProcessor } from '../../utils';

import { SearchProvider } from '../../providers';

import { Translation } from 'react-i18next';

const ic_checklist = require('../../../assets/images/ic_checklist/ic_checklist.png');

class CriteriaSection extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  addRecentSearchesGroupFrame = (tags) => {
    const { props } = this;

    if (tags.length === 0) {
      return;
    }

    let data = tags[0].data.map((tag) => {
      tag = { ...tag };

      delete tag.rightAccessoryType;

      return tag;
    });

    props.addRecentSearchesGroupFrame({
      data: data,
    });
  };

  renderSearchBarIfNeeded = () => {
    const { props } = this;

    if (!props.enableSearchBar) {
      return;
    }

    return (
      <Translation>
        {(t) => (
          <SearchBar
            onPress={(text) => {
              console.log('[search-text] ', text)

              if (text && text.length > 0) {
                props.addTag({ text: text, isManual: true })
                  .then((state) => {
                    this.addRecentSearchesGroupFrame(state.criteriaSectionReducer.tags);
                  });
              } else {
                this.addRecentSearchesGroupFrame(props.tags);
              }

              if (!props.onPressSearchBar) {
                return;
              }

              props.onPressSearchBar(text);
            }}
            onChangeText={(text) => {
              if (text && text.length > 0) {
                let tags = [{ text: text, isManual: true }];

                store.getState().criteriaSectionReducer.tags.forEach((groupFrame) => {
                  let data = groupFrame.data || [];

                  tags = [...tags, ...data];
                });

                SearchProvider.search(
                  props,
                  {
                    tags: JSON.stringify(tags),
                    prefetch: true,
                  },
                  {},
                )
                  .catch((error) => {
                    console.error(error);
                  });
              } else {
                SearchProvider.search(props, { prefetch: true }, {})
                  .catch((error) => {
                    console.error(error);
                  });
              }
            }}
            enableLinearGradientBorder={props.enableSearchBarLinearGradientBorder}
          />
        )}
      </Translation>
    );
  };

  renderResultViewIfNeeded = () => {
    const { props } = this;

    if (!props.enableResultView) {
      return;
    }

    return (
      <Translation>
        {(t) => (
          <View
            style={{
              // backgroundColor: '#f00',
              alignItems: 'center',
              marginVertical: 8,
            }}>
            <Text
              style={{
                // backgroundColor: '#f00',
                color: Theme.colors.text.subtitle,
                fontSize: 13,
                fontFamily: Theme.fonts.light,
                letterSpacing: 1.7,
                textTransform: 'uppercase',
              }}>
              {t('views.search.result_format').replace('{0}', props.lengthOfResults)}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

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

          let tags = (
            Array(groupFrame.data.length)
              .fill()
              .map((_, t) => t)
              .map((t) => {
                let tag = groupFrame.data[t];

                return (
                  <Tag
                    key={t.toString()}
                    info={{
                      ...tag,
                      groupFrameId: groupFrame.groupFrameId,
                    }}
                    dotStyle={{ backgroundColor: tag.color }}
                    text={tag.text}
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
                    onPressRightAccessory={(info) => {
                      // console.log('[info] ', info);

                      let infoText = TagProcessor.toText(info);

                      props.recentSearchesTags.forEach((groupFrame) => {
                        let tags = groupFrame.data.filter((tag) => {
                          let text = TagProcessor.toText(tag);

                          return infoText.toLowerCase() === text.toLowerCase();
                        });

                        tags.forEach((tag) => {
                          props.updateRecentSearchesTag(groupFrame.groupFrameId, tag.tagId, { disabled: false });
                        });
                      });

                      props.findTalentTags.forEach((groupFrame) => {
                        let tags = groupFrame.data.filter((tag) => {
                          let text = TagProcessor.toString(tag);

                          return infoText.toLowerCase() === text.toLowerCase();
                        });

                        tags.forEach((tag) => {
                          props.updateFindTalentTag(groupFrame.groupFrameId, tag.tagId, { disabled: false });
                        });
                      });

                      props.deleteTag(info.groupFrameId, info.tagId);

                      if (props.enableResultView) {
                        SearchProvider.search(props, { prefetch: true }, {})
                          .catch((error) => {
                            console.error(error);
                          });
                      }

                      if (props.onChangeTags) {
                        props.onChangeTags();
                      }
                    }}
                    disabledWithoutFeedback
                  />
                );
              })
          );

          return (
            <GroupFrame
              key={i.toString()}
              info={groupFrame}
              style={{ borderColor: Theme.colors.general.transparent, marginTop: 8 }}>
              {tags}
            </GroupFrame>
          );
        })
    );

    return (
      <Translation>
        {(t) => (
          <Section
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            source={ic_checklist}
            label={props.label}>
            {this.renderSearchBarIfNeeded()}
            {children}
            {this.renderResultViewIfNeeded()}
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

CriteriaSection.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  enableSearchBar: PropTypes.bool,
  enableSearchBarLinearGradientBorder: PropTypes.bool,
  enableResultView: PropTypes.bool,
  onPressSearchBar: PropTypes.func,
  onChangeTags: PropTypes.func,
};

CriteriaSection.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  label: undefined,
  enableSearchBar: false,
  enableSearchBarLinearGradientBorder: false,
  enableResultView: false,
  onPressSearchBar: undefined,
  onChangeTags: undefined,
};

function mapStateToProps(state) {
  return {
    tags: state.criteriaSectionReducer.tags,
    lengthOfResults: state.criteriaSectionReducer.lengthOfResults,
    recentSearchesTags: state.recentSearchesSectionReducer.tags,
    findTalentTags: state.findTalentSectionReducer.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(CriteriaSectionAction.reset(...args)),
    addTag: (...args) => dispatch(CriteriaSectionAction.addTag(...args)),
    deleteTag: (...args) => dispatch(CriteriaSectionAction.deleteTag(...args)),
    addRecentSearchesGroupFrame: (...args) => dispatch(RecentSearchesSectionAction.addGroupFrame(...args)),
    updateRecentSearchesTag: (...args) => dispatch(RecentSearchesSectionAction.updateTag(...args)),
    updateFindTalentTag: (...args) => dispatch(FindTalentSectionAction.updateTag(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CriteriaSection);
