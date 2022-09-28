/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TextInput as RNTextInput,
} from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

export default class TextInput extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      isFocused: false,
    };
  }

  renderLabelView = () => {
    const { props } = this;

    if (!props.label) {
      return;
    }

    return (
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    );
  };

  renderBottomLineIfNeeded = () => {
    const { props, state } = this;

    if (props.disableBottomLine) {
      return;
    }

    return (
      <View
        style={[styles.bottomLineContainer, props.bottomLineContainerStyle]}>
        <View
          style={[
            styles.bottomLine,
            state.isFocused ? styles.bottomLineDidFocus : undefined,
            props.bottomLineStyle,
          ]}
        />
      </View>
    );
  };

  renderMessageViewIfNeeded = () => {
    const { props } = this;

    if (props.disableMessageView) {
      return;
    }

    return (
      <Text style={[styles.message, props.messageStyle]}>
        {props.message || ' '}
      </Text>
    );
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <View onLayout={props.onLayout} style={[styles.container, props.style]}>
        <View style={[styles.textInputContainter, props.textInputContainterStyle]}>
          {this.renderLabelView()}
          <RNTextInput
            style={[styles.textInput, props.textInputStyle]}
            value={props.value}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            secureTextEntry={props.secureTextEntry}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            onChangeText={props.onChangeText}
            onFocus={() => {
              this.setState(
                {
                  isFocused: true,
                },
                () => {
                  if (props.onFocus) {
                    props.onFocus();
                  }
                },
              );
            }}
            onBlur={() => {
              this.setState(
                {
                  isFocused: false,
                },
                () => {
                  if (props.onBlur) {
                    props.onBlur();
                  }
                },
              );
            }}
          />
          {this.renderBottomLineIfNeeded()}
        </View>
        {this.renderMessageViewIfNeeded()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0ff',
  },
  textInputContainter: {
    // backgroundColor: '#ff0',
  },
  label: {
    fontSize: 14,
  },
  textInput: {
    fontSize: 14,
  },
  bottomLineContainer: {
    height: 2,
    justifyContent: 'center',
  },
  bottomLine: {
    backgroundColor: '#DDDDDD',
    height: StyleSheet.hairlineWidth,
  },
  bottomLineDidFocus: {
    backgroundColor: '#000000',
    height: 2,
  },
  message: {
    // backgroundColor: '#0f0',
    color: '#FF0000',
    fontSize: 14,
    paddingVertical: 8,
  },
});

TextInput.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  labelStyle: TextPropTypes.style,
  textInputStyle: TextPropTypes.style,
  bottomLineContainerStyle: ViewPropTypes.style,
  bottomLineStyle: ViewPropTypes.style,
  messageStyle: TextPropTypes.style,
  placeholderTextColor: PropTypes.string,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  message: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  disableBottomLine: PropTypes.bool,
  disableMessageView: PropTypes.bool,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

TextInput.defaultProps = {
  onLayout: undefined,
  style: undefined,
  labelStyle: undefined,
  textInputStyle: undefined,
  bottomLineContainerStyle: undefined,
  bottomLineStyle: undefined,
  messageStyle: undefined,
  placeholderTextColor: undefined,
  hidden: false,
  label: undefined,
  value: undefined,
  placeholder: undefined,
  message: undefined,
  secureTextEntry: false,
  disableBottomLine: true,
  disableMessageView: false,
  multiline: false,
  numberOfLines: 1,
  onChangeText: undefined,
  onFocus: undefined,
  onBlur: undefined,
};
