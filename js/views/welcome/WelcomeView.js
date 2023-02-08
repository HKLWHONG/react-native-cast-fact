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
import { WelcomeAction, MainTabAction } from '../../redux';

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
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class WelcomeView extends BaseComponent {
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

  renderTitleContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {t('views.welcome.title')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderDescriptionContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText1}>
              {t('views.welcome.description_1')}
            </Text>
            <Text style={styles.descriptionText2}>
              {t('views.welcome.description_2')}
            </Text>
          </View>
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
              {t('views.welcome.subtitle')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderButtonContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.buttonContainer}>
            <Button
              style={[styles.button, { marginBottom: 4 }]}
              textStyle={styles.buttonText}
              text={t('views.welcome.digital_cast_sheet')}
              description={t('views.welcome.digital_cast_sheet_description')}
              leftAccessorySource={preview}
              leftAccessoryResizeMode="center"
              disabled
            />
            <Button
              style={[styles.button, { marginTop: 4 }]}
              textStyle={styles.buttonText}
              text={t('views.welcome.searchable_profile')}
              description={t('views.welcome.searchable_profile_description')}
              leftAccessorySource={preview}
              leftAccessoryResizeMode="center"
              disabled
            />
          </View>
        )}
      </Translation>
    );
  };

  renderCreateAccountButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Button
            style={styles.createAccountButton}
            text={t('app.create_account')}
            onPress={() => {
              Router.push(props.slideSheetPropsList.WelcomeSlideSheet, "SignUpStack");
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
          <Body
            style={styles.body}
            scrollable={false}
          >
            {this.renderTitleContainer()}
            {this.renderDescriptionContainer()}
            {this.renderSubtitleContainer()}
            {this.renderButtonContainer()}
            {this.renderCreateAccountButton()}
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
              style={styles.loginContainer}
              onPress={() => {
                Router.push(props.slideSheetPropsList.WelcomeSlideSheet, "LoginStack");
              }}
            >
              <View style={styles.loginSubContainer}>
                <Text style={styles.loginHint}>
                  {t('views.welcome.login_hint')}
                </Text>
                <Text style={styles.login}>
                  {t('app.login')}
                </Text>
                <Separator style={styles.separator}/>
                <View style={styles.redeemAccountContainer}>
                  <View style={styles.redeemAccountSubContainer}>
                    <Text style={styles.redeemAccountText}>
                      {t('views.welcome.redeem_text_1')}
                    </Text>
                    <SingleTouch style={styles.redeemAccountButton}>
                      <Text style={styles.redeemAccountButtonText}>
                        {t('views.welcome.redeem')}
                      </Text>
                    </SingleTouch>
                    <Text style={styles.redeemAccountText}>
                      {t('views.welcome.redeem_text_2')}
                    </Text>
                  </View>
                </View>
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
    marginTop: 32,
  },
  titleContainer: {
    // backgroundColor: '#f00',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 36,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 8,
    textTransform: 'uppercase',
  },
  descriptionContainer: {
    // backgroundColor: '#ff0',
    alignItems: 'center',
    marginVertical: 16,
  },
  descriptionText1: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 17,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1,
  },
  descriptionText2: {
    // backgroundColor: '#00f',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1,
    textAlign: 'center',
    marginHorizontal: 80,
  },
  subtitleContainer: {
    // backgroundColor: '#0ff',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 8,
  },
  subtitle: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    letterSpacing: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginHorizontal: 64,
  },
  buttonContainer: {
    // backgroundColor: '#f00',
    marginTop: 8,
    marginBottom: 32,
  },
  button: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.general.transparent,
  },
  buttonText: {
    // color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
  },
  createAccountButton: {
    marginTop: 16,
  },
  footer: {
    // backgroundColor: '#f00',
  },
  loginContainer: {
    // backgroundColor: '#f00',
  },
  loginSubContainer: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 112,
    paddingTop: 8,
    paddingBottom: 32,
  },
  loginHint: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.7,
    marginVertical: 8,
  },
  login: {
    color: Theme.colors.general.white,
    fontSize: 17,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginVertical: 8,
  },
  separator: {
    height: 1,
    marginTop: 8
  },
  redeemAccountContainer: {
    // backgroundColor: '#f00',
  },
  redeemAccountSubContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  redeemAccountText: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1,
  },
  redeemAccountButton: {},
  redeemAccountButtonText: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
  },
});

function mapStateToProps(state) {
  return {
    slideSheetPropsList: state.slideSheetReducer.propsList,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeView);
