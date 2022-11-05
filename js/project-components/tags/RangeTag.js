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
            style={[styles.container, props.style]}
          >
            <Tag
              style={styles.tag}
              disabled={props.disabled}
              type="input"
              text={props.fromText}
              unit={props.fromUnit}
              maxLength={props.maxLength}
              keyboardType={props.keyboardType}
              onChangeText={(params) => {
                if (!props.onChangeFromText) {
                  return;
                }

                const { text } = params;

                if (
                  text && text.length > 0
                  &&
                  props.regex && !new RegExp(props.regex).test(text)
                ) {
                  return;
                }

                props.onChangeFromText({
                  ...props.info,
                  ...params,
                });
              }}
            />
            <Text style={styles.text}>
              {'-'}
            </Text>
            <Tag
              style={styles.tag}
              disabled={props.disabled}
              type="input"
              text={props.toText}
              unit={props.toUnit}
              maxLength={props.maxLength}
              keyboardType={props.keyboardType}
              onChangeText={(params) => {
                if (!props.onChangeToText) {
                  return;
                }

                const { text } = params;

                if (
                  text && text.length > 0
                  &&
                  props.regex && !new RegExp(props.regext).test(text)
                ) {
                  return;
                }

                props.onChangeToText({
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
  fromText: PropTypes.string,
  fromUnit: PropTypes.string,
  toText: PropTypes.string,
  toUnit: PropTypes.string,
  regex: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  onChangeFromText: PropTypes.func,
  onChangeToText: PropTypes.func,
};

RangeTag.defaultProps = {
  info: undefined,
  onLayout: undefined,
  style: undefined,
  hidden: false,
  fromText: undefined,
  fromUnit: undefined,
  toText: undefined,
  toUnit: undefined,
  regex: undefined,
  maxLength: undefined,
  keyboardType: undefined,
  onChangeFromText: undefined,
  onChangeToText: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeTag);
