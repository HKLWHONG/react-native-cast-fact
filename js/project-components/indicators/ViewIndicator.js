/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Image, FontConstants } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class ViewIndicator extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderIndicators = () => {
    const { props } = this;

    let children = (
      Array(props.numberOfIndicators)
        .fill()
        .map((_, i) => i)
        .map((i) => {
          let currentIndicatorTextContainerStyle = styles.indicatorTextContainer;
          let currentIndicatorTextStyle = styles.indicatorText;

          if (i === props.index) {
            currentIndicatorTextContainerStyle = styles.currentIndicatorTextContainer;
            currentIndicatorTextStyle = styles.currentIndicatorText;
          }

          return (
            <View
              key={i.toString()}
              style={currentIndicatorTextContainerStyle}
            >
              <Text style={currentIndicatorTextStyle}>
                {(i + 1).toString()}
              </Text>
            </View>
          );
        })
    );

    return (
      <Translation>
        {(t) => (
          <View style={styles.indicatorContainer}>
            {children}
          </View>
        )}
      </Translation>
    );
  };

  renderContentContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.contentContainer}>
            <Text style={styles.text}>{props.text}</Text>
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

    return (
      <Translation>
        {(t) => (
          <View
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
          >
            {this.renderIndicators()}
            {this.renderContentContainer()}
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f0f',
    paddingHorizontal: 16,
  },
  indicatorContainer: {
    // backgroundColor: '#0ff',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 4,
  },
  indicatorTextContainer: {
    backgroundColor: Theme.colors.general.black,
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Theme.colors.text.subtitle,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  indicatorText: {
    // backgroundColor: '#00f',
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontWeight: FontConstants.WEIGHT_BOLD,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  currentIndicatorTextContainer: {
    backgroundColor: Theme.colors.text.subtitle,
    width: 24,
    height: 24,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  currentIndicatorText: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.black,
    fontSize: 15,
    fontWeight: FontConstants.WEIGHT_BOLD,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  contentContainer: {
    // backgroundColor: '#f0f',
    alignItems: 'center',
    padding: 4,
  },
  text: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
});

ViewIndicator.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  index: PropTypes.number,
  numberOfIndicators: PropTypes.number,
  text: PropTypes.string,
};

ViewIndicator.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  index: 0,
  numberOfIndicators: 1,
  text: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewIndicator);
