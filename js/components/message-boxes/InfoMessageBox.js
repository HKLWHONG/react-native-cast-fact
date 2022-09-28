/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

import MessageBox from './MessageBox';
import { SingleTouch } from '../touches';

export default class InfoMessageBox extends Component {
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

    let buttonStyle = {};

    if (props.buttonAlign && props.buttonAlign.toLowerCase() === 'left') {
      buttonStyle = {
        ...buttonStyle,
        alignSelf: 'flex-start',
      };
    } else if (
      props.buttonAlign &&
      props.buttonAlign.toLowerCase() === 'center'
    ) {
      buttonStyle = {
        ...buttonStyle,
        alignSelf: 'center',
      };
    } else if (
      props.buttonAlign &&
      props.buttonAlign.toLowerCase() === 'right'
    ) {
      buttonStyle = {
        ...buttonStyle,
        alignSelf: 'flex-end',
      };
    }

    return (
      <MessageBox {...props}>
        <SingleTouch
          style={[styles.button, buttonStyle, props.buttonStyle]}
          onPress={() => {
            if (!props.onPress) {
              return;
            }

            props.onPress();
          }}>
          <Text style={[styles.buttonText, props.buttonTextStyle]}>
            {props.buttonText}
          </Text>
        </SingleTouch>
      </MessageBox>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: 'blue',
    backgroundColor: '#000000',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    margin: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
});

InfoMessageBox.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  titleStyle: TextPropTypes.style,
  contentStyle: TextPropTypes.style,
  buttonStyle: ViewPropTypes.style,
  buttonTextStyle: TextPropTypes.style,
  hidden: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  buttonText: PropTypes.string,
  titleAlign: PropTypes.string,
  contentAlign: PropTypes.string,
  buttonAlign: PropTypes.string,
  onPress: PropTypes.func,
};

InfoMessageBox.defaultProps = {
  onLayout: undefined,
  style: undefined,
  titleStyle: undefined,
  contentStyle: undefined,
  buttonStyle: undefined,
  buttonTextStyle: undefined,
  hidden: false,
  title: undefined,
  content: undefined,
  buttonText: 'OK',
  titleAlign: undefined,
  contentAlign: undefined,
  buttonAlign: undefined,
  onPress: undefined,
};
