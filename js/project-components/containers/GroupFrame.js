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
            disabled={disabled}
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
            disabled={disabled}
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
          />
        )}
      </Translation>
    );
  };

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
          >
            <View style={styles.contentContainer}>
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
  },
  contentContainer: {
    // backgroundColor: '#ff0',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    padding: 4,
  },
  rightContainer: {
    // backgroundColor: '#0ff',
    justifyContent: 'center',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
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
});

GroupFrame.propTypes = {
  info: PropTypes.object,
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledWithoutFeedback: PropTypes.bool,
  rightAccessoryDisabled: PropTypes.bool,
  rightAccessoryType: PropTypes.string,
  checked: PropTypes.bool,
  onPress: PropTypes.func,
  onPressRightAccessory: PropTypes.func,
};

GroupFrame.defaultProps = {
  info: undefined,
  onLayout: undefined,
  children: undefined,
  style: undefined,
  hidden: false,
  disabled: false,
  disabledWithoutFeedback: false,
  rightAccessoryDisabled: false,
  rightAccessoryType: undefined,
  checked: false,
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
