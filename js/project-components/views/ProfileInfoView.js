/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';
import {
  store,
  ProfileInfoViewAction,
} from '../../redux';

import {
  Image,
} from '../../components';

import {
  Button,
} from '../../project-components';

import { Theme } from '../../utils';

import { } from '../../processors';

import { } from '../../providers';

import { Translation } from 'react-i18next';

const ic_profile_placeholder = require('../../../assets/images/ic_profile_placeholder/ic_profile_placeholder.png');

class ProfileInfoView extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    let source = ic_profile_placeholder;

    if (props.photo && props.photo.path) {
      source = { uri: 'file://' + (props.photo && props.photo.path) };
    }

    return (
      <Translation>
        {(t) => (
          <ImageBackground
            style={styles.container}
            source={source}
            blurRadius={20}
          >
            <ImageBackground style={styles.layerContainer}>
              <View
                style={{
                  // backgroundColor: 'green',
                  flex: 2,
                  alignItems: 'center',
                }}
              >
                <Image
                  style={styles.photo}
                  source={source}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  // backgroundColor: 'cyan',
                  flex: 3,
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.name}>
                  {'Nam Joohyuk'}
                </Text>
                <Text style={styles.occupation}>
                  {'Actor'}
                </Text>
              </View>
            </ImageBackground>
          </ImageBackground>
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
  layerContainer: {
    backgroundColor: Theme.colors.background.primary,
    opacity: 0.9,
    flex: 1,
    flexDirection: 'row',
    padding: 16,
  },
  button: {
    alignSelf: 'flex-start',
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
  name: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  occupation: {
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    textTransform: 'uppercase',
  },
});

ProfileInfoView.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
};

ProfileInfoView.defaultProps = {
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
    reset: (...args) => dispatch(ProfileInfoViewAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoView);
