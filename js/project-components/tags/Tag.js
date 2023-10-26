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
            <Dot style={[styles.dot, props.dotStyle]} />
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

    let style = {};

    let enabled = false;

    if (
      !props.type
      ||
      props.type.toLowerCase() !== 'input'.toLowerCase()
    ) {
      enabled = true;
    }

    let text = props.text;

    if (!enabled) {
      style = {
        ...style,
        width: 0,
      };

      text = undefined;
    }

    return (
      <Translation>
        {(t) => (
          <View style={[styles.textContainer, style]}>
            <Text style={styles.text}>
              {text}
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

    let style = {};
    let textInputStyle = {};

    let enabled = false;

    if (
      props.type
      &&
      props.type.toLowerCase() === 'input'.toLowerCase()
    ) {
      style = {
        ...textInputStyle,
        minWidth: 30,
      };

      textInputStyle = {
        ...textInputStyle,
        minWidth: 30,
      };

      enabled = true;
    }

    if (props.fill) {
      if (enabled) {
        style = {
          ...style,
          flex: 1,
        };
      }

      textInputStyle = {
        ...textInputStyle,
        flex: 1,
      };
    }

    let value = props.text;

    if (props.disabled || !props.editable) {
      value = undefined;
    }

    let textInput = (
      <TextInput
        innerRef={(ref) => {
          if (!ref) {
            return;
          }

          this.state.textInputRef = ref;
        }}
        style={[styles.input, textInputStyle]}
        textInputStyle={styles.text}
        placeholderTextColor={Theme.colors.text.subtitle}
        editable={!props.disabled && props.editable}
        value={value}
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
            textInputRef: this.state.textInputRef,
            text: text,
          })
        }}
        onFocus={() => {
          if (!props.onFocus) {
            return;
          }

          props.onFocus({
            ...props.info,
            textInputRef: this.state.textInputRef,
          });
        }}
        onBlur={() => {
          if (!props.onBlur) {
            return;
          }

          props.onBlur({
            ...props.info,
            textInputRef: this.state.textInputRef,
          });
        }}
        disableBottomLine
        disableMessageView
      />
    );

    let children = textInput;

    if (props.disabled || !props.editable) {
      children = (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 0 }}>
            {textInput}
          </View>
          <Text style={styles.text}>
            {props.text}
          </Text>
        </View>
      );
    }

    if (!enabled) {
      style = {
        ...style,
        width: 0,
      };

      children = (
        <TextInput
          style={[styles.input, textInputStyle]}
          textInputStyle={styles.text}
          disableBottomLine
          disableMessageView
        />
      );
    }

    return (
      <Translation>
        {(t) => (
          <View style={[styles.inputContainer, style]}>
            {children}
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

    let style = {};

    if (props.maxWidth) {
      style = {
        ...style,
        maxWidth: props.maxWidth,
      };
    }

    if (props.fill) {
      style = {
        ...style,
        flex: 1,
      };
    }

    return (
      <Translation>
        {(t) => (
          <View style={[styles.centerContainer, style]}>
            {this.renderTextContainer()}
            {this.renderInputContainer()}
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

  renderPlaceholderButton = () => {
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
            <View style={styles.rightAccessoryButtonImage} />
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
    } else if (
      props.rightAccessoryType
      &&
      props.rightAccessoryType.toLowerCase() === 'placeholder'.toLowerCase()
      &&
      (!props.text || !props.text.length === 0)
    ) {
      children = this.renderPlaceholderButton();
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

    if (props.fill) {
      style = {
        ...style,
        flex: 1,
      };
    }

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

    disabled = props.disabled || (editable && !props.pressable);

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

    if (props.state) {
      if (props.state.toLowerCase() === 'attention'.toLowerCase()) {
        style = {
          ...style,
          borderColor: Theme.colors.indicator.attention,
        };
      } else if (props.state.toLowerCase() === 'success'.toLowerCase()) {
        style = {
          ...style,
          borderColor: Theme.colors.indicator.success,
        };
      } else if (props.state.toLowerCase() === 'error'.toLowerCase()) {
        style = {
          ...style,
          borderColor: Theme.colors.indicator.error,
        };
      }
    }

    if (props.pressable) {
      return (
        <Translation>
          {(t) => (
            <View
              onLayout={props.onLayout}
              style={[styles.container, style, props.style]}
            >
              <SingleTouch
                style={styles.subContainer}
                disabled={disabled}
                onPress={() => {
                  if (!props.onPress) {
                    return;
                  }

                  props.onPress(props.info)
                }}
                feedbackDisabled
              >
                {this.renderLeftContainer()}
                {this.renderCenterContainer()}
              </SingleTouch>
              {this.renderRightContainer()}
            </View>
          )}
        </Translation>
      );
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
            feedbackDisabled
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
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.colors.general.transparent,
    margin: 4,
  },
  subContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
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
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledWithoutFeedback: PropTypes.bool,
  editable: PropTypes.bool,
  pressable: PropTypes.bool,
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
  fill: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  state: PropTypes.string,
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
  maxWidth: undefined,
  hidden: false,
  disabled: false,
  disabledWithoutFeedback: false,
  editable: true,
  pressable: false,
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
  fill: undefined,
  state: undefined,
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
