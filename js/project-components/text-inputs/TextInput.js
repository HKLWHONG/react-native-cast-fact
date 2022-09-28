/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { TextInput as CommonTextInput } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

class TextInput extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      isFocused: false,
    };
  }

  render() {
    const { props, state } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <Translation>
        {(t) => (
          <CommonTextInput
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            textInputContainterStyle={styles.textInputContainter}
            labelStyle={[
              styles.label,
              state.isFocused
                ? styles.focusedColor
                : undefined,
            ]}
            textInputStyle={styles.textInput}
            bottomLineStyle={
              state.isFocused
                ? styles.focusedBottomLine
                : styles.bottomLine
            }
            messageStyle={styles.message}
            label={props.label}
            value={props.value}
            message={props.message}
            secureTextEntry={props.secureTextEntry}
            disableBottomLine={false}
            onChangeText={props.onChangeText}
            onFocus={() => {
              this.setState({
                isFocused: true,
              });
            }}
            onBlur={() => {
              this.setState({
                isFocused: false,
              });
            }}
          />
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
  },
  textInputContainter: {
    // backgroundColor: '#ff0',
  },
  label: {
    // backgroundColor: '#0f0',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  focusedColor: {
    color: Theme.colors.text.subtitle,
  },
  textInput: {
    // backgroundColor: '#0ff',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    marginVertical: 8,
  },
  bottomLine: {
    backgroundColor: Theme.colors.decorations.splitline,
    height: 1,
  },
  focusedBottomLine: {
    backgroundColor: Theme.colors.decorations.splitline,
  },
  message: {
    // backgroundColor: '#ff0',
    color: '#FF0000',
    fontSize: 14,
  },
});

TextInput.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  message: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  onChangeText: PropTypes.func,
};

TextInput.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  label: undefined,
  value: undefined,
  message: undefined,
  secureTextEntry: false,
  onChangeText: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
