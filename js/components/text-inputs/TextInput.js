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
      isFocusedLeft: false,
      isFocusedRight: false,
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

  renderLeftTextInput = () => {
    const { props } = this;

    if (!props.enableLeftInput) {
      return;
    }

    return (
      <RNTextInput
        style={[
          styles.textInput,
          styles.textInputLeft,
          props.textInputStyle,
          props.textInputLeftStyle
        ]}
        value={props.valueLeft}
        placeholder={props.placeholderLeft}
        placeholderTextColor={props.placeholderTextColorLeft}
        keyboardType={props.keyboardTypeLeft}
        secureTextEntry={props.secureTextEntryLeft}
        multiline={props.multilineLeft}
        numberOfLines={props.numberOfLinesLeft}
        onChangeText={props.onChangeTextLeft}
        onFocus={() => {
          this.setState(
            {
              isFocusedLeft: true,
            },
            () => {
              if (props.onFocusLeft) {
                props.onFocusLeft();
              }
            },
          );
        }}
        onBlur={() => {
          this.setState(
            {
              isFocusedLeft: false,
            },
            () => {
              if (props.onBlurLeft) {
                props.onBlurLeft();
              }
            },
          );
        }}
      />
    );
  };

  renderCenterTextInput = () => {
    const { props } = this;

    let style = {};

    if (props.enableLeftInput || props.enableRightInput) {
      style = {
        ...style,
        flex: 6,
      };
    }

    return (
      <RNTextInput
        {...props}
        style={[styles.textInput, style, props.textInputStyle]}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
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
    );
  };

  renderRightTextInput = () => {
    const { props } = this;

    if (!props.enableRightInput) {
      return;
    }

    return (
      <RNTextInput
        style={[
          styles.textInput,
          styles.textInputRight,
          props.textInputStyle,
          props.textInputRightStyle,
        ]}
        value={props.valueRight}
        placeholder={props.placeholderRight}
        placeholderTextColor={props.placeholderTextColorRight}
        keyboardType={props.keyboardTypeRight}
        secureTextEntry={props.secureTextEntrRight}
        multiline={props.multilineRight}
        numberOfLines={props.numberOfLinesRight}
        onChangeText={props.onChangeTextRight}
        onFocus={() => {
          this.setState(
            {
              isFocusedRight: true,
            },
            () => {
              if (props.onFocusRight) {
                props.onFocusRight();
              }
            },
          );
        }}
        onBlur={() => {
          this.setState(
            {
              isFocusedRight: false,
            },
            () => {
              if (props.onBlurRight) {
                props.onBlurRight();
              }
            },
          );
        }}
      />
    );
  };

  renderTextInput = () => {
    const { props } = this;

    if (props.enableLeftInput || props.enableRightInput) {
      return (
        <View style={{ flexDirection: 'row' }}>
          {this.renderLeftTextInput()}
          {this.renderCenterTextInput()}
          {this.renderRightTextInput()}
        </View>
      );
    }

    return  this.renderCenterTextInput();
  };

  renderBottomLineIfNeeded = () => {
    const { props, state } = this;

    if (props.disableBottomLine) {
      return;
    }

    return (
      <View
        style={[styles.bottomLineContainer, props.bottomLineContainerStyle]}
      >
        <View
          style={[
            styles.bottomLine,
            state.isFocused
            ||
            state.isFocusedLeft
            ||
            state.isFocusedRight
            ?
            styles.bottomLineDidFocus
            :
            undefined,
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

    if (!props.enableFixedMessageViewHeight && !props.message) {
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
      <View
        onLayout={props.onLayout}
        style={[styles.container, props.style]}
      >
        <View style={[styles.textInputContainter, props.textInputContainterStyle]}>
          {this.renderLabelView()}
          {this.renderTextInput()}
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
    // backgroundColor: '#f00',
    fontSize: 14,
  },
  textInputLeft: {
    // backgroundColor: '#f0f',
    flex: 1,
    marginRight: 8,
  },
  textInputRight: {
    // backgroundColor: '#0ff',
    flex: 1,
    marginLeft: 8,
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
    paddingTop: 8,
  },
});

TextInput.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  labelStyle: TextPropTypes.style,
  textInputStyle: TextPropTypes.style,
  textInputLeftStyle: TextPropTypes.style,
  textInputRightStyle: TextPropTypes.style,
  bottomLineContainerStyle: ViewPropTypes.style,
  bottomLineStyle: ViewPropTypes.style,
  messageStyle: TextPropTypes.style,
  placeholderTextColor: PropTypes.string,
  placeholderTextColorLeft: PropTypes.string,
  placeholderTextColorRight: PropTypes.string,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  valueLeft: PropTypes.string,
  valueRight: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderLeft: PropTypes.string,
  placeholderRight: PropTypes.string,
  keyboardType: PropTypes.string,
  keyboardTypeLeft: PropTypes.string,
  keyboardTypeRight: PropTypes.string,
  message: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  secureTextEntryLeft: PropTypes.bool,
  secureTextEntryRight: PropTypes.bool,
  disableBottomLine: PropTypes.bool,
  disableMessageView: PropTypes.bool,
  enableLeftInput: PropTypes.bool,
  enableRightInput: PropTypes.bool,
  enableFixedMessageViewHeight: PropTypes.bool,
  multiline: PropTypes.bool,
  multilineLeft: PropTypes.bool,
  multilineRight: PropTypes.bool,
  numberOfLines: PropTypes.number,
  numberOfLinesLeft: PropTypes.number,
  numberOfLinesRight: PropTypes.number,
  onChangeText: PropTypes.func,
  onChangeTextLeft: PropTypes.func,
  onChangeTextRight: PropTypes.func,
  onFocus: PropTypes.func,
  onFocusLeft: PropTypes.func,
  onFocusRight: PropTypes.func,
  onBlur: PropTypes.func,
  onBlurLeft: PropTypes.func,
  onBlurRight: PropTypes.func,
};

TextInput.defaultProps = {
  onLayout: undefined,
  style: undefined,
  labelStyle: undefined,
  textInputStyle: undefined,
  textInputLeftStyle: undefined,
  textInputRightStyle: undefined,
  bottomLineContainerStyle: undefined,
  bottomLineStyle: undefined,
  messageStyle: undefined,
  placeholderTextColor: undefined,
  placeholderTextColorLeft: undefined,
  placeholderTextColorRight: undefined,
  hidden: false,
  label: undefined,
  value: undefined,
  valueLeft: undefined,
  valueRight: undefined,
  placeholder: undefined,
  placeholderLeft: undefined,
  placeholderRight: undefined,
  keyboardType: undefined,
  keyboardTypeLeft: undefined,
  keyboardTypeRight: undefined,
  message: undefined,
  secureTextEntry: false,
  secureTextEntryLeft: false,
  secureTextEntryRight: false,
  disableBottomLine: true,
  disableMessageView: false,
  enableLeftInput: false,
  enableRightInput: false,
  enableFixedMessageViewHeight: false,
  multiline: false,
  multilineLeft: false,
  multilineRight: false,
  numberOfLines: 1,
  numberOfLinesLeft: 1,
  numberOfLinesRight: 1,
  onChangeText: undefined,
  onChangeTextLeft: undefined,
  onChangeTextRight: undefined,
  onFocus: undefined,
  onFocusLeft: undefined,
  onFocusRight: undefined,
  onBlur: undefined,
  onBlurLeft: undefined,
  onBlurRight: undefined,
};
