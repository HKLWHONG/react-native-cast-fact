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
import { LoginAction } from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  SingleTouch,
} from '../../components';

import {
  Button,
  Separator,
  TextInput,
} from '../../project-components';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import { TestApi } from '../../apis';

// const background = require('../../../assets/images/project_background.png');

class LoginView extends BaseComponent {
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

    props.setLoginId(undefined);
    props.setLoginIdMessage(undefined);
    props.setPassword(undefined);
    props.setPasswordMessage(undefined);
  };

  validateLoginId = () => {
    const { props } = this;

    let isValid = false;

    // if (
    //   !props.credentials.loginId ||
    //   !AppRegex.EMPTY_FIELD_REGEX.test(props.credentials.loginId)
    // ) {
    //   props.setLoginIdMessage('app.error.empty_field_message');
    //
    //   isValid = false;
    // } else {
      props.setLoginIdMessage(undefined);

      isValid = true;
    // }

    return isValid;
  };

  validatePassword = () => {
    const { props } = this;

    let isValid = false;

    // if (
    //   !props.credentials.password ||
    //   !AppRegex.EMPTY_FIELD_REGEX.test(props.credentials.password)
    // ) {
    //   props.setPasswordMessage('app.error.empty_field_message');
    //
    //   isValid = false;
    // } else if (
    //   !AppRegex.CREDENTIALS_PASSWORD_VALIDATION_REGEX.test(
    //     props.credentials.password,
    //   )
    // ) {
    //   props.setPasswordMessage('app.error.password_validation_message');
    //
    //   isValid = false;
    // } else {
      props.setPasswordMessage(undefined);

      isValid = true;
    // }

    return isValid;
  };

  validateAll = () => {
    const isValidLoginId = this.validateLoginId();
    const isValidPassword = this.validatePassword();

    return isValidLoginId && isValidPassword;
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

  renderTextInputs = () => {
    const { props } = this;

    const secureTextEntry =
      Platform.OS === 'ios' ||
      (props.credentials.password && props.credentials.password.length > 0)
        ? true
        : false;

    return (
      <Translation>
        {(t) => (
          <View>
            <TextInput
              style={styles.textInput}
              label={t('views.login.login_id_label')}
              value={props.credentials.loginId}
              message={t(props.credentials.loginIdMessage)}
              onChangeText={(text) => {
                props.setLoginId(text).then(this.validateLoginId);
              }}
            />
            <TextInput
              style={styles.textInput}
              label={t('views.login.password_label')}
              value={props.credentials.password}
              secureTextEntry={secureTextEntry}
              message={t(props.credentials.passwordMessage)}
              onChangeText={(text) => {
                props.setPassword(text).then(this.validatePassword);
              }}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderLoginButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Button
            text={t('app.login')}
            onPress={() => {
              // TestApi.request(
              //   props,
              //   {},
              //   {},
              // )
              //   .then((json) => {
                  Router.route(props, 'Main');
              //   })
              //   .catch((error) => {
              //     reject(error);
              //   });
            }}
          />
        )}
      </Translation>
    );
  };

  renderSeparator = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Separator style={styles.separator} text={t('OR')} />
        )}
      </Translation>
    );
  }

  renderOtherLoginButtons = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.otherLoginButtonContainer}>
            <Button style={styles.otherLoginButton} />
            <Button style={styles.otherLoginButton} />
            <Button style={styles.otherLoginButton} />
          </View>
        )}
      </Translation>
    );
  }

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}>
            {this.renderTextInputs()}
            {this.renderLoginButton()}
            {this.renderSeparator()}
            {this.renderOtherLoginButtons()}
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
            <SingleTouch
              style={styles.createAccountContainer}
              activeOpacity={0.7}
              onPress={() => {}}>
              <View style={styles.createAccountSubContainer}>
                <Text
                  style={styles.createAccountHint}>
                  {t('views.login.create_account_hint')}
                </Text>
                <Text
                  style={styles.createAccount}>
                  {t('views.login.create_account')}
                </Text>
              </View>
            </SingleTouch>
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
            keyboardDismissing>
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
    alignItems: 'center',
    // height: 200,
  },
  body: {
    // backgroundColor: '#00FF00',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 32,
    paddingTop: 200,
  },
  textInput: {
    marginBottom: 8,
  },
  separator: {
    marginVertical: 32,
  },
  otherLoginButtonContainer: {
    // backgroundColor: '#0f0',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  otherLoginButton: {
    width: 60,
    height: 60,
  },
  footer: {
    // backgroundColor: '#f00',
  },
  createAccountContainer: {
    // backgroundColor: '#f00',
  },
  createAccountSubContainer: {
    backgroundColor: Theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 64,
  },
  createAccountHint: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.7,
    marginVertical: 8,
  },
  createAccount: {
    color: Theme.colors.general.white,
    fontSize: 17,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginVertical: 8,
  },
});

function mapStateToProps(state) {
  return {
    credentials: state.loginReducer.credentials,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoginId: (...args) => dispatch(LoginAction.setLoginId(...args)),
    setLoginIdMessage: (...args) =>
      dispatch(LoginAction.setLoginIdMessage(...args)),
    setPassword: (...args) => dispatch(LoginAction.setPassword(...args)),
    setPasswordMessage: (...args) =>
      dispatch(LoginAction.setPasswordMessage(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
