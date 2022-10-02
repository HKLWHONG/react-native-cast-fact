/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

export default class Body extends Component {
  constructor(props: any) {
    super(props);
  }

  renderContainer = (children, style) => {
    const { props } = this;

    return (
      <ImageBackground
        onLayout={props.onLayout}
        style={[styles.background, props.backgroundContainerStyle]}
        source={props.source}
        resizeMode={props.resizeMode}>
        {this.renderScrollViewIfNeededForContainer(children, style)}
      </ImageBackground>
    );
  };

  renderScrollViewIfNeededForContainer = (children, style) => {
    const { props } = this;

    if (props.scrollable) {
      return (
        <View style={styles.container}>
          <ScrollView
            style={[styles.scrollView, style]}
            contentContainerStyle={[
              styles.contentContainerStyle,
              props.contentContainerStyle,
            ]}
            bounces={props.bounces}>
            <TouchableWithoutFeedback>
              <View style={[styles.scrollViewContentContainer, props.style]}>
                {props.children}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      );
    }

    return <View style={[styles.container, props.style]}>{children}</View>;
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    let style = {};

    if (props.type && props.type.toLowerCase() === 'list') {
      if (props.bounces) {
        style = {
          ...style,
          backgroundColor: '#FFFFFF',
        };
      }
    }

    return this.renderContainer(props.children, style);
  }
}

const styles = StyleSheet.create({
  background: {
    // backgroundColor: '#00f',
    flex: 1,
  },
  container: {
    // backgroundColor: '#0ff',
    flex: 1,
  },
  scrollView: {
    // backgroundColor: '#f00',
  },
  contentContainerStyle: {
    // backgroundColor: '#0f0',
    flexGrow: 1,
  },
  scrollViewContentContainer: {
    // backgroundColor: '#0ff',
    flex: 1,
  },
});

Body.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  backgroundContainerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  resizeMode: PropTypes.string,
  scrollable: PropTypes.bool,
  type: PropTypes.string,
  bounces: PropTypes.bool,
  handling: PropTypes.string,
};

Body.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  backgroundContainerStyle: undefined,
  contentContainerStyle: undefined,
  hidden: false,
  source: undefined,
  resizeMode: undefined,
  scrollable: true,
  type: undefined,
  bounces: false,
};
