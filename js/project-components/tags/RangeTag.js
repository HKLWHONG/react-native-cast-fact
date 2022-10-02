/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import Tag from './Tag';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class RangeTag extends Component {
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
            style={[styles.container, props.style]}>
            <Tag
              type="input"
              value={props.fromValue}
              text={props.fromText}
            />
            <Text style={styles.text}>{'-'}</Text>
            <Tag
              type="input"
              value={props.toValue}
              text={props.toText}
            />
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    // backgroundColor: '#0f0',
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    padding: 0,
    margin: 4,
  },
});

RangeTag.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  fromValue: PropTypes.string,
  fromText: PropTypes.string,
  toValue: PropTypes.string,
  toText: PropTypes.string,
};

RangeTag.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  fromValue: undefined,
  fromText: undefined,
  toValue: undefined,
  toText: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeTag);
