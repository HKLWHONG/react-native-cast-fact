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
import { SignUpAction } from '../../redux';

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

const ic_header_bg = require('../../../assets/images/ic_header_bg/ic_header_bg.png');

class SignUpView extends BaseComponent {
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

    props.reset();
  };

  validateName = () => {
    const { props } = this;

    let isValid = false;

    if (
      !props.account.info.name
      ||
      !AppRegex.EMPTY_FIELD_REGEX.test(props.account.info.name)
    ) {
      props.setNameMessage('app.error.empty_field_message');

      isValid = false;
    } else {
      props.setNameMessage(undefined);

      isValid = true;
    }

    return isValid;
  };

  validateEmail = () => {
    const { props } = this;

    let isValid = false;

    if (
      !props.account.credentials.email
      ||
      !AppRegex.EMPTY_FIELD_REGEX.test(props.account.credentials.email)
    ) {
      props.setEmailMessage('app.error.empty_field_message');

      isValid = false;
    } else {
      props.setEmailMessage(undefined);

      isValid = true;
    }

    return isValid;
  };

  validatePhone = () => {
    const { props } = this;

    let isValid = false;

    if (
      !props.account.info.phoneCode
      ||
      !props.account.info.phoneNumber
      ||
      !AppRegex.EMPTY_FIELD_REGEX.test(props.account.info.phoneCode)
      ||
      !AppRegex.EMPTY_FIELD_REGEX.test(props.account.info.phoneNumber)
    ) {
      props.setPhoneMessage('app.error.empty_field_message');

      isValid = false;
    } else {
      props.setPhoneMessage(undefined);

      isValid = true;
    }

    return isValid;
  };

  validatePassword = () => {
    const { props } = this;

    let isValid = false;

    if (
      !props.account.credentials.password
      ||
      !AppRegex.EMPTY_FIELD_REGEX.test(props.account.credentials.password)
    ) {
      props.setPasswordMessage('app.error.empty_field_message');

      isValid = false;
    } else if (
      !AppRegex.CREDENTIALS_PASSWORD_VALIDATION_REGEX.test(
        props.account.credentials.password,
      )
    ) {
      props.setPasswordMessage('app.error.password_validation_message');

      isValid = false;
    } else {
      props.setPasswordMessage(undefined);

      isValid = true;
    }

    return isValid;
  };

  validateAll = () => {
    const isValidName = this.validateName();
    const isValidEmail = this.validateEmail();
    const isValidPhone = this.validatePhone();
    const isValidPassword = this.validatePassword();

    return isValidName && isValidEmail && isValidPhone && isValidPassword;
  };

  renderHeader = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Header
            style={styles.header}
            backgroundContainerStyle={styles.headerBackground}
            source={ic_header_bg}
            resizeMode="contain"
          >
            <Text
              style={styles.headerText}>
              {t('app.sign_up')}
            </Text>
          </Header>
        )}
      </Translation>
    );
  };

  renderTextInputs = () => {
    const { props } = this;

    const secureTextEntry =
      Platform.OS === 'ios' ||
      (props.account.credentials.password && props.account.credentials.password.length > 0)
        ? true
        : false;

    return (
      <Translation>
        {(t) => (
          <View>
            <TextInput
              style={styles.textInput}
              label={t('views.sign_up.name_label')}
              value={props.account.info.name}
              message={t(props.account.info.nameMessage)}
              onChangeText={(text) => {
                props.setName(text);
                props.setNameMessage(undefined);
              }}
            />
            <TextInput
              style={styles.textInput}
              label={t('views.sign_up.email_label')}
              value={props.account.credentials.email}
              message={t(props.account.credentials.emailMessage)}
              onChangeText={(text) => {
                props.setEmail(text);
                props.setEmailMessage(undefined);
              }}
            />
            <TextInput
              style={styles.textInput}
              label={t('views.sign_up.phone_label')}
              valueLeft={props.account.info.phoneCode}
              value={props.account.info.phone}
              keyboardType="number-pad"
              keyboardTypeLeft="number-pad"
              message={t(props.account.info.phoneMessage)}
              onChangeTextLeft={(text) => {
                props.setPhoneCode(text);
                props.setPhoneMessage(undefined);
              }}
              onChangeText={(text) => {
                props.setPhoneNumber(text);
                props.setPhoneMessage(undefined);
              }}
              enableLeftInput
            />
            <TextInput
              style={styles.textInput}
              label={t('views.sign_up.password_label')}
              value={props.account.credentials.password}
              secureTextEntry={secureTextEntry}
              message={t(props.account.credentials.passwordMessage)}
              onChangeText={(text) => {
                props.setPassword(text);
                props.setPasswordMessage(undefined);
              }}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderSignUpButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Button
            style={styles.signUpButton}
            text={t('app.sign_up')}
            onPress={() => {
              console.log('[account] ', props.account);

              // if (!this.validateAll()) {
              //   return;
              // }

              // TestApi.request(
              //   props,
              //   {},
              //   {},
              // )
              //   .then((json) => {
                  Router.goBack(props);
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

  renderTncText = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.tncContainer}>
            <View style={styles.tncSubContainer}>
              <Text style={styles.tncText}>
                {'Accept '}
              </Text>
              <SingleTouch style={styles.tncButton}>
                <Text style={styles.tncButtonText}>
                  {'Terms & Conditions'}
                </Text>
              </SingleTouch>
              <Text style={styles.tncText}>
                {' when you sign up.'}
              </Text>
            </View>
            <View style={styles.tncSubContainer}>
              <Text style={styles.tncText}>
                {'Already have account? '}
              </Text>
              <SingleTouch
                style={styles.loginButton}
                onPress={() => {
                  Router.goBack(props);
                }}>
                <Text style={styles.loginButtonText}>
                  {'Login'}
                </Text>
              </SingleTouch>
            </View>
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
          <Body
            style={styles.body}>
            {this.renderTextInputs()}
            {this.renderSignUpButton()}
            {this.renderTncText()}
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
    // backgroundColor: "rgba(255, 0, 0, 0.1)",
    height: Dimensions.get('window').height / 5,
  },
  headerBackground: {
    // backgroundColor: '#00f',
    marginTop: 27,
    marginLeft: 16,
  },
  headerText: {
    color: Theme.colors.general.white,
    fontSize: 20,
    fontFamily: Theme.fonts.light,
    letterSpacing: 2.27,
    textTransform: 'uppercase',
    marginLeft: 14,
    marginTop: 80,
  },
  body: {
    // backgroundColor: '#0f0',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  textInput: {
    marginBottom: 8,
  },
  signUpButton: {
    marginTop: 64,
  },
  tncContainer: {
    // backgroundColor: '#f00',
    paddingVertical: 28,
  },
  tncSubContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  tncText: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1,
  },
  tncButton: {},
  tncButtonText: {
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.regular,
    letterSpacing: 1,
  },
  loginButton: {},
  loginButtonText: {
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    account: state.signUpReducer.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SignUpAction.reset(...args)),
    setName: (...args) => dispatch(SignUpAction.setName(...args)),
    setNameMessage: (...args) => dispatch(SignUpAction.setNameMessage(...args)),
    setEmail: (...args) => dispatch(SignUpAction.setEmail(...args)),
    setEmailMessage: (...args) => dispatch(SignUpAction.setEmailMessage(...args)),
    setPhoneCode: (...args) => dispatch(SignUpAction.setPhoneCode(...args)),
    setPhoneNumber: (...args) => dispatch(SignUpAction.setPhoneNumber(...args)),
    setPhoneMessage: (...args) => dispatch(SignUpAction.setPhoneMessage(...args)),
    setPassword: (...args) => dispatch(SignUpAction.setPassword(...args)),
    setPasswordMessage: (...args) => dispatch(SignUpAction.setPasswordMessage(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
