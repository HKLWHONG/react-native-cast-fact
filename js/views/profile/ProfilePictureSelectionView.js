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
  Alert,
} from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  ProfilePictureSelectionViewAction,
  SignUpStackNavigatorAction,
  SettingsStackNavigatorAction,
  ProfileInfoSetupViewAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  SingleTouch,
  Image,
} from '../../components';

import {
  Button,
  ProfileInfoSetupView,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import {
  UserProvider,
} from '../../providers';

import { Camera } from 'react-native-vision-camera';

import ImagePicker from 'react-native-image-crop-picker';

import { Environment } from '../../config';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_light_background = require('../../../assets/images/ic_light_background/ic_light_background.png');

const ic_photo = require('../../../assets/images/ic_photo/ic_photo.png');
const ic_camera = require('../../../assets/images/ic_camera/ic_camera.png');

export const IDENTIFIER = 'ProfilePictureSelectionView';

class ProfilePictureSelectionView extends BaseComponent {
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

    if (props.userProfile) {
      let source = undefined;

      if (
        props.userProfile
        &&
        props.userProfile.images
        &&
        props.userProfile.images.length > 0
      ) {
        source = { uri: `${Environment.API_URL}${props.userProfile.images[props.userProfile.images.length - 1]}` };

      }
      props.setProfileInfoSetupViewSource(source);
      props.setProfileInfoSetupViewFirstnameEn(props.userProfile.firstname_en);
      props.setProfileInfoSetupViewLastnameEn(props.userProfile.lastname_en);
      props.setProfileInfoSetupViewFirstnameZh(props.userProfile.firstname_zh);
      props.setProfileInfoSetupViewLastnameZh(props.userProfile.lastname_zh);
      props.setProfileInfoSetupViewNickname(props.userProfile.nickname);

      let nameDisplayFormat = 0;

      if (props.userProfile.name_display_format && props.userProfile.name_display_format.length > 0) {
        nameDisplayFormat = parseInt(props.userProfile.name_display_format);
      }

      props.setProfileInfoSetupViewDisplayFormat(nameDisplayFormat);

      if (props.accountRedeem.redeem) {
        props.addSignUpStackNavigatorOnScreenAppear(IDENTIFIER, () => {
          props.setSignUpStackNavigatorEnabledRight(true);
        });

        props.addSignUpStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
          if (
            store.getState().profileInfoSetupViewReducer.source
            &&
            store.getState().profileInfoSetupViewReducer.source.photo
            &&
            store.getState().profileInfoSetupViewReducer.source.photo.path
            &&
            store.getState().profileInfoSetupViewReducer.source.photo.mime
          ) {
            UserProvider.uploadProfileImage(
              props,
              {
                key: 'image_path',
                uri: 'file://' + store.getState().profileInfoSetupViewReducer.source.photo.path,
                type: store.getState().profileInfoSetupViewReducer.source.photo.mime,
              },
            )
              .then((params) => {

                Router.push(props, 'ProfileNameEditionView');
              })
              .catch((error) => {
                console.error(error);

                Alert.alert(i18n.t('app.system_error'), i18n.t('app.error.image_upload_message'));
              });
          } else {
            Router.push(props, 'ProfileNameEditionView');
          }
        });

        props.setProfileInfoSetupViewNumberOfIndicators(3);
      } else {
        props.addSettingsStackNavigatorOnScreenAppear(IDENTIFIER, () => {
          props.setSettingsStackNavigatorEnabledRight(true);
        });

        props.addSettingsStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
          if (
            store.getState().profileInfoSetupViewReducer.source
            &&
            store.getState().profileInfoSetupViewReducer.source.photo
            &&
            store.getState().profileInfoSetupViewReducer.source.photo.path
            &&
            store.getState().profileInfoSetupViewReducer.source.photo.mime
          ) {
            UserProvider.uploadProfileImage(
              props,
              {
                key: 'image_path',
                uri: 'file://' + store.getState().profileInfoSetupViewReducer.source.photo.path,
                type: store.getState().profileInfoSetupViewReducer.source.photo.mime,
              },
            )
              .then((params) => {

                Router.popToTop(props);
              })
              .catch((error) => {
                console.error(error);

                Alert.alert(i18n.t('app.system_error'), i18n.t('app.error.image_upload_message'));
              });
          }
        });

        props.setProfileInfoSetupViewNumberOfIndicators(0);
      }

    } else {
      props.setSignUpStackNavigatorHiddenRight(false);

      props.addSignUpStackNavigatorOnScreenAppear(IDENTIFIER, () => {
        props.setSignUpStackNavigatorEnabledRight(true);
      });

      props.addSignUpStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
        Router.push(props, 'ProfileNameEditionView');
      });

      props.setProfileInfoSetupViewNumberOfIndicators(3);
    }
  };

  clearData = () => {
    const { props } = this;

    props.setProfileInfoSetupViewSource(undefined);
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

  renderProfileContainer = () => {
    const { props } = this;

    let source = undefined;

    if (
      props.userProfile
      &&
      props.userProfile.images
      &&
      props.userProfile.images.length > 0
    ) {
      source = { uri: `${Environment.API_URL}${props.userProfile.images[props.userProfile.images.length - 1]}` };
    }

    return (
      <Translation>
        {(t) => (
          <ProfileInfoSetupView
            index={0}
            text={t('views.profile_picture_selection.title')}
            source={source}
          />
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
              {t('views.sign_up_account_type_selection.subtitle')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderSelectionButtonContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.selectionButtonContainer}>
            <Button
              style={styles.selectionButton}
              buttonStyle={styles.selectionButtonButton}
              imageStyle={styles.selectionButtonImage}
              textStyle={styles.selectionButtonText}
              source={ic_camera}
              resizeMode="center"
              text={t('app.camera')}
              onPress={() => {
                Router.push(props, 'CameraStackNavigator');
              }}
            />
            <Button
              style={styles.selectionButton}
              buttonStyle={styles.selectionButtonButton}
              imageStyle={styles.selectionButtonImage}
              textStyle={styles.selectionButtonText}
              source={ic_photo}
              resizeMode="center"
              text={t('app.photos')}
              onPress={async () => {
                const photo = await ImagePicker.openPicker({
                  width: 300,
                  height: 300,
                  cropping: true
                })
                  .catch((error) => {
                    console.error(error);

                    if (error.toString().toLowerCase() === 'Error: User did not grant library permission.'.toLowerCase()) {
                      Alert.alert(
                        'Library Permission',
                        'Please grant the library permission.',
                        [{
                          text: i18n.t('app.ok').toUpperCase(),
                          onPress: () => { },
                        }],
                      );
                    }
                  });

                if (photo && photo.path) {
                  props.setProfileInfoSetupViewSource({
                    uri: 'file://' + photo.path,
                    photo: photo,
                  });
                }
              }}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body style={styles.body}>
            {this.renderImageBackground()}
            {this.renderProfileContainer()}
            {this.renderSubtitleContainer()}
            {this.renderSelectionButtonContainer()}
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
          <Footer style={styles.footer}>
            <View style={styles.infoContainer}>
              <Text style={styles.for}>
                {t('app.for')}
              </Text>
              <Text style={styles.email}>
                {props.signUpViewAccount.credentials.email}
              </Text>
            </View>
          </Footer>
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Root
            style={styles.root}
            safeArea={false}
            resizeMode="stretch"
            keyboardDismissing
          >
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
    // justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 16,
  },
  imageBackground: {
    // backgroundColor: '#f00',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 230 / 393,
  },
  subtitleContainer: {
    // backgroundColor: '#0ff',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 8,
  },
  subtitle: {
    // backgroundColor: '#00f',
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.7,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginHorizontal: 64,
  },
  selectionButtonContainer: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
    marginTop: 16,
  },
  selectionButton: {
    flex: 1,
    aspectRatio: 1,
    marginHorizontal: 8,
  },
  selectionButtonButton: {
    flex: 1,
  },
  selectionButtonImage: {
    width: 60,
    height: 60,
  },
  selectionButtonText: {
    marginTop: 16,
  },
  footer: {
    // backgroundColor: '#f00',
  },
  infoContainer: {
    // backgroundColor: '#f0f',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 64,
  },
  for: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1,
  },
  email: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
  },
});

