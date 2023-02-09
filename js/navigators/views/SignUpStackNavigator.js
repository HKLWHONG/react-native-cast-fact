/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';

import { getHeaderTitle } from '@react-navigation/elements';

import { BaseComponent } from '../../components';

import {
  Header,
  Button,
} from '../../project-components';

import {
  SignUpView,
  SignUpAccountTypeSelectionView,
} from '../../views';

import { Theme, Router } from '../../utils';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const Stack = createStackNavigator();

const preview = require('../../../assets/images/preview/preview.png');

class SignUpStackNavigator extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  render() {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Stack.Navigator
            screenOptions={{
              headerMode: 'screen',
              header: (info) => {
                const { navigation, route, options, back } = info;

                const title = getHeaderTitle(options, route.name);

                return (
                  <Header
                    hiddenLeft={!back}
                    info={info}
                    title={title}
                    renderRightView={() => {
                      return (
                        <Button
                          buttonStyle={styles.rightButton}
                          textStyle={styles.rightButtonText}
                          type="small"
                          text={i18n.t('app.next')}
                          rightAccessorySource={preview}
                          rightAccessoryResizeMode="center"
                          onPress={() => {
                            Router.push(props, "SignUpAccountTypeSelection");
                          }}
                        />
                      );
                    }}
                    onPressLeft={(info) => {
                      const { navigation, route } = info;

                      // console.log('[info]', info);
                      // console.log('[state]', navigation.getState());
                      // console.log('[navigation]', navigation);
                      // console.log('[route.name]', route.name);

                      navigation.goBack();
                    }}
                  />
                );
              },
              animationEnabled: Platform.OS === 'ios',
            }}
          >
            <Stack.Screen
              name="SignUp"
              component={SignUpView}
              options={{
                title: t('views.sign_up.header'),
              }}
            />
            <Stack.Screen
              name="SignUpAccountTypeSelection"
              component={SignUpAccountTypeSelectionView}
              options={{
                title: t('views.sign_up.header'),
              }}
            />
          </Stack.Navigator>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  rightButton: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.background.secondary,
  },
  rightButtonText: {
    // color: Theme.colors.general.white,
    fontSize: 13,
    // fontFamily: Theme.fonts.bold,
    letterSpacing: 2.22,
    // textTransform: 'uppercase',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStackNavigator);
