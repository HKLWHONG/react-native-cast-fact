/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

import { MessageBox, SingleTouch } from '../../components';

export default class YesNoMessageBox extends Component {
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

    let buttonContainerStyle = {};

    let buttonStyle = {};

    if (!props.buttonAlign || props.buttonAlign !== 'vertical') {
      buttonContainerStyle = {
        ...buttonContainerStyle,
        flexDirection: 'row',
      };

      buttonStyle = {
        ...buttonStyle,
        flex: 1,
      };
    }

    return (
      <MessageBox {...props}>
        <View style={[styles.buttonContainer, buttonContainerStyle]}>
          <SingleTouch
            style={[
              styles.button,
              buttonStyle,
              styles.yesButton,
              props.buttonStyle,
              props.yesButtonStyle,
            ]}
            onPress={() => {
              if (!props.onPressYes) {
                return;
              }

              props.onPressYes();
            }}
          >
            <Text
              style={[
                styles.buttonText,
                props.buttonTextStyle,
                props.yesButtonTextStyle,
              ]}
            >
              {props.yesText}
            </Text>
          </SingleTouch>
          <SingleTouch
            style={[
              styles.button,
              buttonStyle,
              styles.noButton,
              props.buttonStyle,
              props.noButtonStyle,
            ]}
            onPress={() => {
              if (!props.onPressNo) {
                return;
              }

              props.onPressNo();
            }}
          >
            <Text
              style={[
                styles.buttonText,
                props.buttonTextStyle,
                props.noButtonTextStyle,
              ]}
            >
              {props.noText}
            </Text>
          </SingleTouch>
        </View>
      </MessageBox>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    // backgroundColor: 'yellow',
  },
  button: {
    // backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    margin: 8,
  },
  yesButton: {
    // backgroundColor: 'green',
    backgroundColor: '#000000',
  },
  noButton: {
    // backgroundColor: 'red',
    backgroundColor: '#757575',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
});

YesNoMessageBox.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  titleStyle: TextPropTypes.style,
  contentStyle: TextPropTypes.style,
  buttonStyle: ViewPropTypes.style,
  yesButtonStyle: ViewPropTypes.style,
  noButtonStyle: ViewPropTypes.style,
  buttonTextStyle: TextPropTypes.style,
  yesButtonTextStyle: TextPropTypes.style,
  noButtonTextStyle: TextPropTypes.style,
  hidden: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  yesText: PropTypes.string,
  noText: PropTypes.string,
  titleAlign: PropTypes.string,
  contentAlign: PropTypes.string,
  buttonAlign: PropTypes.string,
  onPressYes: PropTypes.func,
  onPressNo: PropTypes.func,
};

YesNoMessageBox.defaultProps = {
  onLayout: undefined,
  style: undefined,
  titleStyle: undefined,
  contentStyle: undefined,
  buttonStyle: undefined,
  yesButtonStyle: undefined,
  noButtonStyle: undefined,
  buttonTextStyle: undefined,
  yesButtonTextStyle: undefined,
  noButtonTextStyle: undefined,
  hidden: false,
  title: undefined,
  content: undefined,
  yesText: 'OK',
  noText: 'CANCEL',
  titleAlign: undefined,
  contentAlign: undefined,
  buttonAlign: undefined,
  onPressYes: undefined,
  onPressNo: undefined,
};
