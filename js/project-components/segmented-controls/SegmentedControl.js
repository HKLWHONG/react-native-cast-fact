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

const ic_info_unselected = require('../../../assets/images/ic_info_unselected/ic_info_unselected.png');
const ic_info_selected = require('../../../assets/images/ic_info_selected/ic_info_selected.png');
const ic_appearance_unselected = require('../../../assets/images/ic_appearance_unselected/ic_appearance_unselected.png');
const ic_appearance_selected = require('../../../assets/images/ic_appearance_selected/ic_appearance_selected.png');
const ic_experience_unselected = require('../../../assets/images/ic_experience_unselected/ic_experience_unselected.png');
const ic_experience_selected = require('../../../assets/images/ic_experience_selected/ic_experience_selected.png');
const ic_contacts_unselected = require('../../../assets/images/ic_contacts_unselected/ic_contacts_unselected.png');
const ic_contacts_selected = require('../../../assets/images/ic_contacts_selected/ic_contacts_selected.png');
const ic_social_media_unselected = require('../../../assets/images/ic_social_media_unselected/ic_social_media_unselected.png');
const ic_social_media_selected = require('../../../assets/images/ic_social_media_selected/ic_social_media_selected.png');

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
            style={styles.button}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={ic_info_unselected}
                resizeMode="contain"
              />
            </View>
          </SingleTouch>
          <SingleTouch
            style={styles.button}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={ic_appearance_unselected}
                resizeMode="contain"
              />
            </View>
          </SingleTouch>
          <SingleTouch
            style={styles.button}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={ic_experience_unselected}
                resizeMode="contain"
              />
            </View>
          </SingleTouch>
          <SingleTouch
            style={styles.button}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={ic_contacts_unselected}
                resizeMode="contain"
              />
            </View>
          </SingleTouch>
          <SingleTouch
            style={styles.button}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={ic_social_media_unselected}
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
  button: {
    // backgroundColor: '#f00',
    flex: 1,
  },
  imageContainer: {
    // backgroundColor: '#0ff',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  image: {
    width: 24,
    height: 24,
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
