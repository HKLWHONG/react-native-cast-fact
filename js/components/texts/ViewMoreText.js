/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

import { SingleTouch } from '../../components';

export default class ViewMoreText extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderViewMoreOrLessIfNeeded = () => {
    const { props, state } = this;

    if (!props.numberOfLines) {
      return;
    }

    let children = undefined;

    if (props.expanded) {
      if (props.renderViewLess) {
        children = props.renderViewLess();
      }
    } else {
      if (props.renderViewMore) {
        children = props.renderViewMore();
      }
    }

    if (!children) {
      return;
    }

    return (
      <SingleTouch onPress={props.onPress}>
        {children}
      </SingleTouch>
    );
  };

  render() {
    const { props, state } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <View
        onLayout={props.onLayout}
        style={[styles.container, props.style]}
      >
        <Text
          onTextLayout={props.onTextLayout}
          style={[styles.text, props.textStyle]}
          numberOfLines={props.expanded ? undefined : props.numberOfLines}
        >
          {props.children}
        </Text>
        {this.renderViewMoreOrLessIfNeeded()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ff0',
  },
  text: {
    // backgroundColor: '#00f',
    color: '#000000',
    fontSize: 24,
  },
});

ViewMoreText.propTypes = {
  onLayout: PropTypes.func,
  onTextLayout: PropTypes.func,
  children: PropTypes.string,
  style: ViewPropTypes.style,
  textStyle: TextPropTypes.style,
  hidden: PropTypes.bool,
  numberOfLines: PropTypes.number,
  expanded: PropTypes.bool,
  renderViewMore: PropTypes.func,
  renderViewLess: PropTypes.func,
  onPress: PropTypes.func,
};

ViewMoreText.defaultProps = {
  onLayout: undefined,
  onTextLayout: undefined,
  children: undefined,
  style: undefined,
  textStyle: undefined,
  hidden: false,
  numberOfLines: undefined,
  expanded: false,
  renderViewMore: undefined,
  renderViewLess: undefined,
  onPress: undefined,
};
