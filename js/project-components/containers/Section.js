/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

class Section extends Component {
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
            <View style={[styles.headerContainer, props.headerContainerStyle]}>
              <Image
                style={[styles.icon, props.iconStyle]}
                source={props.iconSource}
                resizeMode="contain"
              />
              <Text style={[styles.label, props.labelStyle]}>
                {props.label}
              </Text>
            </View>
            <View style={[styles.contentContainer, props.contentContainerStyle]}>
              {props.children}
            </View>
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
  },
  headerContainer: {
    // backgroundColor: '#0f0',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 4,
  },
  icon: {
    // backgroundColor: '#ff0',
    width: 14,
    height: 13,
    marginRight: 8,
  },
  label: {
    // backgroundColor: 'green',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  contentContainer: {
    // backgroundColor: '#00f',
    padding: 16,
    paddingTop: 4,
  },
});

Section.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  headerContainerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  iconStyle: ViewPropTypes.style,
  labelStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  iconSource: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  label: PropTypes.string,
};

Section.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  headerContainerStyle: undefined,
  contentContainerStyle: undefined,
  iconStyle: undefined,
  labelStyle: undefined,
  hidden: false,
  iconSource: undefined,
  label: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Section);
