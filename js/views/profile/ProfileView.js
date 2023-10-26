/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  ImageBackground,
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { ProfileViewAction, MainTabNavigatorAction, DataAction, ProfileCastSheetEditionViewAction } from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  List,
} from '../../components';

import {
  ProfileInfoView,
  SegmentedControl,
  ProfileCastingSheetList,
  Button,
  ProfilePreviewView,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import {
  CastSheetConstants,
} from '../../constants';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_light_background = require('../../../assets/images/ic_light_background/ic_light_background.png');

const ic_digital_cast_sheet = require('../../../assets/images/ic_digital_cast_sheet/ic_digital_cast_sheet.png');
const ic_searchable_profile = require('../../../assets/images/ic_searchable_profile/ic_searchable_profile.png');

export const IDENTIFIER = 'ProfileView';

class ProfileView extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();

    const { props } = this;

    this.initialize();
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.clearData();
  }

  initialize = () => {
    const { props } = this;
  };

  clearData = () => {
    const { props } = this;
  };

  renderHeader = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Header style={styles.header} />
        )}
      </Translation>
    );
  };

  renderProfileInfoView = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;
    return (
      <Translation>
        {(t) => (
          <ProfileInfoView
            profile={props.userProfile}

          />
        )}
      </Translation>
    );
  };

  renderImageBackground = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <ImageBackground
            style={styles.imageBackground}
            source={ic_light_background}
          />
        )}
      </Translation>
    );
  };

  renderTitleContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {t('')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderDescriptionContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText1}>
              {t('views.profile.description_1')}
            </Text>
            <Text style={styles.descriptionText2}>
              {t('views.profile.description_2')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderButtonContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.buttonContainer}>
            <Button
              style={[styles.button, { marginBottom: 4 }]}
              textStyle={styles.buttonText}
              leftAccessoryImageStyle={styles.buttonLeftAccessoryImage}
              text={t('views.welcome.digital_cast_sheet')}
              description={t('views.profile.digital_cast_sheet_description')}
              leftAccessorySource={ic_digital_cast_sheet}
              leftAccessoryResizeMode="center"
              disabled
            />
            <Button
              style={[styles.button, { marginTop: 4 }]}
              textStyle={styles.buttonText}
              leftAccessoryImageStyle={styles.buttonLeftAccessoryImage}
              text={t('views.welcome.searchable_profile')}
              description={t('views.profile.searchable_profile_description')}
              leftAccessorySource={ic_searchable_profile}
              leftAccessoryResizeMode="center"
              disabled
            />
          </View>
        )}
      </Translation>
    );
  };

  renderUpgradeAccountButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Button
            style={styles.upgradeAccountButton}
            text={t('app.upgrade_account')}
            onPress={() => {
              Router.push(props, 'SignUpStackNavigator', 'ProfilePictureSelectionView');
            }}
          />
        )}
      </Translation>
    );
  };

  renderViewerSection = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.viewer}>
            {this.renderImageBackground()}
            {this.renderTitleContainer()}
            {this.renderDescriptionContainer()}
            {this.renderButtonContainer()}
            {this.renderUpgradeAccountButton()}
          </View>
        )}
      </Translation>
    );
  };

  renderItem = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    switch (section.index) {
      case 0:
        return this.renderProfileInfoView(params);

      case 1:
        return this.renderViewerSection(params);

      default:
        break;
    }
  };

  renderProfilePreviewView = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <ProfilePreviewView
            innerRef={(ref) => {
              if (!ref) {
                return;
              }
              props.setListRef(1, props.navigation.getState().index, ref);
            }}
            index={props.index}
            profile={props.userProfile}
            onPress={(index) => {
              props.setIndex(index);
            }}
            onPressEditProfile={() => {
              // Router.dispatch(props, [{ name: 'SettingsStackNavigator' }])
              props.setIsLoggedIn(true);
              props.setNavigator('ProfileStackNavigator')
              Router.push(props, 'ProfileCastSheetEditionView')
            }}
          />
        )}
      </Translation>
    );
  };

  renderViewerView = () => {
    const { props } = this;

    let sections = [
      {
        title: i18n.t(''),
        data: [''],
      },
      {
        title: i18n.t(''),
        data: [''],
      },
    ];

    return (
      <Translation>
        {(t) => (
          <List
            innerRef={(ref) => {
              if (!ref) {
                return;
              }

              props.setListRef(1, props.navigation.getState().index, ref);
            }}
            contentContainerStyle={styles.listContentContainer}
            sections={sections}
            renderItem={this.renderItem}
          />
        )}
      </Translation>
    );
  };

  renderBody = () => {
    const { props } = this;

    const children = props.userProfile
      ?
      this.renderProfilePreviewView()
      :
      this.renderViewerView();

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}
            scrollable={false}
          >
            {children}
          </Body>
        )}
      </Translation>
    );
  };

  renderFooter = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Footer style={styles.footer} />
        )}
      </Translation>
    );
  };

  render() {
    return (
      <Translation>
        {(t) => (
          <Root style={styles.root}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          </Root>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.colors.background.primary,
  },
  header: {
    // backgroundColor: "#f00",
  },
  body: {
    // backgroundColor: '#0f0',
  },
  viewer: {
    // backgroundColor: '#0f0',
    // justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  imageBackground: {
    // backgroundColor: '#f00',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 230 / 393,
  },
  titleContainer: {
    // backgroundColor: '#f00',
    alignItems: 'center',
    marginVertical: 48,
    marginBottom: 16,
  },
  title: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 36,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 8,
    textTransform: 'uppercase',
  },
  descriptionContainer: {
    // backgroundColor: '#ff0',
    alignItems: 'center',
    marginVertical: 16,
  },
  descriptionText1: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 17,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1,
  },
  descriptionText2: {
    // backgroundColor: '#00f',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1,
    textAlign: 'center',
    marginHorizontal: 80,
  },
  buttonContainer: {
    // backgroundColor: '#f00',
    marginTop: 8,
    marginBottom: 32,
  },
  button: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.general.transparent,
  },
  buttonText: {
    // color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
  },
  buttonLeftAccessoryImage: {
    flex: 1,
    aspectRatio: 1,
  },
  upgradeAccountButton: {
    marginTop: 16,
  },
  listContentContainer: {
    paddingHorizontal: 0,
    paddingBottom: 12,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    index: state.profileViewReducer.index,
    userProfile: state.dataReducer.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setIndex: (...args) => dispatch(ProfileViewAction.setIndex(...args)),
    setListRef: (...args) => dispatch(MainTabNavigatorAction.setListRef(...args)),
    setIsLoggedIn: (...args) => dispatch(DataAction.setIsLoggedIn(...args)),
    setNavigator: (...args) => dispatch(ProfileCastSheetEditionViewAction.setNavigator(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
