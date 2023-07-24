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
              placeholderTextColor={Theme.colors.text.subtitle}
              disabled={props.disabled}
              type="input"
              text={props.fromText}
              placeholder={props.fromPlaceholder}
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
              onFocus={() => {
                if (!props.onFocusFrom) {
                  return;
                }

                props.onFocusFrom(props.info);
              }}
              onBlur={() => {
                if (!props.onBlurFrom) {
                  return;
                }

                props.onBlurFrom(props.info);
              }}
            />
            <Text style={styles.text}>
              {'-'}
            </Text>
            <Tag
              style={styles.tag}
              placeholderTextColor={Theme.colors.text.subtitle}
              disabled={props.disabled}
              type="input"
              text={props.toText}
              placeholder={props.toPlaceholder}
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
                  props.regex && !new RegExp(props.regex).test(text)
                ) {
                  return;
                }

                props.onChangeToText({
                  ...props.info,
                  ...params,
                });
              }}
              onFocus={() => {
                if (!props.onFocusTo) {
                  return;
                }

                props.onFocusTo(props.info);
              }}
              onBlur={() => {
                if (!props.onBlurTo) {
                  return;
                }

                props.onBlurTo(props.info);
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
  fromPlaceholder: PropTypes.string,
  fromUnit: PropTypes.string,
  toText: PropTypes.string,
  toPlaceholder: PropTypes.string,
  toUnit: PropTypes.string,
  regex: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  onChangeFromText: PropTypes.func,
  onFocusFrom: PropTypes.func,
  onBlurFrom: PropTypes.func,
  onChangeToText: PropTypes.func,
  onFocusTo: PropTypes.func,
  onBlurTo: PropTypes.func,
};

RangeTag.defaultProps = {
  info: undefined,
  onLayout: undefined,
  style: undefined,
  hidden: false,
  fromText: undefined,
  fromPlaceholder: undefined,
  fromUnit: undefined,
  toText: undefined,
  toPlaceholder: undefined,
  toUnit: undefined,
  regex: undefined,
  maxLength: undefined,
  keyboardType: 'numeric',
  onChangeFromText: undefined,
  onFocusFrom: undefined,
  onBlurFrom: undefined,
  onChangeToText: undefined,
  onFocusTo: undefined,
  onBlurTo: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeTag);
