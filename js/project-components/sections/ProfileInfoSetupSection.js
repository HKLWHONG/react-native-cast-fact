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
  Image,
} from '../../components';

import {
  ViewIndicator,
} from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

class ProfileInfoSetupSection extends Component {
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
            <ViewIndicator
              index={props.index}
              numberOfIndicators={props.numberOfIndicators}
              text={props.text}
            />
            <Image
              style={styles.photo}
              source={props.source}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={[styles.text, { width: 100 }]}>
                {t(' ')}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.text, { width: 150 }]}>
                {t(' ')}
              </Text>
            </View>
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0f0',
    alignItems: 'center',
  },
  photo: {
    backgroundColor: Theme.colors.background.gray,
    width: 100,
    height: 100,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.borders.gray,
    margin: 16,
  },
  textContainer: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.background.gray,
    borderRadius: 4,
    marginVertical: 4,
  },
  text: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

ProfileInfoSetupSection.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  index: PropTypes.number,
  numberOfIndicators: PropTypes.number,
  text: PropTypes.string,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
};

ProfileInfoSetupSection.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  index: 0,
  numberOfIndicators: 1,
  text: undefined,
  source: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoSetupSection);
