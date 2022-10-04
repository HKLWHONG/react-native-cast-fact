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
  CriteriaSectionAction,
} from '../../redux';

import { SingleTouch, TextInput } from '../../components';

import { Section, SearchBar, GroupFrame, Tag } from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const ic_checklist = require('../../../assets/images/ic_checklist/ic_checklist.png');

class CriteriaSection extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

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
                props.addTag({ text: text, isManual: true });
              }

              if (!props.onPressSearchBar) {
                return;
              }

              props.onPressSearchBar(text);
            }}
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
              {'More than 100 results.'}
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

    // console.log('[props.tags]', props.tags);

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

                // console.log('[tag.tagId]', tag.tagId);

                return (
                  <Tag
                    key={t.toString()}
                    info={{
                      groupFrameId: groupFrame.groupFrameId,
                      tagId: tag.tagId,
                    }}
                    dotStyle={{ backgroundColor: tag.dotColor }}
                    text={tag.text}
                    leftAccessoryType={tag.leftAccessoryType}
                    rightAccessoryType={tag.rightAccessoryType}
                    onPressRightAccessory={({ groupFrameId, tagId }) => {
                      // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}`);

                      props.deleteTag(groupFrameId, tagId);
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
            iconSource={ic_checklist}
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
  enableResultView: PropTypes.bool,
  onPressSearchBar: PropTypes.func,
};

CriteriaSection.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  label: undefined,
  enableSearchBar: false,
  enableResultView: false,
  onPressSearchBar: undefined,
};

function mapStateToProps(state) {
  return {
    tags: state.criteriaSectionReducer.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(CriteriaSectionAction.reset(...args)),
    addTag: (...args) => dispatch(CriteriaSectionAction.addTag(...args)),
    deleteTag: (...args) => dispatch(CriteriaSectionAction.deleteTag(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CriteriaSection);
