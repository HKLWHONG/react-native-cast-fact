/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import {
  ProfileNameEditionViewAction,
  SignUpStackNavigatorAction,
  ProfileInfoSetupSectionAction,
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
  ProfileInfoSetupSection,
  TextInput,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

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

    props.addSignUpStackNavigatorOnRightButtonPress(this.constructor.name, () => {
      props.setProfileInfoSetupSectionFirstnameEn('Tai Man');
      props.setProfileInfoSetupSectionLastnameEn('Chan');
      props.setProfileInfoSetupSectionFirstnameZh('大文');
      props.setProfileInfoSetupSectionLastnameZh('陳');
      props.setProfileInfoSetupSectionNickname('別名');

      Router.push(props, 'ProfileNameDisplaySelectionView');
    });

    props.addSignUpStackNavigatorOnScreenAppear(this.constructor.name, () => {
      props.setProfileInfoSetupSectionDisplayFormat(undefined);
    });

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

    props.setProfileInfoSetupSectionFirstnameEn(undefined);
    props.setProfileInfoSetupSectionLastnameEn(undefined);
    props.setProfileInfoSetupSectionFirstnameZh(undefined);
    props.setProfileInfoSetupSectionLastnameZh(undefined);
    props.setProfileInfoSetupSectionNickname(undefined);
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

  renderProfileContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <ProfileInfoSetupSection
            index={1}
            text={t('views.profile_name_edition.title')}
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
                value={props.profileInfoSetupSectionAccount.info.firstnameEn}
                onChangeText={(text) => {
                  props.setProfileInfoSetupSectionFirstnameEn(text);
                }}
              />
              <TextInput
                style={[styles.textInput, { marginLeft: 8 }]}
                label={t('app.lastname_en')}
                value={props.profileInfoSetupSectionAccount.info.lastnameEn}
                onChangeText={(text) => {
                  props.setProfileInfoSetupSectionLastnameEn(text);
                }}
              />
            </View>
            <View style={styles.nameContainer}>
              <TextInput
                style={[styles.textInput, { marginRight: 8 }]}
                label={t('app.lastname_zh')}
                value={props.profileInfoSetupSectionAccount.info.firstnameZh}
                onChangeText={(text) => {
                  props.setProfileInfoSetupSectionFirstnameZh(text);
                }}
              />
              <TextInput
                style={[styles.textInput, { marginLeft: 8 }]}
                label={t('app.firstname_zh')}
                value={props.profileInfoSetupSectionAccount.info.lastnameZh}
                onChangeText={(text) => {
                  props.setProfileInfoSetupSectionLastnameZh(text);
                }}
              />
            </View>
            <TextInput
              style={styles.textInput}
              label={t('app.nickname')}
              value={props.profileInfoSetupSectionAccount.info.nickname}
              onChangeText={(text) => {
                props.setProfileInfoSetupSectionNickname(text);
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
    marginTop: 16,
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
    profileInfoSetupSectionAccount: state.profileInfoSetupSectionReducer.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addRef: (...args) => dispatch(ProfileNameEditionViewAction.addRef(...args)),
    addSignUpStackNavigatorOnScreenAppear: (...args) => dispatch(SignUpStackNavigatorAction.addOnScreenAppear(...args)),
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
    setProfileInfoSetupSectionFirstnameEn: (...args) => dispatch(ProfileInfoSetupSectionAction.setFirstnameEn(...args)),
    setProfileInfoSetupSectionLastnameEn: (...args) => dispatch(ProfileInfoSetupSectionAction.setLastnameEn(...args)),
    setProfileInfoSetupSectionFirstnameZh: (...args) => dispatch(ProfileInfoSetupSectionAction.setFirstnameZh(...args)),
    setProfileInfoSetupSectionLastnameZh: (...args) => dispatch(ProfileInfoSetupSectionAction.setLastnameZh(...args)),
    setProfileInfoSetupSectionNickname: (...args) => dispatch(ProfileInfoSetupSectionAction.setNickname(...args)),
    setProfileInfoSetupSectionDisplayFormat: (...args) => dispatch(ProfileInfoSetupSectionAction.setDisplayFormat(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNameEditionView);
