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
import { ProfileViewAction, MainTabNavigatorAction } from '../../redux';

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
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

// import { TestApi } from '../../apis';

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
          <ProfileInfoView />
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
              {t('views.welcome.title')}
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
              {t('views.welcome.description_1')}
            </Text>
            <Text style={styles.descriptionText2}>
              {t('views.welcome.description_2')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderSubtitleContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              {t('views.welcome.subtitle')}
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
              description={t('views.welcome.digital_cast_sheet_description')}
              leftAccessorySource={ic_digital_cast_sheet}
              leftAccessoryResizeMode="center"
              disabled
            />
            <Button
              style={[styles.button, { marginTop: 4 }]}
              textStyle={styles.buttonText}
              leftAccessoryImageStyle={styles.buttonLeftAccessoryImage}
              text={t('views.welcome.searchable_profile')}
              description={t('views.welcome.searchable_profile_description')}
              leftAccessorySource={ic_searchable_profile}
              leftAccessoryResizeMode="center"
              disabled
            />
          </View>
        )}
      </Translation>
    );
  };

  renderCreateAccountButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Button
            style={styles.createAccountButton}
            text={t('app.create_account')}
            onPress={() => {
              // Router.push(props.slideSheetPropsList[WelcomeSlideSheetContainerView.IDENTIFIER], 'SignUpStackNavigator');
            }}
          />
        )}
      </Translation>
    );
  };

  renderViewerView = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.viewer}>
            {this.renderImageBackground()}
            {this.renderTitleContainer()}
            {this.renderDescriptionContainer()}
            {this.renderSubtitleContainer()}
            {this.renderButtonContainer()}
            {this.renderCreateAccountButton()}
          </View>
        )}
      </Translation>
    );
  };

  renderSegmentedControl = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <SegmentedControl />
        )}
      </Translation>
    );
  };

  renderProfileCastingSheetList = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <ProfileCastingSheetList
            data={[
              {
                title: 'Basic Information',
                data: [
                  {
                    title: 'Gender',
                    data: [
                      'Male',
                    ],
                  },
                  {
                    title: 'Age',
                    data: [
                      '34, 21.10.1987',
                      'born in Hong Kong',
                    ],
                  },
                  {
                    title: 'Occupation',
                    data: [
                      'Screenwriter',
                      'Director',
                      'Editor',
                    ],
                  },
                  {
                    title: 'Skills',
                    data: [
                      'Cooking',
                      'Swimming',
                      'Photography',
                    ],
                  },
                  {
                    title: 'Year Active',
                    data: [
                      '2012-present (10 years)',
                    ],
                  },
                  {
                    title: 'Working Base',
                    data: [
                      'Hong Kong',
                    ],
                  },
                  {
                    title: 'Awards',
                    data: [
                      '-',
                    ],
                  },
                  {
                    title: 'Nationality',
                    data: [
                      'Hong Kong',
                    ],
                  },
                ],
              },
              {
                title: 'Appearance',
                data: [
                  {
                    title: 'Height',
                    data: [
                      '5’5 (166cm)',
                    ],
                  },
                  {
                    title: 'Weight',
                    data: [
                      '123 lbs (56kg)',
                    ],
                  },
                  {
                    title: 'Hair',
                    data: [
                      'Black',
                    ],
                  },
                  {
                    title: 'Eyes',
                    data: [
                      'Brown',
                    ],
                  },
                ],
              },
              {
                title: 'Experience',
                data: [
                  {
                    title: 'Movies',
                    data: [
                      '5',
                    ],
                  },
                  {
                    title: 'TV Shows',
                    data: [
                      '6',
                    ],
                  },
                  {
                    title: 'Commercials',
                    data: [
                      '2',
                    ],
                  },
                  {
                    title: 'Music Videos',
                    data: [
                      '6',
                    ],
                  },
                ],
              },
              {
                title: 'Contacts',
                data: [
                  {
                    title: 'Address',
                    data: [
                      '-',
                    ],
                  },
                  {
                    title: 'Email',
                    data: [
                      '-',
                    ],
                  },
                  {
                    title: 'Phone',
                    data: [
                      '-',
                    ],
                  },
                  {
                    title: 'Agent/MGR',
                    data: [
                      '-',
                    ],
                  },
                ],
              },
            ]}
            onPressCalendar={this.onPressCalendar}
            onPressFollow={this.onPressFollow}
            onPressLike={this.onPressLike}
            onPressBookmark={this.onPressBookmark}
            onPressViewMoreText={this.onPressViewMoreText}
            onEndReached={this.onEndReached}
          />
        )}
      </Translation>
    );
  };

  renderItem = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    if (props.userProfile) {
      switch (section.index) {
        case 0:
          return this.renderProfileInfoView(params);

        case 1:
          return this.renderSegmentedControl(params);

        case 2:
          return this.renderProfileCastingSheetList(params);

        default:
          break;
      }
    } else {
      switch (section.index) {
        case 0:
          return this.renderProfileInfoView(params);

        case 1:
          return this.renderViewerView(params);

        default:
          break;
      }
    }
  };

  renderBody = () => {
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

    if (props.userProfile) {
      sections = [
        {
          title: i18n.t(''),
          data: [''],
        },
        {
          title: i18n.t(''),
          data: [''],
        },
        {
          title: i18n.t(''),
          data: [''],
        },
      ];
    }

    let androidRefreshControlColor = undefined;
    let iosRefreshControlColor = undefined;
    let refreshing = undefined;
    let onRefresh= undefined;

    if (props.userProfile) {
      androidRefreshControlColor = Theme.colors.general.black;

      iosRefreshControlColor = Theme.colors.general.white;
      
      refreshing = props.refreshing;

      onRefresh = async (refreshing) => {
        // props.setRefreshing(true);

        // props.setFeedsPagingPage(0);
        //
        // this.loadFeeds([]);

        // await FeedProvider.prefetchFeeds(props);
        //
        // props.setRefreshing(false);
      };
    }

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}
            scrollable={false}
          >
            <List
              innerRef={(ref) => {
                props.setListRef(3, props.navigation.getState().index, ref);
              }}
              contentContainerStyle={styles.listContentContainer}
              sections={sections}
              renderItem={this.renderItem}
              androidRefreshControlColor={androidRefreshControlColor}
              iosRefreshControlColor={iosRefreshControlColor}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
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
  subtitleContainer: {
    // backgroundColor: '#0ff',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 8,
  },
  subtitle: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    letterSpacing: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginHorizontal: 64,
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
  createAccountButton: {
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
    userProfile: state.dataReducer.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setListRef: (...args) => dispatch(MainTabNavigatorAction.setListRef(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
