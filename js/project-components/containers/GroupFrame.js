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

import { Button } from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const ic_xmark = require('../../../assets/images/ic_xmark/ic_xmark.png');
const ic_checkmark = require('../../../assets/images/ic_checkmark/ic_checkmark.png');
const ic_plus = require('../../../assets/images/ic_plus/ic_plus.png');
const ic_eye_on = require('../../../assets/images/ic_eye_on/ic_eye_on.png');
const ic_eye_off = require('../../../assets/images/ic_eye_off/ic_eye_off.png');
const ic_delete = require('../../../assets/images/ic_delete/ic_delete.png');

class GroupFrame extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderDeleteButton = () => {
    const { props } = this;

    let style = {};

    let disabled = props.disabled || props.rightAccessoryDisabled;

    if (
      disabled
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
            style={[style, styles.rightAccessoryButton]}
            disabled={disabled}
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

  renderCheckButton = () => {
    const { props } = this;

    let style = {};

    let disabled = props.disabled || props.rightAccessoryDisabled;

    if (
      disabled
    ) {
      style = {
        ...style,
        opacity: 0.5,
      };
    }

    return (
      <Translation>
        {(t) => (
          <Button
            style={style}
            buttonStyle={styles.checkAccessoryButton}
            imageStyle={styles.checkAccessoryButtonImage}
            type="small"
            source={props.checked ? ic_checkmark : undefined}
            resizeMode="center"
            onPress={() => {
              if (!props.onPressRightAccessory) {
                return;
              }

              props.onPressRightAccessory(props.info);
            }}
            disabled={disabled}
          />
        )}
      </Translation>
    );
  };

  renderPlusButton = () => {
    const { props } = this;

    let style = {};

    let disabled = props.disabled || props.rightAccessoryDisabled;

    if (
      disabled
    ) {
      style = {
        ...style,
        opacity: 0.5,
      };
    }

    return (
      <Translation>
        {(t) => (
          <Button
            style={style}
            buttonStyle={styles.checkAccessoryButton}
            imageStyle={styles.checkAccessoryButtonImage}
            type="small"
            source={ic_plus}
            resizeMode="center"
            onPress={() => {
              if (!props.onPressRightAccessory) {
                return;
              }

              props.onPressRightAccessory(props.info);
            }}
            disabled={disabled}
          />
        )}
      </Translation>
    );
  };

  renderEyeButton = () => {
    const { props } = this;

    let style = {};

    let disabled = props.disabled || props.rightAccessoryDisabled;

    if (
      disabled
    ) {
      style = {
        ...style,
        opacity: 0.5,
      };
    }

    return (
      <Translation>
        {(t) => (
          <Button
            style={[styles.visibilityButton, style]}
            buttonStyle={styles.checkAccessoryButton}
            imageStyle={styles.checkAccessoryButtonImage}
            type="small"
            source={props.visible ? ic_eye_on : ic_eye_off}
            resizeMode="center"
            onPress={() => {
              if (!props.onPressRightAccessory) {
                return;
              }

              props.onPressRightAccessory({
                ...props.info,
                visible: props.visible,
              });
            }}
            disabled={disabled}
          />
        )}
      </Translation>
    );
  };

  renderDeleteGroupButton = () => {
    const { props } = this;

    let style = {};

    let disabled = props.disabled || props.rightAccessoryDisabled;

    if (
      disabled
    ) {
      style = {
        ...style,
        opacity: 0.5,
      };
    }

    return (
      <Translation>
        {(t) => (
          <Button
            style={[styles.visibilityButton, style]}
            buttonStyle={styles.checkAccessoryButton}
            imageStyle={styles.checkAccessoryButtonImage}
            type="small"
            source={ic_delete}
            resizeMode="center"
            onPress={() => {
              if (!props.onPress) {
                return;
              }
              props.onPress(props.info);
            }}
            disabled={disabled}
          />
        )}
      </Translation>
    );
  };

  renderEyeAndDeleteButton = () => {
    return (
      <Translation>
        {(t) => (

          <View style={styles.twoButtonRightContainer}>
            {this.renderDeleteGroupButton()}
            <View style={{ height: 10 }}></View>
            {this.renderEyeButton()}
          </View>
          // <View >


          //   
          // </View>
        )}
      </Translation>
    )
  }

  renderRightContainer = () => {
    const { props } = this;

    let children = (
      <View style={styles.emptyRightAccessoryContainer}>
        <View style={styles.emptyRightAccessoryView} />
      </View>
    );

    if (props.rightAccessoryType) {
      if (props.rightAccessoryType.toLowerCase() === 'delete'.toLowerCase()) {
        children = this.renderDeleteButton();
      } else if (props.rightAccessoryType.toLowerCase() === 'check'.toLowerCase()) {
        children = this.renderCheckButton();
      } else if (props.rightAccessoryType.toLowerCase() === 'plus'.toLowerCase()) {
        children = this.renderPlusButton();
      } else if (props.rightAccessoryType.toLowerCase() === 'eye'.toLowerCase()) {
        children = this.renderEyeButton();
      } else if (props.rightAccessoryType.toLowerCase() === 'eye&delete'.toLowerCase()) {
        children = this.renderEyeAndDeleteButton();
      }
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

    let disabled = props.disabled;

    if (
      disabled
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
            disabled={disabled || !props.onPress}
            onPress={() => {
              if (!props.onPress) {
                return;
              }

              props.onPress(props.info);
            }}
            feedbackDisabled
          >
            <View style={[styles.contentContainer, props.contentContainerStyle]}>
              {props.children}
            </View>
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
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.colors.background.secondary,
    padding: 4,
  },
  contentContainer: {
    // backgroundColor: '#ff0',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  rightContainer: {
    // backgroundColor: '#0ff',
    justifyContent: 'center',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    paddingHorizontal: 4,
  },
  twoButtonRightContainer: {
    // backgroundColor: '#0ff',
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    paddingHorizontal: 4,
  },
  emptyRightAccessoryContainer: {
    // backgroundColor: '#f0f',
    flex: 1,
    justifyContent: 'center',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  emptyRightAccessoryView: {
    width: 14,
    height: 13,
  },
  rightAccessoryButton: {
    // backgroundColor: '#00f',
    flex: 1,
    justifyContent: 'center',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  rightAccessoryButtonImage: {
    width: 17,
    height: 17,
  },
  checkAccessoryButton: {
    // backgroundColor: '#0f0',
    height: 30,
    aspectRatio: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  checkAccessoryButtonImage: {
    width: 21,
    height: 21,
  },
  visibilityButton: {
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: Theme.colors.background.gray,
  }
});

GroupFrame.propTypes = {
  info: PropTypes.object,
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledWithoutFeedback: PropTypes.bool,
  rightAccessoryDisabled: PropTypes.bool,
  rightAccessoryType: PropTypes.string,
  checked: PropTypes.bool,
  visible: PropTypes.bool,
  onPress: PropTypes.func,
  onPressRightAccessory: PropTypes.func,
};

GroupFrame.defaultProps = {
  info: undefined,
  onLayout: undefined,
  children: undefined,
  style: undefined,
  contentContainerStyle: undefined,
  hidden: false,
  disabled: false,
  disabledWithoutFeedback: false,
  rightAccessoryDisabled: false,
  rightAccessoryType: undefined,
  checked: false,
  visible: true,
  onPress: undefined,
  onPressRightAccessory: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupFrame);
