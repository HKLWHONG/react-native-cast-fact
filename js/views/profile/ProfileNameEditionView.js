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
import {
  store,
  ProfileNameEditionViewAction,
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
  ProfileInfoSetupView,
  TextInput,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import { ProfileProcessor } from '../../processors';

import { Environment } from '../../config';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_light_background = require('../../../assets/images/ic_light_background/ic_light_background.png');

const preview = require('../../../assets/images/preview/preview.png');

export const IDENTIFIER = 'ProfileNameEditionView';

class ProfileNameEditionView extends BaseComponent {
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
          this.validateAll();
        });

        props.addSignUpStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
          Router.push(props, 'ProfileNameDisplaySelectionView');
        });
      } else {
        props.addSettingsStackNavigatorOnScreenAppear(IDENTIFIER, () => {
          // props.setProfileInfoSetupViewDisplayFormat(undefined);

          this.validateAll();
        });

        props.addSettingsStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
          // props.setProfileInfoSetupViewFirstnameEn('Tai Man');
          // props.setProfileInfoSetupViewLastnameEn('Chan');
          // props.setProfileInfoSetupViewFirstnameZh('大文');
          // props.setProfileInfoSetupViewLastnameZh('陳');
          // props.setProfileInfoSetupViewNickname('別名');

          Router.push(props, 'ProfileNameDisplaySelectionView');
        });

        props.setProfileInfoSetupViewNumberOfIndicators(2);
      }

    } else {
      props.addSignUpStackNavigatorOnScreenAppear(IDENTIFIER, () => {
        props.setProfileInfoSetupViewDisplayFormat(undefined);

        this.validateAll();
      });

      props.addSignUpStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
        // props.setProfileInfoSetupViewFirstnameEn('Tai Man');
        // props.setProfileInfoSetupViewLastnameEn('Chan');
        // props.setProfileInfoSetupViewFirstnameZh('大文');
        // props.setProfileInfoSetupViewLastnameZh('陳');
        // props.setProfileInfoSetupViewNickname('別名');

        Router.push(props, 'ProfileNameDisplaySelectionView');
      });
    }

    if (
      props.refs['FirstnameTextField']
      &&
      !props.refs['FirstnameTextField'].isFocused()
    ) {
      props.refs['FirstnameTextField'].focus();
    }
  };

  clearData = () => {
    const { props } = this;

    props.setProfileInfoSetupViewFirstnameEn(undefined);
    props.setProfileInfoSetupViewLastnameEn(undefined);
    props.setProfileInfoSetupViewFirstnameZh(undefined);
    props.setProfileInfoSetupViewLastnameZh(undefined);
    props.setProfileInfoSetupViewNickname(undefined);
  };

  validateAll = () => {
    const { props } = this;

    const { account } = store.getState().profileInfoSetupViewReducer;

    const setStackNavigatorEnabledRight = props.userProfile
      ?
      props.accountRedeem.redeem ? props.setSignUpStackNavigatorEnabledRight : props.setSettingsStackNavigatorEnabledRight
      :
      props.setSignUpStackNavigatorEnabledRight;

    const isValid_0 = ProfileProcessor.validateNameDisplayFormat_0();
    const isValid_1 = ProfileProcessor.validateNameDisplayFormat_1();
    const isValid_2 = ProfileProcessor.validateNameDisplayFormat_2();
    const isValid_3 = ProfileProcessor.validateNameDisplayFormat_3();

    setStackNavigatorEnabledRight(isValid_0 || isValid_1 || isValid_2 || isValid_3);
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

    const index = props.userProfile ? 0 : 1;

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
            index={index}
            text={t('views.profile_name_edition.title')}
            source={source}
          />
        )}
      </Translation>
    );
  };

  renderTextInputsContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.textInputsContainer}>
            <View style={styles.nameContainer}>
              <TextInput
                innerRef={(ref) => {
                  if (!ref) {
                    return;
                  }

                  props.addRef('FirstnameTextField', ref);
                }}
                style={[styles.textInput, { marginRight: 8 }]}
                label={t('app.firstname_en')}
                value={props.profileInfoSetupViewAccount.info.firstnameEn}
                onChangeText={(text) => {
                  props.setProfileInfoSetupViewFirstnameEn(text);

                  this.validateAll();
                }}
              />
              <TextInput
                style={[styles.textInput, { marginLeft: 8 }]}
                label={t('app.lastname_en')}
                value={props.profileInfoSetupViewAccount.info.lastnameEn}
                onChangeText={(text) => {
                  props.setProfileInfoSetupViewLastnameEn(text);

                  this.validateAll();
                }}
              />
            </View>
            <View style={styles.nameContainer}>
              <TextInput
                style={[styles.textInput, { marginRight: 8 }]}
                label={t('app.lastname_zh')}
                value={props.profileInfoSetupViewAccount.info.firstnameZh}
                onChangeText={(text) => {
                  props.setProfileInfoSetupViewFirstnameZh(text);

                  this.validateAll();
                }}
              />
              <TextInput
                style={[styles.textInput, { marginLeft: 8 }]}
                label={t('app.firstname_zh')}
                value={props.profileInfoSetupViewAccount.info.lastnameZh}
                onChangeText={(text) => {
                  props.setProfileInfoSetupViewLastnameZh(text);

                  this.validateAll();
                }}
              />
            </View>
            <TextInput
              style={styles.textInput}
              label={t('app.nickname')}
              value={props.profileInfoSetupViewAccount.info.nickname}
              onChangeText={(text) => {
                props.setProfileInfoSetupViewNickname(text);

                this.validateAll();
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
            {this.renderTextInputsContainer()}
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
  },
  imageBackground: {
    // backgroundColor: '#f00',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 230 / 393,
  },
  textInputsContainer: {
    // backgroundColor: '#0f0',
    marginVertical: 32,
  },
  nameContainer: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginBottom: 8,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    refs: state.profileNameEditionViewReducer.refs,
    profileInfoSetupViewAccount: state.profileInfoSetupViewReducer.account,
    userProfile: state.dataReducer.userProfile,
    accountRedeem: state.signUpViewReducer.accountRedeem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addRef: (...args) => dispatch(ProfileNameEditionViewAction.addRef(...args)),
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNameEditionView);
