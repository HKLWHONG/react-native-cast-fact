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
              style={styles.tag}
              type="input"
              value={props.fromValue}
              text={props.fromText}
              maxLength={props.maxLengthOfFromValue}
              keyboardType="number-pad"
              onChangeValue={(params) => {
                if (!props.onChangeFromValue) {
                  return;
                }

                const { value } = params;

                if (
                  value && value.length > 0
                  &&
                  props.regexOfFromValue && !new RegExp(props.regexOfFromValue).test(value)
                ) {
                  return;
                }

                props.onChangeFromValue({
                  ...props.info,
                  ...params,
                });
              }}
            />
            <Text style={styles.text}>{'-'}</Text>
            <Tag
              style={styles.tag}
              type="input"
              value={props.toValue}
              text={props.toText}
              maxLength={props.maxLengthOfToValue}
              keyboardType="number-pad"
              onChangeValue={(params) => {
                if (!props.onChangeToValue) {
                  return;
                }

                const { value } = params;

                if (
                  value && value.length > 0
                  &&
                  props.regexOfToValue && !new RegExp(props.regexOfToValue).test(value)
                ) {
                  return;
                }

                props.onChangeToValue({
                  ...props.info,
                  ...params,
                });
              }}
            />
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
    alignItems: 'center',
  },
  tag: {
    // backgroundColor: '#0ff',
    paddingHorizontal: 8,
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
  info: PropTypes.object,
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  fromValue: PropTypes.string,
  fromText: PropTypes.string,
  toValue: PropTypes.string,
  toText: PropTypes.string,
  regexOfFromValue: PropTypes.string,
  regexOfToValue: PropTypes.string,
  maxLengthOfFromValue: PropTypes.number,
  maxLengthOfToValue: PropTypes.number,
  onChangeFromValue: PropTypes.func,
  onChangeToValue: PropTypes.func,
};

RangeTag.defaultProps = {
  info: undefined,
  onLayout: undefined,
  style: undefined,
  hidden: false,
  fromValue: undefined,
  fromText: undefined,
  toValue: undefined,
  toText: undefined,
  regexOfFromValue: undefined,
  regexOfToValue: undefined,
  maxLengthOfFromValue: undefined,
  maxLengthOfToValue: undefined,
  onChangeFromValue: undefined,
  onChangeToValue: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeTag);
