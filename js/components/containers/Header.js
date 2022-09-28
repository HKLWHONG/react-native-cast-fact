/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ImageBackground, View } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

export default class Header extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <ImageBackground
        onLayout={props.onLayout}
        style={[styles.background, props.backgroundContainerStyle]}
        source={props.source}
        resizeMode={props.resizeMode}>
        <View style={[styles.container, props.style]}>{props.children}</View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    // backgroundColor: '#f0f',
  },
  container: {
    // backgroundColor: '#f00',
  },
});

Header.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  backgroundContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  resizeMode: PropTypes.string,
};

Header.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  backgroundContainerStyle: undefined,
  hidden: false,
  source: undefined,
  resizeMode: undefined,
};
