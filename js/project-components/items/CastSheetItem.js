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
} from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const ic_eye_on = require('../../../assets/images/ic_eye_on/ic_eye_on.png');
const ic_eye_off = require('../../../assets/images/ic_eye_off/ic_eye_off.png');

class CastSheetItem extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderLeftContainer() {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.leftContainer}>
            <Text style={{
              color: Theme.colors.text.subtitle,
              fontSize: 15,
              fontFamily: Theme.fonts.regular,
              letterSpacing: 1.7,
              textTransform: 'uppercase',
            }}>
              {props.text}
            </Text>
          </View>
        )}
      </Translation>
    );
  }

  renderCenterContainer() {
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
          <View style={styles.centerContainer}>
            {children}
          </View>
        )}
      </Translation>
    );
  }

  renderRightContainer() {
    const { props } = this;

    const source = props.visible ? ic_eye_on : ic_eye_off;

    return (
      <Translation>
        {(t) => (
          <View style={styles.rightContainer}>
            <Button
              style={styles.visibilityButton}
              type="small"
              source={source}
              resizeMode="center"
              onPress={() => {
                if (!props.onPressVisibilityButton) {
                  return;
                }

                props.onPressVisibilityButton({
                  visible: props.visible,
                });
              }}
            />
          </View>
        )}
      </Translation>
    );
  }

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
            {this.renderLeftContainer()}
            {this.renderCenterContainer()}
            {this.renderRightContainer()}
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0ff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.general.transparent,
    padding: 8,
    marginVertical: 8,
  },
  leftContainer: {
    // backgroundColor: '#f0f',
    flex: 1,
    alignItems: 'flex-end',
  },
  centerContainer: {
    // backgroundColor: '#f00',
    flex: 1,
    paddingHorizontal: 8,
  },
  rightContainer: {
    // backgroundColor: '#0ff',
  },
  visibilityButton: {
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: Theme.colors.background.gray,
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
