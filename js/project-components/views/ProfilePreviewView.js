/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Platform,
  Dimensions,
  ImageBackground,
  View,
  Text,
} from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';
import { ProfilePreviewViewAction, MainTabNavigatorAction } from '../../redux';

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

import { ProfileProcessor } from '../../processors';

import {
  CastSheetConstants,
} from '../../constants';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_light_background = require('../../../assets/images/ic_light_background/ic_light_background.png');

const ic_digital_cast_sheet = require('../../../assets/images/ic_digital_cast_sheet/ic_digital_cast_sheet.png');
const ic_searchable_profile = require('../../../assets/images/ic_searchable_profile/ic_searchable_profile.png');

class ProfilePreviewView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  fetchData = () => {
    const { props } = this;

    console.log('[index]', props.index);
    console.log('[profile]', props.profile);

    let data = [];

    if (props.profile) {
      switch (props.index) {
        case 0:
        {
          data = [
            {
              title: i18n.t(`app.${CastSheetConstants.CAST_SHEET_CATEGORY_KEY_BASIC_INFORMATION}`),
              data: CastSheetConstants.CAST_SHEET_INFO.filter((info) => {
                return info.name === CastSheetConstants.CAST_SHEET_CATEGORY_KEY_BASIC_INFORMATION;
              })[0].keys.map((key) => {
                return {
                  title: i18n.t(`app.${key.name}`),
                  data: ProfileProcessor.fetchProfilePropertyData(
                    CastSheetConstants.CAST_SHEET_CATEGORY_KEY_BASIC_INFORMATION,
                    key.name,
                    props.profile,
                  ),
                };
              }),
            },
          ];
        }
          break;

        case 1:
        {
          data = [
            {
              title: i18n.t(`app.${CastSheetConstants.CAST_SHEET_CATEGORY_KEY_APPEARANCE}`),
              data: CastSheetConstants.CAST_SHEET_INFO.filter((info) => {
                return info.name === CastSheetConstants.CAST_SHEET_CATEGORY_KEY_APPEARANCE;
              })[0].keys.map((key) => {
                return {
                  title: i18n.t(`app.${key.name}`),
                  data: ProfileProcessor.fetchProfilePropertyData(
                    CastSheetConstants.CAST_SHEET_CATEGORY_KEY_APPEARANCE,
                    key.name,
                    props.profile,
                  ),
                };
              }),
            },
          ];
        }
          break;

        case 2:
        {
          data = [
            {
              title: i18n.t(`app.${CastSheetConstants.CAST_SHEET_CATEGORY_KEY_EXPERIENCE}`),
              data: CastSheetConstants.CAST_SHEET_INFO.filter((info) => {
                return info.name === CastSheetConstants.CAST_SHEET_CATEGORY_KEY_EXPERIENCE;
              })[0].keys.map((key) => {
                return {
                  title: i18n.t(`app.${key.name}`),
                  data: ProfileProcessor.fetchProfilePropertyData(
                    CastSheetConstants.CAST_SHEET_CATEGORY_KEY_EXPERIENCE,
                    key.name,
                    props.profile,
                  ),
                };
              }),
            },
          ];
        }
          break;

        case 3:
        {
          data = [
            {
              title: i18n.t(`app.${CastSheetConstants.CAST_SHEET_CATEGORY_KEY_CONTACTS}`),
              data: CastSheetConstants.CAST_SHEET_INFO.filter((info) => {
                return info.name === CastSheetConstants.CAST_SHEET_CATEGORY_KEY_CONTACTS;
              })[0].keys.map((key) => {
                return {
                  title: i18n.t(`app.${key.name}`),
                  data: ProfileProcessor.fetchProfilePropertyData(
                    CastSheetConstants.CAST_SHEET_CATEGORY_KEY_CONTACTS,
                    key.name,
                    props.profile,
                  ),
                };
              }),
            },
          ];
        }
          break;

        case 4:
        {
          data = [
            {
              title: i18n.t(`app.${CastSheetConstants.CAST_SHEET_CATEGORY_KEY_SOCIAL_MEDIAS}`),
              data: CastSheetConstants.CAST_SHEET_INFO.filter((info) => {
                return info.name === CastSheetConstants.CAST_SHEET_CATEGORY_KEY_SOCIAL_MEDIAS;
              })[0].keys.map((key) => {
                return {
                  title: i18n.t(`app.${key.name}`),
                  data: ProfileProcessor.fetchProfilePropertyData(
                    CastSheetConstants.CAST_SHEET_CATEGORY_KEY_SOCIAL_MEDIAS,
                    key.name,
                    props.profile,
                  ),
                };
              }),
            },
          ];
        }
          break;

        default:
            break;
      }
    }

    return data;
  }

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
            source={props.source}
            profile={props.profile}
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
            {this.renderButtonContainer()}
            {this.renderUpgradeAccountButton()}
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
          <SegmentedControl
            index={props.index}
            onPress={props.onPress}
          />
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
            data={this.fetchData()}
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
  };

  renderBody = () => {
    const { props } = this;

    let sections = [];

    let androidRefreshControlColor = undefined;
    let iosRefreshControlColor = undefined;
    let refreshing = undefined;
    let onRefresh= undefined;

    if (props.profile) {
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
              innerRef={props.innerRef}
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
    const { props } = this;

    if (props.hidden) {
      return null;
    }

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
  listContentContainer: {
    paddingHorizontal: 0,
    paddingBottom: 12,
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
  footer: {
    // backgroundColor: '#f00',
  },
});

ProfilePreviewView.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  innerRef: PropTypes.func,
  index: PropTypes.number,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  profile: PropTypes.object,
  onPress: PropTypes.func,
};

ProfilePreviewView.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  innerRef: undefined,
  index: undefined,
  source: undefined,
  profile: undefined,
  onPress: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(ProfilePreviewViewAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePreviewView);
