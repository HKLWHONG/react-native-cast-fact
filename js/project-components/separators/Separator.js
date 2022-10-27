/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Separator as CommonSeparator, Image } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

class Separator extends Component {
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
          <CommonSeparator
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            lineStyle={[styles.line, props.lineStyle]}
            textStyle={[styles.text, props.textStyle]}
            text={props.text} />
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0f0',
  },
  line: {
    backgroundColor: Theme.colors.decorations.splitline,
  },
  text: {
    // backgroundColor: '#0f0',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.7,
  },
});

Separator.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  lineStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  text: PropTypes.string,
};

Separator.defaultProps = {
  onLayout: undefined,
  style: undefined,
  lineStyle: undefined,
  textStyle: undefined,
  hidden: false,
  text: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Separator);
