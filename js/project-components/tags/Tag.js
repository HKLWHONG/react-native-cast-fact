/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Image, SingleTouch } from '../../components';

import { TextInput } from '../../project-components';

import { Dot } from '../dots';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const ic_checkmark_gray = require('../../../assets/images/ic_checkmark_gray/ic_checkmark_gray.png');
const ic_xmark = require('../../../assets/images/ic_xmark/ic_xmark.png');

class Tag extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderImage = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.imageView}>
            <Image
              style={[styles.image, props.imageStyle]}
              source={props.source}
              resizeMode={props.resizeMode}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderDot = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.dotView}>
            <Dot style={[styles.dot, props.dotStyle]}/>
          </View>
        )}
      </Translation>
    );
  };

  renderCheck = () => {
    const { props } = this;

    let children = (
      <Image
        style={[styles.check, props.checkStyle]}
        source={ic_checkmark_gray}
        resizeMode="center"
      />
    );

    if (!props.checked) {
      children = (
        <View style={[styles.check, props.checkStyle]} />
      );
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.checkView}>
            <View style={styles.checkBackgroundView}>
              {children}
            </View>
          </View>
        )}
      </Translation>
    );
  };

  renderLeftContainer = () => {
    const { props } = this;

    let children = (
      <View style={styles.emptyLeftAccessoryContainer} />
    );

    if (props.leftAccessoryType) {
      if (props.leftAccessoryType.toLowerCase() === 'image'.toLowerCase()) {
        children = this.renderImage();
      } else if (props.leftAccessoryType.toLowerCase() === 'dot'.toLowerCase()) {
        children = this.renderDot();
      } else if (props.leftAccessoryType.toLowerCase() === 'check'.toLowerCase()) {
        children = this.renderCheck();
      }
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.leftContainer}>
            {children}
          </View>
        )}
      </Translation>
    );
  };

  renderTextContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {props.text}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderSpaceTextIfNeeded = () => {
    const { props } = this;

    if (!props.unit || props.unit.length === 0) {
      return;
    }

    return (
      <Translation>
        {(t) => (
          <Text style={styles.text}>
           {' '}
          </Text>
        )}
      </Translation>
    );
  };

  renderInputContainer = () => {
    const { props, state } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              textInputStyle={styles.text}
              placeholderTextColor={Theme.colors.text.subtitle}
              editable={!props.disabled}
              value={props.text}
              placeholder={props.placeholder}
              maxLength={props.maxLength}
              keyboardType={props.keyboardType}
              onChangeText={(text) => {
                if (!props.onChangeText) {
                  return;
                }

                if (
                  text && text.length > 0
                  &&
                  props.regex && !new RegExp(props.regex).test(text)
                ) {
                  return;
                }

                props.onChangeText({
                  ...props.info,
                  text: text,
                })
              }}
              onFocus={() => {
                if (!props.onFocus) {
                  return;
                }

                props.onFocus(props.info);
              }}
              onBlur={() => {
                if (!props.onBlur) {
                  return;
                }

                props.onBlur(props.info);
              }}
              disableBottomLine
              disableMessageView
            />
            {this.renderSpaceTextIfNeeded()}
            <Text style={styles.text}>
              {props.unit}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderCenterContainer = () => {
    const { props } = this;

    let children = this.renderTextContainer();

    if (
      props.type
      &&
      props.type.toLowerCase() === 'input'.toLowerCase()
    ) {
      children = this.renderInputContainer();
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.centerContainer}>
            {children}
          </View>
        )}
      </Translation>
    );
  };

  renderDeleteButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            style={styles.rightAccessoryButton}
            onPress={() => {
              if (!props.onPressRightAccessory) {
                return;
              }

              props.onPressRightAccessory(props.info);
            }}
          >
            <Image
              style={styles.rightAccessoryButtonImage}
              source={ic_xmark}
              resizeMode="center"
            />
          </SingleTouch>
        )}
      </Translation>
    );
  };

  renderRightContainer = () => {
    const { props } = this;

    let children = (
      <View style={styles.emptyRightAccessoryContainer} />
    );

    if (
      props.rightAccessoryType
      &&
      props.rightAccessoryType.toLowerCase() === 'delete'.toLowerCase()
    ) {
      children = this.renderDeleteButton();
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.rightContainer}>
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
      (props.type && props.type.toLowerCase() === 'input'.toLowerCase())
      ||
      (props.type && props.type.toLowerCase() === 'range'.toLowerCase())
      ||
      (props.leftAccessoryType && props.leftAccessoryType.toLowerCase() === 'check'.toLowerCase())
    ) {
      style = {
        ...style,
        backgroundColor: Theme.colors.general.transparent,
        borderWidth: 1,
        borderColor: Theme.colors.background.secondary,
      };
    }

    let disabled = false;
    let editable = false;

    if (
      (
        props.type
        &&
        props.type.toLowerCase() === 'input'.toLowerCase()
      )
      ||
      (
        props.rightAccessoryType
        &&
        props.rightAccessoryType.toLowerCase() === 'delete'.toLowerCase()
      )
    ) {
      editable = true;
    }

    if (
      props.type
      &&
      props.type.toLowerCase() === 'input'.toLowerCase()
    ) {
      editable = !props.disabled;
    }

    disabled = props.disabled || editable;

    if (
      disabled
      &&
      !editable
      &&
      !props.disabledWithoutFeedback
    ) {
      style = {
        ...style,
        opacity: 0.5,
      };
    }

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            onLayout={props.onLayout}
            style={[styles.container, style, props.style]}
            disabled={disabled}
            onPress={() => {
              if (!props.onPress) {
                return;
              }

              props.onPress(props.info)
            }}
          >
            {this.renderLeftContainer()}
            {this.renderCenterContainer()}
            {this.renderRightContainer()}
          </SingleTouch>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0f0',
    backgroundColor: Theme.colors.background.secondary,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 8,
    margin: 4,
  },
  leftContainer: {
    // backgroundColor: '#ff0',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  emptyLeftAccessoryContainer: {
    // backgroundColor: '#f00',
    flex: 1,
    paddingLeft: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  imageView: {
    // backgroundColor: '#f0f',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 6,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  image: {
    // backgroundColor: '#f00',
    width: 11,
    height: 11,
  },
  dotView: {
    // backgroundColor: '#f0f',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 6,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  dot: {
    // backgroundColor: '#f00',
  },
  checkView: {
    // backgroundColor: '#f0f',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 6,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  checkBackgroundView: {
    // backgroundColor: '#0ff',
    backgroundColor: Theme.colors.background.secondary,
    borderRadius: 5.5,
  },
  check: {
    width: 11,
    height: 11,
  },
  centerContainer: {
    // backgroundColor: '#0f0',
    paddingVertical: 6,
  },
  inputContainer: {
    // backgroundColor: '#0ff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    // backgroundColor: '#0f0',
  },
  textContainer: {
    // backgroundColor: '#ff0',
  },
  text: {
    // backgroundColor: '#0f0',
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    padding: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  rightContainer: {
    // backgroundColor: '#00f',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  emptyRightAccessoryContainer: {
    // backgroundColor: '#f00',
    flex: 1,
    paddingRight: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rightAccessoryButton: {
    // backgroundColor: '#ff0',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 6,
    paddingRight: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rightAccessoryButtonImage: {
    // backgroundColor: '#0f0',
    width: 17,
    height: 17,
  },
});

Tag.propTypes = {
  info: PropTypes.object,
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  dotStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledWithoutFeedback: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  unit: PropTypes.string,
  regex: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  leftAccessoryType: PropTypes.string,
  rightAccessoryType: PropTypes.string,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  resizeMode: PropTypes.string,
  checked: PropTypes.bool,
  onPress: PropTypes.func,
  onPressRightAccessory: PropTypes.func,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Tag.defaultProps = {
  info: undefined,
  onLayout: undefined,
  style: undefined,
  dotStyle: undefined,
  hidden: false,
  disabled: false,
  disabledWithoutFeedback: false,
  type: undefined,
  text: undefined,
  placeholder: undefined,
  unit: undefined,
  regex: undefined,
  maxLength: undefined,
  keyboardType: undefined,
  leftAccessoryType: undefined,
  rightAccessoryType: undefined,
  source: undefined,
  resizeMode: 'contain',
  checked: false,
  onPress: undefined,
  onPressRightAccessory: undefined,
  onChangeText: undefined,
  onFocus: undefined,
  onBlur: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
