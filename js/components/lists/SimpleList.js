/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

export default class SimpleList extends Component {
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

    return (
      <FlatList {...props}
        onLayout={props.onLayout}
        style={[styles.container, props.style]}
        contentContainerStyle={[
          styles.contentContainer,
          props.contentContainerStyle,
        ]}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        data={props.data}
        ListEmptyComponent={props.ListEmptyComponent}
        ListHeaderComponent={props.ListHeaderComponent}
        ListFooterComponent={props.ListFooterComponent}
        renderItem={(params) => {
          if (!props.renderItem) {
            return;
          }

          return props.renderItem(params);
        }}
        ItemSeparatorComponent={props.ItemSeparatorComponent}
        onEndReachedThreshold={0.5}
        onEndReached={props.onEndReached}
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
  data: PropTypes.arrayOf(PropTypes.object),
  ListEmptyComponent: PropTypes.func,
  ListHeaderComponent: PropTypes.func,
  ListFooterComponent: PropTypes.func,
  renderItem: PropTypes.func,
  ItemSeparatorComponent: PropTypes.func,
  onEndReached: PropTypes.func,
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
  data: undefined,
  ListEmptyComponent: undefined,
  ListHeaderComponent: undefined,
  ListFooterComponent: undefined,
  renderItem: undefined,
  ItemSeparatorComponent: undefined,
  onEndReached: undefined,
  onRefresh: undefined,
  refreshing: false,
  bounces: true,
  horizontal: false,
};
