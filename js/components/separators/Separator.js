/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

export default class Separator extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderTextIfNeeded = () => {
    const { props } = this;

    if (!props.text || !props.text.length) {
      return
    }

    return (
        <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
    )
  }

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <View
        onLayout={props.onLayout}
        style={[styles.container, props.style]}
      >
        <View style={[styles.line, props.lineStyle]} />
        {this.renderTextIfNeeded()}
        <View style={[styles.line, props.lineStyle]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ff0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#000000',
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  text: {
    // backgroundColor: '#00f',
    color: '#000000',
    fontSize: 14,
    marginHorizontal: 16,
  },
});

Separator.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  lineStyle: ViewPropTypes.style,
  textStyle: TextPropTypes.style,
  hidden: PropTypes.bool,
  text: PropTypes.string,
};

Separator.defaultProps = {
  onLayout: undefined,
  style: undefined,
  lineStyle: undefined,
  textStyle: undefined,
  hidden: false,
  text: undefined,
};
