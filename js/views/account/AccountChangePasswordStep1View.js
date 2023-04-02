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

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_header_bg = require('../../../assets/images/ic_header_bg/ic_header_bg.png');

export const IDENTIFIER = 'AccountChangePasswordStep1View';

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

    props.reset();
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

    const { credentials } = props.account;

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
            disabled={!(credentials.password && credentials.password.length > 0)}
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
