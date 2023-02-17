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
  AccountChangePasswordStep1ViewAction,
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

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import { TestApi } from '../../apis';

const ic_header_bg = require('../../../assets/images/ic_header_bg/ic_header_bg.png');

const preview = require('../../../assets/images/preview/preview.png');

class AccountChangePasswordStep1View extends BaseComponent {
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

    if (
      props.refs['PasswordTextField']
      &&
      !props.refs['PasswordTextField'].isFocused()
    ) {
      props.refs['PasswordTextField'].focus();
    }
  };

  clearData = () => {
    const { props } = this;

    // props.reset();
  };

  validatePassword = () => {
    const { props } = this;

    let isValid = false;

    if (
      !props.account.credentials.password
      ||
      !AppRegex.EMPTY_FIELD_REGEX.test(props.account.credentials.password)
    ) {
      // props.setPasswordMessage('app.error.empty_field_message');

      isValid = false;
    } else if (
      !AppRegex.CREDENTIALS_PASSWORD_VALIDATION_REGEX.test(
        props.account.credentials.password,
      )
    ) {
      // props.setPasswordMessage('app.error.password_validation_message');

      isValid = false;
    } else {
      // props.setPasswordMessage(undefined);

      isValid = true;
    }

    return isValid;
  };

  // validateAll = () => {
  //   const isValidName = this.validateName();
  //   const isValidEmail = this.validateEmail();
  //   const isValidPhone = this.validatePhone();
  //   const isValidPassword = this.validatePassword();
  //
  //   return isValidName && isValidEmail && isValidPhone && isValidPassword;
  // };

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
            index={0}
            numberOfIndicators={2}
            text={t('views.account_change_password_step1.title')}
          />
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

                props.addRef('PasswordTextField', ref);
              }}
              style={styles.textInput}
              label={t('views.account_change_password_step1.current_password')}
              value={props.account.credentials.password}
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => {
                props.setPassword(text);
              }}
            />
            <View style={styles.hintsContainer}>
              <View style={styles.hintsSubContainer}>
                <View style={styles.hints}>
                  <Image
                    style={styles.hintsImage}
                    source={preview}
                    resizeMode="center"
                  />
                  <Text style={styles.hintsText}>
                    {t('12 characters length')}
                  </Text>
                </View>
                <View style={styles.hints}>
                  <Image
                    style={styles.hintsImage}
                    source={preview}
                    resizeMode="center"
                  />
                  <Text style={styles.hintsText}>
                    {t('1 symbol')}
                  </Text>
                </View>
              </View>
              <View style={styles.hintsSubContainer}>
                <View style={styles.hints}>
                  <Image
                    style={styles.hintsImage}
                    source={preview}
                    resizeMode="center"
                  />
                  <Text style={styles.hintsText}>
                    {t('1 lower case')}
                  </Text>
                </View>
                <View style={styles.hints}>
                  <Dot style={styles.hintsDot}/>
                  <Text style={styles.hintsText}>
                    {t('1 upper case')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </Translation>
    );
  };

  renderDescriptionView = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View>
            <Text style={styles.description}>
              {t('views.account_change_password_step1.description')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderNextButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Button
            style={styles.nextButton}
            text={t('app.next')}
            onPress={() => {
              Router.push(props, 'AccountChangePasswordStep2View');

              // console.log('[account] ', props.account);

              // if (!this.validateAll()) {
              //   return;
              // }

              // TestApi.request(
              //   props,
              //   {},
              //   {},
              // )
              //   .then(({ json }) => {
                  // Router.goBack(props);
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

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body style={styles.body}>
            {this.renderViewIndicator()}
            {this.renderTextInputs()}
            {this.renderDescriptionView()}
            {this.renderNextButton()}
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
  textInputsContainer: {
    // backgroundColor: '#f00',
    marginVertical: 32,
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
  description: {
    // backgroundColor: '#f00',
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 64,
    marginBottom: 32,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    refs: state.accountChangePasswordStep1ViewReducer.refs,
    account: state.accountChangePasswordStep1ViewReducer.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(AccountChangePasswordStep1ViewAction.reset(...args)),
    addRef: (...args) => dispatch(AccountChangePasswordStep1ViewAction.addRef(...args)),
    setPassword: (...args) => dispatch(AccountChangePasswordStep1ViewAction.setPassword(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountChangePasswordStep1View);