function mapStateToProps(state) {
  return {
    signUpViewAccount: state.signUpViewReducer.account,
    userProfile: state.dataReducer.userProfile,
    accountRedeem: state.signUpViewReducer.accountRedeem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSignUpStackNavigatorHiddenRight: (...args) => dispatch(SignUpStackNavigatorAction.setHiddenRight(...args)),
    setSignUpStackNavigatorEnabledRight: (...args) => dispatch(SignUpStackNavigatorAction.setEnabledRight(...args)),
    addSignUpStackNavigatorOnScreenAppear: (...args) => dispatch(SignUpStackNavigatorAction.addOnScreenAppear(...args)),
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
    addSettingsStackNavigatorOnScreenAppear: (...args) => dispatch(SettingsStackNavigatorAction.addOnScreenAppear(...args)),
    setSettingsStackNavigatorEnabledRight: (...args) => dispatch(SettingsStackNavigatorAction.setEnabledRight(...args)),
    addSettingsStackNavigatorOnRightButtonPress: (...args) => dispatch(SettingsStackNavigatorAction.addOnRightButtonPress(...args)),
    setProfileInfoSetupViewNumberOfIndicators: (...args) => dispatch(ProfileInfoSetupViewAction.setNumberOfIndicators(...args)),
    setProfileInfoSetupViewSource: (...args) => dispatch(ProfileInfoSetupViewAction.setSource(...args)),
    setProfileInfoSetupViewFirstnameEn: (...args) => dispatch(ProfileInfoSetupViewAction.setFirstnameEn(...args)),
    setProfileInfoSetupViewLastnameEn: (...args) => dispatch(ProfileInfoSetupViewAction.setLastnameEn(...args)),
    setProfileInfoSetupViewFirstnameZh: (...args) => dispatch(ProfileInfoSetupViewAction.setFirstnameZh(...args)),
    setProfileInfoSetupViewLastnameZh: (...args) => dispatch(ProfileInfoSetupViewAction.setLastnameZh(...args)),
    setProfileInfoSetupViewNickname: (...args) => dispatch(ProfileInfoSetupViewAction.setNickname(...args)),
    setProfileInfoSetupViewDisplayFormat: (...args) => dispatch(ProfileInfoSetupViewAction.setDisplayFormat(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePictureSelectionView);
