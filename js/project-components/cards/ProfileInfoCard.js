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
  ProfileInfoCardAction,
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

const preview = require('../../../assets/images/preview/preview.png');

class ProfileInfoCard extends Component {
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
            style={{
              backgroundColor: 'red',
              flexDirection: 'row',
              paddingHorizontal: 16,
              paddingVertical: 32,
            }}
          >
            <View
              style={{
                backgroundColor: 'green',
                flex: 2,
                alignItems: 'center',
              }}
            >
              <Image
                style={styles.image}
                source={preview}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                backgroundColor: 'cyan',
                flex: 3,
              }}
            >
              <Text style={styles.nameLabel}>
                {'Nam Joohyuk'}
              </Text>
              <Text style={styles.titleLabel}>
                {'Actor'}
              </Text>
              <Button
                style={styles.button}
                type="small"
                rightAccessorySource={preview}
                text={t('EDIT PROFILE')}
                resizeMode="center"
                onPress={() => {
                  if (!props.onPressCalendar) {
                    return;
                  }

                  props.onPressCalendar(params);
                }}
              />
              <Text style={{}}>
                {'Work contact'}
              </Text>
              <Text style={{}}>
                {'linktr.ee/417unofiical'}
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
    // backgroundColor: '#f00',
  },
  button: {
    alignSelf: 'flex-start',
  },
  image: {
    // backgroundColor: '#0f0',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.borders.gray,
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

ProfileInfoCard.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
};

ProfileInfoCard.defaultProps = {
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
    reset: (...args) => dispatch(ProfileInfoCardAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoCard);
