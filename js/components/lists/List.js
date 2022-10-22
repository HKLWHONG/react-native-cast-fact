/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, RefreshControl } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view'

export default class List extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  keyExtractor = (item, index) => {
    return index.toString();
  };

  renderSectionHeader = ({ section }) => {
    const { props } = this;
    
    if (!props.renderSectionHeader) {
      return;
    }

    return props.renderSectionHeader(section);
  };

  renderItem = (params) => {
    const { props } = this;

    if (!props.renderItem) {
      return;
    }

    return props.renderItem(params);
  };

  refreshControl = () => {
    const { props } = this;

    if (props.refreshControl) {
      return props.refreshControl;
    }

    if (
      !props.androidRefreshControlColor
      ||
      !props.iosRefreshControlColor
    ) {
      return;
    }

    return (
      <RefreshControl
        colors={[props.androidRefreshControlColor]}
        tintColor={props.iosRefreshControlColor}
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
      />
    );
  };

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
        keyExtractor={this.keyExtractor}
        sections={sections}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={props.onEndReached}
        refreshControl={this.refreshControl()}
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
  androidRefreshControlColor: PropTypes.string,
  iosRefreshControlColor: PropTypes.string,
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
  androidRefreshControlColor: undefined,
  iosRefreshControlColor: undefined,
  onRefresh: undefined,
  refreshing: false,
  bounces: true,
  stickySectionHeadersEnabled: false,
  horizontal: false,
};
