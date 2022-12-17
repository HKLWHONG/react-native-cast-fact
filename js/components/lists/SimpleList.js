/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, RefreshControl, TouchableWithoutFeedback } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

export default class SimpleList extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  keyExtractor = (item, index) => {
    return index.toString();
  };

  renderItem = (params) => {
    const { props } = this;

    if (!props.renderItem) {
      return;
    }

    return (
      <TouchableWithoutFeedback>
        <View>
          {props.renderItem(params)}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  refreshControl = () => {
      const { props } = this;

      if (props.refreshControl) {
        return props.refreshControl;
      }

      if (!props.refreshControlColor) {
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

    return (
      <KeyboardAwareFlatList
        {...props}
        onLayout={props.onLayout}
        style={[styles.container, props.style]}
        contentContainerStyle={[
          styles.contentContainer,
          props.contentContainerStyle,
        ]}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={props.onEndReached}
        refreshControl={this.refreshControl()}
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
        bounces={props.bounces}
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

SimpleList.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  renderItem: PropTypes.func,
  onEndReached: PropTypes.func,
  androidRefreshControlColor: PropTypes.string,
  iosRefreshControlColor: PropTypes.string,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  bounces: PropTypes.bool,
  horizontal: PropTypes.bool,
};

SimpleList.defaultProps = {
  onLayout: undefined,
  style: undefined,
  contentContainerStyle: undefined,
  hidden: false,
  renderItem: undefined,
  onEndReached: undefined,
  androidRefreshControlColor: undefined,
  iosRefreshControlColor: undefined,
  onRefresh: undefined,
  refreshing: false,
  bounces: true,
  horizontal: false,
};
