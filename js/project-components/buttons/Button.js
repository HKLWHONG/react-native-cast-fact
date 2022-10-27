/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Image, SingleTouch } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

class Button extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderTextIfNeeded = () => {
    const { props } = this;

    if (!props.text || !props.text.length) {
      return;
    }

    return (
      <Translation>
        {(t) => (
          <Text style={[styles.text, props.textStyle]}>
            {props.text}
          </Text>
        )}
      </Translation>
    );
  };

  renderImageIfNeeded = () => {
    const { props } = this;

    let style = {};

    if (
      props.type
      &&
      props.type.toLowerCase() === 'small'.toLowerCase()
    ) {
      style = {
        ...style,
        width: 14,
        height: 14,
      }
    }

    let children = (
      <Image
        style={[styles.image, style, props.imageStyle]}
        source={props.source}
        resizeMode={props.resizeMode}
      />
    );

    if (!props.source) {
      if (!props.text) {
        children = (
          <View style={[styles.image, style, props.imageStyle]} />
        );
      } else {
        return;
      }
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.imageContainer}>
            {children}
          </View>
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    let style = {};

    if (
      props.type &&
      props.type.toLowerCase() === 'Small'.toLowerCase()
    ) {
      style = {
        ...style,
        minHeight: 30,
      }
    }

    let disabledStyle = {};

    if (props.disabled) {
      disabledStyle = {
        ...disabledStyle,
        backgroundColor: 'rgba(130, 110, 92, 0.3)',
      };
    }

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            disabled={props.disabled}
            onPress={props.onPress}>
            <View style={[styles.button, style, disabledStyle, props.buttonStyle]}>
              {this.renderImageIfNeeded()}
              {this.renderTextIfNeeded()}
            </View>
          </SingleTouch>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.background.secondary,
    borderRadius: 8,
  },
  button: {
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  imageContainer: {
    // backgroundColor: '#f00',
  },
  image: {
    width: 44,
    height: 44,
  },
});

Button.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  buttonStyle: ViewPropTypes.style,
  textStyle: TextPropTypes.style,
  imageStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  resizeMode: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  onLayout: undefined,
  style: undefined,
  buttonStyle: undefined,
  textStyle: undefined,
  imageStyle: undefined,
  hidden: false,
  type: undefined,
  text: undefined,
  source: undefined,
  resizeMode: "contain",
  disabled: false,
  onPress: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);
