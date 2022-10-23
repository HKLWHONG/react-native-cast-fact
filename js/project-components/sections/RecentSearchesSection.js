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
  RecentSearchesSectionAction,
  CriteriaSectionAction,
  FindTalentSectionAction,
} from '../../redux';

import {
  SingleTouch,
  TextInput,
} from '../../components';

import {
  Section,
  GroupFrame,
  Tag,
} from '../../project-components';

import { Theme, TagProcessor } from '../../utils';

import { SearchProvider } from '../../providers';

import { Translation } from 'react-i18next';

const ic_clock = require('../../../assets/images/ic_clock/ic_clock.png');

class RecentSearchesSection extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    // console.log('[props.tags]', props.tags);

    let children = (
      Array(props.tags.length)
        .fill()
        .map((_, i) => i)
        .map((i) => {
          let groupFrame = props.tags[i];

          let style = {};

          if (i > 0) {
            style = {
              ...style,
              marginTop: 8,
            };
          }

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
                    disabled={tag.disabled}
                    text={tag.text}
                    leftAccessoryType={tag.leftAccessoryType}
                    rightAccessoryType={tag.rightAccessoryType}
                    onPress={(info) => {
                      // console.log('[info] ', info);

                      if (props.onPressTag) {
                        props.onPressTag(info);
                      }

                      let infoText = TagProcessor.toText(info);

                      props.tags.forEach((groupFrame) => {
                        let tags = groupFrame.data.filter((tag) => {
                          let text = TagProcessor.toText(tag);

                          return infoText.toLowerCase() === text.toLowerCase();
                        });

                        tags.forEach((tag) => {
                          props.updateTag(groupFrame.groupFrameId, tag.tagId, { disabled: true });
                        });
                      });

                      props.findTalentTags.forEach((groupFrame) => {
                        let tags = groupFrame.data.filter((tag) => {
                          let text = TagProcessor.toString(tag);

                          return infoText.toLowerCase() === text.toLowerCase();
                        });

                        tags.forEach((tag) => {
                          props.updateFindTalentTag(groupFrame.groupFrameId, tag.tagId, { disabled: true });
                        });
                      });

                      props.addCriteriaTag({
                        ...tag,
                        text: TagProcessor.toText(tag),
                      });

                      SearchProvider.search(props, {}, {})
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                  />
                );
              })
          );

          return (
            <GroupFrame
              key={i.toString()}
              info={groupFrame}
              style={style}
              rightAccessoryType="delete"
              onPress={props.onPressGroupFrame}
              onPressRightAccessory={({ groupFrameId }) => {
                // console.log('[groupFrameId] ', groupFrameId);

                props.deleteGroupFrame(groupFrameId);
              }}>
              {tags}
            </GroupFrame>
          );
        })
    );

    let rightAccessoryType = undefined;

    if (props.tags.length > 0) {
      rightAccessoryType = 'delete';
    }

    return (
      <Translation>
        {(t) => (
          <Section
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            source={ic_clock}
            label={props.label}
            rightAccessoryType={rightAccessoryType}
            onPress={() => {
              props.deleteTags();
            }}>
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

RecentSearchesSection.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  onPressGroupFrame: PropTypes.func,
  onPressTag: PropTypes.func,
};

RecentSearchesSection.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  label: undefined,
  onPressGroupFrame: undefined,
  onPressTag: undefined,
};

function mapStateToProps(state) {
  return {
    tags: state.recentSearchesSectionReducer.tags,
    findTalentTags: state.findTalentSectionReducer.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(RecentSearchesSectionAction.reset(...args)),
    updateTag: (...args) => dispatch(RecentSearchesSectionAction.updateTag(...args)),
    deleteGroupFrame: (...args) => dispatch(RecentSearchesSectionAction.deleteGroupFrame(...args)),
    deleteTags: (...args) => dispatch(RecentSearchesSectionAction.deleteTags(...args)),
    addCriteriaTag: (...args) => dispatch(CriteriaSectionAction.addTag(...args)),
    updateFindTalentTag: (...args) => dispatch(FindTalentSectionAction.updateTag(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentSearchesSection);
