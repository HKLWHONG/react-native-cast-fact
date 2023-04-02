/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  Alert,
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  AccountChangePasswordStep2ViewAction,
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
  ViewIndicator,
  Button,
  TextInput,
  Dot,
} from '../../project-components';

import { Theme, Router } from '../../utils';

import {
  AuthProvider,
} from '../../providers';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { AppRegex } from '../../regex';

const ic_header_bg = require('../../../assets/images/ic_header_bg/ic_header_bg.png');

const ic_unchecked = require('../../../assets/images/ic_unchecked/ic_unchecked.png');
const ic_checked = require('../../../assets/images/ic_checked/ic_checked.png');

export const IDENTIFIER = 'AccountChangePasswordStep2View';

class AccountChangePasswordStep2View extends BaseComponent {
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

    this.validateAll();

    if (
      props.refs['NewPasswordTextField']
      &&
      !props.refs['NewPasswordTextField'].isFocused()
    ) {
      props.refs['NewPasswordTextField'].focus();
    }
  };

  clearData = () => {
    const { props } = this;

    props.reset();
  };

  validatePassword = () => {
    const { props } = this;

    const { account } = store.getState().accountChangePasswordStep2ViewReducer;

    let isLengthValid = false;
    let isSymbolValid = false;
    let isLowerCaseValid = false;
    let isUpperCaseValid = false;

    if (
      account.credentials.newPassword
      &&
      AppRegex.CREDENTIALS_PASSWORD_VALIDATION_LENGTH_REGEX.test(account.credentials.newPassword)
    ) {
      isLengthValid = true;
    } else {
      isLengthValid = false;
    }

    if (
      account.credentials.newPassword
      &&
      AppRegex.CREDENTIALS_PASSWORD_VALIDATION_SYMBOL_REGEX.test(account.credentials.newPassword)
    ) {
      isSymbolValid = true;
    } else {
      isSymbolValid = false;
    }

    if (
      account.credentials.newPassword
      &&
      AppRegex.CREDENTIALS_PASSWORD_VALIDATION_LOWER_CASE_REGEX.test(account.credentials.newPassword)
    ) {
      isLowerCaseValid = true;
    } else {
      isLowerCaseValid = false;
    }

    if (
      account.credentials.newPassword
      &&
      AppRegex.CREDENTIALS_PASSWORD_VALIDATION_UPPER_CASE_REGEX.test(account.credentials.newPassword)
    ) {
      isUpperCaseValid = true;
    } else {
      isUpperCaseValid = false;
    }

    props.setPasswordValidationLength(isLengthValid);
    props.setPasswordValidationSymbol(isSymbolValid);
    props.setPasswordValidationLowerCase(isLowerCaseValid);
    props.setPasswordValidationUpperCase(isUpperCaseValid);

    return (
      isLengthValid
      &&
      isSymbolValid
      &&
      isLowerCaseValid
      &&
      isUpperCaseValid
    );
  };

  validateConfirmation = () => {
    const { props } = this;

    const { account } = store.getState().accountChangePasswordStep2ViewReducer;

    return (
      account.credentials.newPassword
      &&
      account.credentials.newPassword.length > 0
      &&
      account.credentials.newPassword === account.credentials.confirmation
    );
  }

  validateAll = () => {
    const { props } = this;

    const isValidPassword = this.validatePassword();
    const isValidConfirmation = this.validateConfirmation();

    return isValidPassword && isValidConfirmation;
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

  renderViewIndicator = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <ViewIndicator
            index={1}
            numberOfIndicators={2}
            text={t('views.account_change_password_step2.title')}
          />
        )}
      </Translation>
    );
  };

  renderInfoContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.infoContainer}>
            <Text style={styles.subtitle}>
              {t('views.account_change_password_step2.subtitle')}
            </Text>
            <Text style={styles.email}>
              {t('kclui@gmail.com')}
            </Text>
          </View>
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
          <View style={styles.textInputsContainer}>
            <TextInput
              innerRef={(ref) => {
                if (!ref) {
                  return;
                }

                props.addRef('NewPasswordTextField', ref);
              }}
              style={styles.textInput}
              label={t('views.account_change_password_step2.new_password')}
              value={props.account.credentials.newPassword}
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => {
                props.setNewPassword(text);

                this.validateAll();
              }}
            />
            <TextInput
              style={styles.textInput}
              label={t('views.account_change_password_step2.confirmation')}
              value={props.account.credentials.confirmation}
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => {
                props.setConfirmation(text);

                this.validateAll();
              }}
            />
            <View style={styles.hintsContainer}>
              <View style={styles.hintsSubContainer}>
                <View style={styles.hints}>
                  <Image
                    style={styles.hintsImage}
                    source={props.validation.length ? ic_checked : ic_unchecked}
                    resizeMode="center"
                  />
                  <Text style={styles.hintsText}>
                    {`12 ${t('app.characters_length')}`}
                  </Text>
                </View>
                <View style={styles.hints}>
                  <Image
                    style={styles.hintsImage}
                    source={props.validation.symbol ? ic_checked : ic_unchecked}
                    resizeMode="center"
                  />
                  <Text style={styles.hintsText}>
                    {`1 ${t('app.symbol')}`}
                  </Text>
                </View>
              </View>
              <View style={styles.hintsSubContainer}>
                <View style={styles.hints}>
                  <Image
                    style={styles.hintsImage}
                    source={props.validation.lowerCase ? ic_checked : ic_unchecked}
                    resizeMode="center"
                  />
                  <Text style={styles.hintsText}>
                    {`1 ${t('app.lower_case')}`}
                  </Text>
                </View>
                <View style={styles.hints}>
                  <Image
                    style={styles.hintsImage}
                    source={props.validation.upperCase ? ic_checked : ic_unchecked}
                    resizeMode="center"
                  />
                  <Text style={styles.hintsText}>
                    {`1 ${t('app.upper_case')}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </Translation>
    );
  };

  renderChangeButton = () => {
    const { props } = this;

    const { credentials } = props.account;
    const { length, symbol, lowerCase, upperCase } = props.validation;

    return (
      <Translation>
        {(t) => (
          <Button
            style={styles.changeButton}
            text={t('app.change')}
            onPress={() => {
              const password = store.getState().accountChangePasswordStep1ViewReducer.account.credentials.password;
              const newPassword = store.getState().accountChangePasswordStep2ViewReducer.account.credentials.newPassword;

              console.log('[password] ', password);
              console.log('[new-password] ', newPassword);

              AuthProvider.changePassword(props, {
                password: password,
                newPassword: newPassword,
              })
                .then(() => {
                  Router.popToTop(props);
                })
                .catch((error) => {
                  console.error(error);

                  Alert.alert(
                    i18n.t('app.system_error'),
                    i18n.t('app.error.general_message'),
                    [{
                      text: i18n.t('app.ok').toUpperCase(),
                    }],
                  );
                });
            }}
            disabled={
              !(length && symbol && lowerCase && upperCase)
              ||
              !(
                credentials.newPassword
                &&
                credentials.newPassword.length > 0
                &&
                credentials.newPassword === credentials.confirmation
              )
            }
          />
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
            {this.renderViewIndicator()}
            {this.renderInfoContainer()}
            {this.renderTextInputs()}
            {this.renderChangeButton()}
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
    // backgroundColor: '#0f0',
  },
  body: {
    // backgroundColor: '#0f0',
    // justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  infoContainer: {
    // backgroundColor: '#f0f',
    alignItems: 'center',
    marginVertical: 16,
  },
  subtitle: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1,
  },
  email: {
    color: Theme.colors.general.white,
    fontSize: 17,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 2,
    marginVertical: 8,
  },
  textInputsContainer: {
    // backgroundColor: '#f00',
    marginVertical: 8,
  },
  textInput: {
    flex: 1,
    marginBottom: 8,
  },
  hintsContainer: {
    // backgroundColor: '#0ff',
  },
  hintsSubContainer: {
    flexDirection: 'row',
  },
  hints: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintsDot: {
    marginRight: 8,
  },
  hintsImage: {
    // backgroundColor: '#f00',
    width: 11,
    height: 11,
    marginRight: 8,
  },
  hintsText: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1,
  },
  changeButton: {
    // marginTop: 64,
    marginVertical: 32,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    refs: state.accountChangePasswordStep2ViewReducer.refs,
    account: state.accountChangePasswordStep2ViewReducer.account,
    validation: state.accountChangePasswordStep2ViewReducer.validation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(AccountChangePasswordStep2ViewAction.reset(...args)),
    addRef: (...args) => dispatch(AccountChangePasswordStep2ViewAction.addRef(...args)),
    setNewPassword: (...args) => dispatch(AccountChangePasswordStep2ViewAction.setNewPassword(...args)),
    setConfirmation: (...args) => dispatch(AccountChangePasswordStep2ViewAction.setConfirmation(...args)),
    setPasswordValidationLength: (...args) => dispatch(AccountChangePasswordStep2ViewAction.setPasswordValidationLength(...args)),
    setPasswordValidationSymbol: (...args) => dispatch(AccountChangePasswordStep2ViewAction.setPasswordValidationSymbol(...args)),
    setPasswordValidationLowerCase: (...args) => dispatch(AccountChangePasswordStep2ViewAction.setPasswordValidationLowerCase(...args)),
    setPasswordValidationUpperCase: (...args) => dispatch(AccountChangePasswordStep2ViewAction.setPasswordValidationUpperCase(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountChangePasswordStep2View);
