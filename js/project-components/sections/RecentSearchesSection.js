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

import { Theme } from '../../utils';

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

                // console.log('[tag.tagId]', tag.tagId);

                return (
                  <Tag
                    key={t.toString()}
                    info={{
                      groupFrameId: groupFrame.groupFrameId,
                      tagId: tag.tagId,
                    }}
                    dotStyle={{ backgroundColor: tag.dotColor }}
                    disabled={!props.enableAddCriteriaTag}
                    text={tag.text}
                    leftAccessoryType={tag.leftAccessoryType}
                    rightAccessoryType={tag.rightAccessoryType}
                    onPress={({ groupFrameId, tagId }) => {
                      // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}`);

                      props.addCriteriaTag(tag);
                    }}
                  />
                );
              })
          );

          return (
            <GroupFrame
              key={i.toString()}
              info={{
                groupFrameId: groupFrame.groupFrameId,
              }}
              style={style}
              rightAccessoryType="delete"
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
            iconSource={ic_clock}
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
  enableAddCriteriaTag: PropTypes.bool,
};

RecentSearchesSection.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  label: undefined,
  enableAddCriteriaTag: false,
};

function mapStateToProps(state) {
  return {
    tags: state.recentSearchesSectionReducer.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(RecentSearchesSectionAction.reset(...args)),
    deleteGroupFrame: (...args) => dispatch(RecentSearchesSectionAction.deleteGroupFrame(...args)),
    deleteTags: (...args) => dispatch(RecentSearchesSectionAction.deleteTags(...args)),
    addCriteriaTag: (...args) => dispatch(CriteriaSectionAction.addTag(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentSearchesSection);
