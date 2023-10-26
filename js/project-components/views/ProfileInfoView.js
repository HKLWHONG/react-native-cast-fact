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

import { Theme, Router } from '../../utils';

import i18n from '../../../i18n';

import { Environment } from '../../config';

import { UserProcessor } from '../../processors';

import { } from '../../providers';

import { Translation } from 'react-i18next';

const ic_profile_placeholder = require('../../../assets/images/ic_profile_placeholder/ic_profile_placeholder.png');

const ic_pen = require('../../../assets/images/ic_pen/ic_pen.png');

class ProfileInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { props } = this;
    console.log(props)
    if (props.hidden) {
      return null;
    }

    let source = ic_profile_placeholder;
    if (
      props.profile
      &&
      props.profile.images
      &&
      props.profile.images.length > 0
    ) {
      source = { uri: `${Environment.API_URL}${props.profile.images[props.profile.images.length - 1]}` };
    }

    let name = UserProcessor.toName(props.profile);
    let occupation = UserProcessor.toOccupation(props.profile);

    let nameTextContainerStyle = {};
    let occupationTextContainerStyle = {};

    if (name) {
      nameTextContainerStyle = {
        ...nameTextContainerStyle,
        backgroundColor: Theme.colors.general.transparent,
      }
    }

    if (occupation) {
      occupationTextContainerStyle = {
        ...occupationTextContainerStyle,
        backgroundColor: Theme.colors.general.transparent,
      }
    }

    console.log('[profile-info-section-name]', name);
    console.log('[profile-info-section-occupation]', occupation);

    return (
      <Translation>
        {(t) => (
          <ImageBackground
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
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
                  alignItems: 'flex-start',
                }}
              >
                <View style={[styles.textContainer, { minWidth: 100 }, nameTextContainerStyle]}>
                  <Text style={styles.name}>
                    {` ${name || ' '} `}
                  </Text>
                </View>
                <View style={[styles.textContainer, { minWidth: 150 }, occupationTextContainerStyle]}>
                  <Text style={styles.occupation}>
                    {` ${occupation || ' '} `}
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Button
                    buttonStyle={styles.editButton}
                    textStyle={styles.editButtonText}
                    text={i18n.t('project_components.profile_info.edit_profile')}
                    type="small"
                    leftAccessorySource={ic_pen}
                    leftAccessoryResizeMode="center"
                    onPress={props.onPress}
                  />
                </View>
              </View>
            </ImageBackground>
          </ImageBackground>
        )
        }
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
  editButton: {
    backgroundColor: Theme.colors.background.secondary,
    paddingLeft: 10,
    paddingRight: 10,
  },
  editButtonText: {
    fontSize: 13,
    letterSpacing: 2.22,
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
    // marginVertical: 4,
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
  profile: PropTypes.object,
  onPress: PropTypes.func,
};

ProfileInfoView.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  profile: undefined,
  onPress: undefined,
};

function mapStateToProps(state) {
  return {
    // account: state.profileInfoSetupViewReducer.account,
    // profileCastSheetEditionViewAccount: state.profileCastSheetEditionViewReducer.account,
    // userProfile: state.dataReducer.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(ProfileInfoViewAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoView);
