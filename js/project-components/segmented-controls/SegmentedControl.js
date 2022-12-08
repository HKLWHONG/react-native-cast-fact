/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';
import {
  store,
  SegmentedControlAction,
} from '../../redux';

import {
  Image,
  SingleTouch,
} from '../../components';

import {
  Button,
} from '../../project-components';

import { Theme } from '../../utils';

import { } from '../../processors';

import { } from '../../providers';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class SegmentedControl extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
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
          <SingleTouch
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                // backgroundColor: 'green',
                alignItems: 'center',
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: Theme.colors.borders.gray,
                paddingVertical: 12,
              }}
            >
              <Image
                style={styles.image}
                source={preview}
                resizeMode="contain"
              />
            </View>
          </SingleTouch>
          <SingleTouch
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                // backgroundColor: 'cyan',
                alignItems: 'center',
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: Theme.colors.borders.gray,
                paddingVertical: 12,
              }}
            >
              <Image
                style={styles.image}
                source={preview}
                resizeMode="contain"
              />
            </View>
          </SingleTouch>
          <SingleTouch
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                // backgroundColor: 'blue',
                alignItems: 'center',
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: Theme.colors.borders.gray,
                paddingVertical: 12,
              }}
            >
              <Image
                style={styles.image}
                source={preview}
                resizeMode="contain"
              />
            </View>
          </SingleTouch>
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
  },
  image: {
    // backgroundColor: '#0f0',
    width: 18,
    height: 18,
    borderRadius: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.borders.gray,
  },
  nameLabel: {
    // backgroundColor: '#0f0',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
    marginBottom: -5,
  },
  titleLabel: {
    // backgroundColor: '#00f',
    color: Theme.colors.text.subtitle,
    fontSize: 9,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.44,
    textTransform: 'uppercase',
  },
});

SegmentedControl.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
};

SegmentedControl.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SegmentedControlAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SegmentedControl);
