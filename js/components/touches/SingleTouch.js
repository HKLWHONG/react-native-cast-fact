/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { ViewPropTypes, ColorPropType } from 'deprecated-react-native-prop-types';

export default class SingleTouch extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      isComponentDidMount: false,
      disabled: false,
      timeout: undefined,
    };
  }

  componentDidMount() {
    this.state.isComponentDidMount = true;
  }

  componentWillUnmount() {
    this.state.isComponentDidMount = false;

    const { state } = this;

    clearTimeout(state.timeout);

    if (state.disabled) {
      this.setState(
        {
          disabled: false,
        },
        () => this.onTimeoutCallBack(),
      );
    }
  }

  onPressCallBack = (event) => {
    const { props } = this;

    this.setState(
      {
        disabled: true,
      },
      () => {
        const { state } = this;

        if (props.onTimeout) {
          props.onTimeout(state.disabled);
        }

        if (props.onPress) {
          props.onPress(event);
        }

        clearTimeout(state.timeout);

        state.timeout = setTimeout(() => {
          if (!this.state.isComponentDidMount) {
            return;
          }

          this.setState(
            {
              disabled: false,
            },
            this.onTimeoutCallBack,
          );
        }, props.duration);
      },
    );
  };

  onPressInCallBack = (event) => {
    const { props } = this;

    if (props.onPressIn) {
      props.onPressIn(event);
    }
  };

  onPressOutCallBack = (event) => {
    const { props } = this;

    if (props.onPressOut) {
      props.onPressOut(event);
    }
  };

  onTimeoutCallBack = () => {
    const { props, state } = this;

    if (props.onTimeout) {
      props.onTimeout(state.disabled);
    }
  };

  render() {
    const { props, state } = this;

    if (props.hidden) {
      return null;
    }

    let enableSafeAreaStyle = {};

    if (props.enableSafeArea) {
      enableSafeAreaStyle = {
        ...enableSafeAreaStyle,
        // backgroundColor: '#0ff',
        padding: 8,
      };
    }

    if (
      props.type
      &&
      props.type.toLowerCase() === 'TouchableHighlight'.toLowerCase()
    ) {
      return (
        <TouchableHighlight
          onLayout={props.onLayout}
          style={[styles.container, enableSafeAreaStyle, props.style]}
          disabled={props.disabled || state.disabled}
          onPress={this.onPressCallBack}
          onPressIn={this.onPressInCallBack}
          onPressOut={this.onPressOutCallBack}
          onShowUnderlay={props.onShowUnderlay}
          onHideUnderlay={props.onHideUnderlay}
          activeOpacity={props.activeOpacity}
          underlayColor={props.underlayColor}
          hasTVPreferredFocus={props.hasTVPreferredFocus}
          tvParallaxProperties={props.tvParallaxProperties}
        >
          {props.children}
        </TouchableHighlight>
      );
    }

    if (
      props.type
      &&
      props.type.toLowerCase() === 'TouchableWithoutFeedback'.toLowerCase()
    ) {
      return (
        <TouchableWithoutFeedback
          onLayout={props.onLayout}
          style={[styles.container, enableSafeAreaStyle, props.style]}
          disabled={props.disabled || state.disabled}
          onPress={this.onPressCallBack}
          onPressIn={this.onPressInCallBack}
          onPressOut={this.onPressOutCallBack}
        >
          {props.children}
        </TouchableWithoutFeedback>
      );
    }

    return (
      <TouchableOpacity
        onLayout={props.onLayout}
        style={[styles.container, enableSafeAreaStyle, props.style]}
        disabled={props.disabled || state.disabled}
        onPress={this.onPressCallBack}
        onPressIn={this.onPressInCallBack}
        onPressOut={this.onPressOutCallBack}
        activeOpacity={props.activeOpacity}
      >
        {props.children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
  },
});

SingleTouch.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  type: PropTypes.string,
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  disabled: PropTypes.bool,
  duration: PropTypes.number,
  onTimeout: PropTypes.func,
  activeOpacity: PropTypes.number,
  underlayColor: ColorPropType,
  onShowUnderlay: PropTypes.func,
  onHideUnderlay: PropTypes.func,
  hasTVPreferredFocus: PropTypes.bool,
  tvParallaxProperties: PropTypes.objectOf(PropTypes.object),
  enableSafeArea: PropTypes.bool,
};

SingleTouch.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  hidden: false,
  type: undefined,
  onPress: undefined,
  onPressIn: undefined,
  onPressOut: undefined,
  disabled: false,
  duration: 500,
  onTimeout: undefined,
  activeOpacity: 0.7,
  underlayColor: undefined,
  onShowUnderlay: undefined,
  onHideUnderlay: undefined,
  hasTVPreferredFocus: undefined,
  tvParallaxProperties: undefined,
  enableSafeArea: undefined,
};
