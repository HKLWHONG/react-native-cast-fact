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
  store,
  SignUpViewAction,
  SignUpStackNavigatorAction,
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
  Separator,
  TextInput,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_header_bg = require('../../../assets/images/ic_header_bg/ic_header_bg.png');

const ic_unchecked = require('../../../assets/images/ic_unchecked/ic_unchecked.png');
const ic_checked = require('../../../assets/images/ic_checked/ic_checked.png');

export const IDENTIFIER = 'SignUpView';

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

    props.setSignUpStackNavigatorHiddenRight(false);

    props.addSignUpStackNavigatorOnScreenAppearList(IDENTIFIER, () => {
      this.validateAll();
    });

    props.addSignUpStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
      Router.push(props, 'SignUpAccountTypeSelectionView');
    });

    if (
      props.refs['EmailTextField']
      &&
      !props.refs['EmailTextField'].isFocused()
    ) {
      props.refs['EmailTextField'].focus();
    }
  };

  clearData = () => {
    const { props } = this;

    props.reset();
  };

  // validateName = () => {
  //   const { props } = this;
  //
  //   let isValid = false;
  //
  //   if (
  //     !props.account.info.name
  //     ||
  //     !AppRegex.EMPTY_FIELD_REGEX.test(props.account.info.name)
  //   ) {
  //     props.setNameMessage('app.error.empty_field_message');
  //
  //     isValid = false;
  //   } else {
  //     props.setNameMessage(undefined);
  //
  //     isValid = true;
  //   }
  //
  //   return isValid;
  // };

  validateEmail = () => {
    const { props } = this;

    const { account } = store.getState().signUpViewReducer;

    let isValid = false;

    if (
      !account.credentials.email
      ||
      !AppRegex.EMPTY_FIELD_REGEX.test(account.credentials.email)
    ) {
      // props.setEmailMessage('app.error.empty_field_message');

      isValid = false;
    } else {
      // props.setEmailMessage(undefined);

      isValid = true;
    }

    return isValid;
  };

  validatePhone = () => {
    const { props } = this;

    const { account } = store.getState().signUpViewReducer;

    let isValid = false;

    if (
      !account.info.phoneCode
      ||
      !account.info.phoneNumber
      ||
      !AppRegex.EMPTY_FIELD_REGEX.test(account.info.phoneCode)
      ||
      !AppRegex.EMPTY_FIELD_REGEX.test(account.info.phoneNumber)
    ) {
      // props.setPhoneMessage('app.error.empty_field_message');

      isValid = false;
    } else {
      // props.setPhoneMessage(undefined);

      isValid = true;
    }

    return isValid;
  };

  validatePassword = () => {
    const { props } = this;

    const { account } = store.getState().signUpViewReducer;

    let isLengthValid = false;
    let isSymbolValid = false;
    let isLowerCaseValid = false;
    let isUpperCaseValid = false;

    if (
      account.credentials.password
      &&
      AppRegex.CREDENTIALS_PASSWORD_VALIDATION_LENGTH_REGEX.test(account.credentials.password)
    ) {
      isLengthValid = true;
    } else {
      isLengthValid = false;
    }

    if (
      account.credentials.password
      &&
      AppRegex.CREDENTIALS_PASSWORD_VALIDATION_SYMBOL_REGEX.test(account.credentials.password)
    ) {
      isSymbolValid = true;
    } else {
      isSymbolValid = false;
    }

    if (
      account.credentials.password
      &&
      AppRegex.CREDENTIALS_PASSWORD_VALIDATION_LOWER_CASE_REGEX.test(account.credentials.password)
    ) {
      isLowerCaseValid = true;
    } else {
      isLowerCaseValid = false;
    }

    if (
      account.credentials.password
      &&
      AppRegex.CREDENTIALS_PASSWORD_VALIDATION_UPPER_CASE_REGEX.test(account.credentials.password)
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

  validateAll = () => {
    const { props } = this;

    // const isValidName = this.validateName();
    const isValidEmail = this.validateEmail();
    const isValidPhone = this.validatePhone();
    const isValidPassword = this.validatePassword();

    props.setSignUpStackNavigatorEnabledRight(isValidEmail && isValidPhone && isValidPassword);
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
            <Text style={styles.headerText}>
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
            {
              /*
              <View style={styles.nameContainer}>
                <TextInput
                  style={[styles.textInput, { marginRight: 8 }]}
                  label={t('views.sign_up.firstname_en_label')}
                  value={props.account.info.firstnameEn}
                  onChangeText={(text) => {
                    props.setFirstnameEn(text);
                  }}
                />
                <TextInput
                  style={[styles.textInput, { marginLeft: 8 }]}
                  label={t('views.sign_up.lastname_en_label')}
                  value={props.account.info.lastnameEn}
                  onChangeText={(text) => {
                    props.setLastnameEn(text);
                  }}
                />
              </View>
              <View style={styles.nameContainer}>
                <TextInput
                  style={[styles.textInput, { marginRight: 8 }]}
                  label={t('views.sign_up.lastname_zh_label')}
                  value={props.account.info.firstnameZh}
                  onChangeText={(text) => {
                    props.setFirstnameZh(text);
                  }}
                />
                <TextInput
                  style={[styles.textInput, { marginLeft: 8 }]}
                  label={t('views.sign_up.firstname_zh_label')}
                  value={props.account.info.lastnameZh}
                  onChangeText={(text) => {
                    props.setLastnameZh(text);
                  }}
                />
              </View>
              <TextInput
                style={styles.textInput}
                label={t('views.sign_up.nickname_label')}
                value={props.account.info.nickname}
                onChangeText={(text) => {
                  props.setNickname(text);
                }}
              />
              */
            }
            <TextInput
              innerRef={(ref) => {
                if (!ref) {
                  return;
                }

                props.addRef('EmailTextField', ref);
              }}
              style={styles.textInput}
              label={t('views.sign_up.email_label')}
              value={props.account.credentials.email}
              onChangeText={(text) => {
                props.setEmail(text);

                this.validateAll();
              }}
            />
            <TextInput
              style={styles.textInput}
              label={t('views.sign_up.phone_label')}
              valueLeft={props.account.info.phoneCode}
              value={props.account.info.phoneNumber}
              keyboardType="number-pad"
              keyboardTypeLeft="number-pad"
              onChangeTextLeft={(text) => {
                props.setPhoneCode(text);

                this.validateAll();
              }}
              onChangeText={(text) => {
                props.setPhoneNumber(text);

                this.validateAll();
              }}
              enableLeftInput
            />
            <TextInput
              style={styles.textInput}
              label={t('views.sign_up.password_label')}
              value={props.account.credentials.password}
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => {
                props.setPassword(text);

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

  // renderNextButton = () => {
  //   const { props } = this;
  //
  //   return (
  //     <Translation>
  //       {(t) => (
  //         <Button
  //           style={styles.nextButton}
  //           text={t('app.next')}
  //           onPress={() => {
  //             Router.push(props, 'SignUpAccountTypeSelectionView');
  //
  //             // console.log('[account] ', props.account);
  //
  //             // if (!this.validateAll()) {
  //             //   return;
  //             // }
  //
  //             // TestApi.request(
  //             //   props,
  //             //   {},
  //             //   {},
  //             // )
  //             //   .then(({ json }) => {
  //                 // Router.goBack(props);
  //             //   })
  //             //   .catch((error) => {
  //             //     reject(error);
  //             //   });
  //           }}
  //         />
  //       )}
  //     </Translation>
  //   );
  // };

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body style={styles.body}>
            {this.renderTextInputs()}
          {/* this.renderNextButton() */}
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
    // backgroundColor: "rgba(255, 0, 0, 0.1)",
    height: Dimensions.get('window').height / 5,
  },
  headerBackground: {
    // backgroundColor: '#00f',
    marginLeft: 16,
  },
  headerText: {
    color: Theme.colors.general.white,
    fontSize: 20,
    fontFamily: Theme.fonts.light,
    letterSpacing: 2.27,
    textTransform: 'uppercase',
    marginLeft: Platform.OS === 'ios' ? 14 : 10,
    marginTop: 80,
  },
  body: {
    // backgroundColor: '#0f0',
    // justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  nameContainer: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginBottom: 8,
  },
  hintsContainer: {},
  hintsSubContainer: {
    flexDirection: 'row',
  },
  hints: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    textTransform: 'lowercase',
  },
  // nextButton: {
  //   marginTop: 64,
  // },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    refs: state.signUpViewReducer.refs,
    account: state.signUpViewReducer.account,
    validation: state.signUpViewReducer.validation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SignUpViewAction.reset(...args)),
    addRef: (...args) => dispatch(SignUpViewAction.addRef(...args)),
    // setFirstnameEn: (...args) => dispatch(SignUpViewAction.setFirstnameEn(...args)),
    // setLastnameEn: (...args) => dispatch(SignUpViewAction.setLastnameEn(...args)),
    // setFirstnameZh: (...args) => dispatch(SignUpViewAction.setFirstnameZh(...args)),
    // setLastnameZh: (...args) => dispatch(SignUpViewAction.setLastnameZh(...args)),
    // setNickname: (...args) => dispatch(SignUpViewAction.setNickname(...args)),
    setEmail: (...args) => dispatch(SignUpViewAction.setEmail(...args)),
    setPhoneCode: (...args) => dispatch(SignUpViewAction.setPhoneCode(...args)),
    setPhoneNumber: (...args) => dispatch(SignUpViewAction.setPhoneNumber(...args)),
    setPassword: (...args) => dispatch(SignUpViewAction.setPassword(...args)),
    setPasswordValidationLength: (...args) => dispatch(SignUpViewAction.setPasswordValidationLength(...args)),
    setPasswordValidationSymbol: (...args) => dispatch(SignUpViewAction.setPasswordValidationSymbol(...args)),
    setPasswordValidationLowerCase: (...args) => dispatch(SignUpViewAction.setPasswordValidationLowerCase(...args)),
    setPasswordValidationUpperCase: (...args) => dispatch(SignUpViewAction.setPasswordValidationUpperCase(...args)),
    setSignUpStackNavigatorHiddenRight: (...args) => dispatch(SignUpStackNavigatorAction.setHiddenRight(...args)),
    setSignUpStackNavigatorEnabledRight: (...args) => dispatch(SignUpStackNavigatorAction.setEnabledRight(...args)),
    addSignUpStackNavigatorOnScreenAppearList: (...args) => dispatch(SignUpStackNavigatorAction.addOnScreenAppear(...args)),
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
