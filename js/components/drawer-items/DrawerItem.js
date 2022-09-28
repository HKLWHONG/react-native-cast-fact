/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

import { SingleTouch } from '../touches';

export default class DrawerItem extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      highlightedContainerStyle: undefined,
    };
  }

  render() {
    const { props, state } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <View
        onLayout={props.onLayout}
        style={[
          styles.container,
          props.style,
          props.focused
            ? { backgroundColor: props.activeBackgroundColor }
            : undefined,
          state.highlightedContainerStyle,
        ]}>
        <SingleTouch
          type="TouchableWithoutFeedback"
          onPress={props.onPress}
          onPressIn={() => {
            this.setState({
              highlightedContainerStyle: {
                backgroundColor: props.highlightedBackgroundColor,
              },
            });
          }}
          onPressOut={() => {
            this.setState({
              highlightedContainerStyle: undefined,
            });
          }}>
          <View style={styles.button}>
            <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
          </View>
        </SingleTouch>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 4,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 19,
  },
});

DrawerItem.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  labelStyle: TextPropTypes.style,
  activeBackgroundColor: PropTypes.string,
  highlightedBackgroundColor: PropTypes.string,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  focused: PropTypes.bool,
  onPress: PropTypes.func,
};

DrawerItem.defaultProps = {
  onLayout: undefined,
  style: undefined,
  labelStyle: undefined,
  activeBackgroundColor: undefined,
  highlightedBackgroundColor: undefined,
  hidden: false,
  label: undefined,
  focused: false,
  onPress: undefined,
};
