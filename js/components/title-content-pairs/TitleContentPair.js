/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

export default class TitleContentPair extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  renderContentContainer = () => {
    const { props } = this;

    if (!props.content) {
      return;
    }

    return (
      <View style={[styles.contentContainer, props.contentContainerStyle]}>
        <Text style={[styles.content, props.contentStyle]}>
          {props.content}
        </Text>
      </View>
    );
  };

  renderChildrenContainer = () => {
    const { props } = this;

    if (!props.children) {
      return;
    }

    return <View>{props.children}</View>;
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <View onLayout={props.onLayout} style={[styles.container, props.style]}>
        <View style={[styles.titleContainer, props.titleContainerStyle]}>
          <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
        </View>
        {this.renderContentContainer()}
        {this.renderChildrenContainer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  titleContainer: {},
  title: {},
  contentContainer: {},
  content: {},
});

TitleContentPair.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  titleContainerStyle: ViewPropTypes.style,
  titleStyle: TextPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  contentStyle: TextPropTypes.style,
  hidden: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
};

TitleContentPair.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  titleContainerStyle: undefined,
  titleStyle: undefined,
  contentContainerStyle: undefined,
  contentStyle: undefined,
  hidden: false,
  title: undefined,
  content: undefined,
};
