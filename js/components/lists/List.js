/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, SectionList } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view'

export default class List extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    let sections = props.sections;

    if (props.sections) {
      sections = [];

      for (let i = 0; i < props.sections.length; i += 1) {
        sections.push({
          ...props.sections[i],
          index: i,
        });
      }
    }

    return (
      <KeyboardAwareSectionList {...props}
        onLayout={props.onLayout}
        style={[styles.container, props.style]}
        contentContainerStyle={[
          styles.contentContainer,
          props.contentContainerStyle,
        ]}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        sections={sections}
        renderSectionHeader={({ section }) => {
          if (!props.renderSectionHeader) {
            return;
          }

          return props.renderSectionHeader(section);
        }}
        renderItem={(params) => {
          if (!props.renderItem) {
            return;
          }

          return props.renderItem(params);
        }}
        onEndReachedThreshold={0.5}
        onEndReached={props.onEndReached}
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
        bounces={props.bounces}
        stickySectionHeadersEnabled={props.stickySectionHeadersEnabled}
        horizontal={props.horizontal}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'green',
  },
  contentContainer: {
    // backgroundColor: 'red',
    paddingHorizontal: 16,
  },
});

List.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  sections: PropTypes.arrayOf(PropTypes.object),
  renderSectionHeader: PropTypes.func,
  renderItem: PropTypes.func,
  onEndReached: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  bounces: PropTypes.bool,
  stickySectionHeadersEnabled: PropTypes.bool,
  horizontal: PropTypes.bool,
};

List.defaultProps = {
  onLayout: undefined,
  style: undefined,
  contentContainerStyle: undefined,
  hidden: false,
  sections: undefined,
  renderSectionHeader: undefined,
  renderItem: undefined,
  onEndReached: undefined,
  onRefresh: undefined,
  refreshing: false,
  bounces: true,
  stickySectionHeadersEnabled: false,
  horizontal: false,
};
