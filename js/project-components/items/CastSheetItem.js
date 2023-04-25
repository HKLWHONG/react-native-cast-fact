/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { } from '../../components';

import {
  Button,
  GroupFrame,
} from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

class CastSheetItem extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderTopContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.topContainer}>
            <Text style={styles.title}>
              {props.text}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderBottomContainer = () => {
    const { props } = this;

    let children = (
      <View />
    );

    if (props.children) {
      children = props.children;
    }

    return (
      <Translation>
        {(t) => (
          <GroupFrame
            style={styles.bottomContainer}
            contentContainerStyle={styles.bottomContentContainer}
            rightAccessoryType="eye"
            visible={props.visible}
            onPressRightAccessory={(info) => {
              if (!props.onPressVisibilityButton) {
                return;
              }

              props.onPressVisibilityButton({
                ...info,
                visible: props.visible,
              });
            }}
          >
            {children}
          </GroupFrame>
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <Translation>
        {(t) => (
          <View
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
          >
            {this.renderTopContainer()}
            {this.renderBottomContainer()}
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0ff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.general.transparent,
    padding: 8,
    marginVertical: 8,
  },
  topContainer: {
    // backgroundColor: '#f0f',
    // flex: 1,
    // alignItems: 'flex-end',
    // paddingTop: 10,
    // paddingBottom: 4,
  },
  title: {
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.regular,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  bottomContainer: {
    // backgroundColor: '#0f0',
    marginVertical: 8,
  },
  bottomContentContainer: {
    // backgroundColor: '#00f',
    // alignItems: 'center',
  },
});

CastSheetItem.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  text: PropTypes.string,
  visible: PropTypes.bool,
  onPressVisibilityButton: PropTypes.func,
};

CastSheetItem.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  hidden: false,
  text: undefined,
  visible: true,
  onPressVisibilityButton: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CastSheetItem);
