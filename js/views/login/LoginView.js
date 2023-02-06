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
  LoginAction,
} from '../../redux';

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

import { AppRegex } from '../../regex';

import {
  Theme,
  Router,
} from '../../utils';

import {
  AuthProvider,
  SearchProvider,
  FeedProvider,
} from '../../providers';

import {
  FeedStorage,
} from '../../storages';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_header_bg = require('../../../assets/images/ic_header_bg/ic_header_bg.png');
const ic_apple= require('../../../assets/images/ic_apple/ic_apple.png');
const ic_facebook= require('../../../assets/images/ic_facebook/ic_facebook.png');
const ic_google= require('../../../assets/images/ic_google/ic_google.png');

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

    if (props.refs.EmailTextField) {
      props.refs.EmailTextField.focus();
    }

    // props.setEmail('user001@gmail.com');
    // props.setPassword('password');
  };

  clearData = () => {
    const { props } = this;

    props.reset();
  };

  validateEmail = () => {
    const { props } = this;

    let isValid = false;

    if (
      !props.credentials.email ||
      !AppRegex.EMPTY_FIELD_REGEX.test(props.credentials.email)
    ) {
      props.setEmailMessage('app.error.empty_field_message');

      isValid = false;
    } else {
      props.setEmailMessage(undefined);

      isValid = true;
    }

    return isValid;
  };

  validatePassword = () => {
    const { props } = this;

    let isValid = false;

    if (
      !props.credentials.password ||
      !AppRegex.EMPTY_FIELD_REGEX.test(props.credentials.password)
    ) {
      props.setPasswordMessage('app.error.empty_field_message');

      isValid = false;
    } else if (
      !AppRegex.CREDENTIALS_PASSWORD_VALIDATION_REGEX.test(
        props.credentials.password,
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
    const isValidEmail = this.validateEmail();
    const isValidPassword = this.validatePassword();

    return isValidEmail && isValidPassword;
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
              {t('app.login')}
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
      (props.credentials.password && props.credentials.password.length > 0)
        ? true
        : false;

    return (
      <Translation>
        {(t) => (
          <View>
            <TextInput
              innerRef={(ref) => {
                if (!ref) {
                  return;
                }

                props.addRef('EmailTextField', ref);
              }}
              style={styles.textInput}
              label={t('views.login.email_label')}
              value={props.credentials.email}
              message={t(props.credentials.emailMessage)}
              onChangeText={(text) => {
                props.setEmail(text);
                props.setEmailMessage(undefined);
              }}
            />
            <TextInput
              style={styles.textInput}
              label={t('views.login.password_label')}
              value={props.credentials.password}
              secureTextEntry={secureTextEntry}
              message={t(props.credentials.passwordMessage)}
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

  renderLoginButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Button
            style={styles.loginButton}
            text={t('app.login')}
            onPress={() => {
              console.log('[credentials] ', props.credentials);

              // if (!this.validateAll()) {
              //   return;
              // }

              // AuthProvider.login(props, {
              //   email: 'user001@gmail.com', //props.credentials.loginID,
              //   password: 'password', //props.credentials.password,
              // })
              //   .then(async () => {
              //     // if (
              //     //   props.pushNoticationProps.token &&
              //     //   props.pushNoticationProps.token.length
              //     // ) {
              //     //   await UserProvider.updateToken(props, {
              //     //     deviceToken: props.pushNoticationProps.token,
              //     //   }).catch((error) => {
              //     //     console.error(error);
              //     //   });
              //     // } else {
              //     //   console.log(
              //     //     '[login-view-update-token-bypassed] Token not found.',
              //     //   );
              //     // }
              //     //
              //
              //     await SearchProvider.prefetchRecentSearches(props);
              //
              //     await FeedProvider.prefetchFeeds(props);
              //
              //     Router.route(props, 'Main');
              //   })
              //   .catch((error) => {
              //     console.error(error);
              //
              //     // props.hideActivityIndicator({
              //     //   holder: ActivityIndicatorHolders.LOGIN,
              //     // });
              //   });
            }}
          />
        )}
      </Translation>
    );
  };

  renderForgotPasswordButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Button
            style={styles.forgotPasswordButton}
            textStyle={styles.forgotPasswordButtonText}
            text={t('app.forgotPassword')}
            onPress={() => {

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
          <Separator
            style={styles.separator}
            text={t('OR')}
          />
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
            <Button
              style={styles.otherLoginButton}
              imageStyle={styles.otherLoginImage}
              source={ic_apple}
              resizeMode="center"
            />
            <Button
              style={styles.otherLoginButton}
              imageStyle={styles.otherLoginImage}
              source={ic_facebook}
              resizeMode="center"
            />
            <Button
              style={styles.otherLoginButton}
              imageStyle={styles.otherLoginImage}
              source={ic_google}
              resizeMode="center"
            />
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
          <Body style={styles.body}>
            {this.renderTextInputs()}
            {this.renderLoginButton()}
            {this.renderForgotPasswordButton()}
            {/* this.renderSeparator() */}
            {/* this.renderOtherLoginButtons() */}
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
    marginLeft: Platform.OS === 'ios' ? 24 : 20,
    marginTop: 80,
  },
  body: {
    // backgroundColor: '#0f0',
    // justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  textInput: {
    marginBottom: 16,
  },
  separator: {
    marginVertical: 32,
  },
  loginButton: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    backgroundColor: Theme.colors.general.transparent,
  },
  forgotPasswordButtonText: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
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
  otherLoginImage: {
    width: 42,
    height: 42,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    refs: state.loginReducer.refs,
    credentials: state.loginReducer.credentials,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(LoginAction.reset(...args)),
    addRef: (...args) => dispatch(LoginAction.addRef(...args)),
    setEmail: (...args) => dispatch(LoginAction.setEmail(...args)),
    setEmailMessage: (...args) => dispatch(LoginAction.setEmailMessage(...args)),
    setPassword: (...args) => dispatch(LoginAction.setPassword(...args)),
    setPasswordMessage: (...args) => dispatch(LoginAction.setPasswordMessage(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
