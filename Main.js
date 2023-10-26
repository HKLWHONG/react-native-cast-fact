/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Linking } from 'react-native';

import { connect } from 'react-redux';
// import { AppAction } from './js/redux';

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { getStateFromPath } from '@react-navigation/native';

import {
  BaseComponent,
  ActivityIndicator,
} from './js/components';

import { AuthProvider } from './js/providers';

import { DrawerNavigator } from './js/navigators';
import { LoginView, SignUpView } from './js/views';

import {
  LaunchView,
  // LoginView,
  // SignUpView,
} from './js/views';

import './i18n';
import { Translation } from 'react-i18next';
import { SignUpViewAction, DataAction } from './js/redux';

const Stack = createStackNavigator();

const config = {
  screens: {
    LoginView: 'loginview',
    DrawerNavigator: {
      screens: {
        DrawerStack: {
          screens: {
            LoginStackNavigator: {
              screens: {
                LoginView: 'login'
              }
            },
            MainTab: {
              screens: {
                SettingsStackNavigator: {
                  screens: {
                    ProfileNameEditionView: 'profile'
                  }
                }
              }
            },
            SignUpStackNavigator: {
              screens: {
                SignUpView: 'redeem/:id'
              }
            }
          }
        }
      }
    }
  }
};

const linking = {
  prefixes: [
    'https://castfact.com', 'castfact://'
  ],
  config
};



class Main extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
    Linking.addEventListener('url', this.handleOpenURL);
    this.initialize();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    // Linking.removeAllListeners();
  }

  initialize = () => {

  };

  handleOpenURL = (event) => {
    const { props } = this;

    console.log("[Open URL]", event.url);

    if (event.url.startsWith('castfact://redeem/')) {

      const match = event.url.match(/castfact:\/\/redeem\/([\w-]+)/);

      if (match && match[1]) {
        // const id = "a5a87191-4ed2-481c-9d6d-632ae2ba3b86";
        const id = match[1];
        console.log("[Redeem id] ", id);
        props.setRedeem(true, id);

      }
    }
  };


  renderActivityIndicator = () => {
    const { props } = this;

    console.log(
      `[activity-indicator-hidden] ${props.activityIndicatorProps.hidden}`,
    );

    return (
      <Translation>
        {(t) => (
          <ActivityIndicator
            hidden={props.activityIndicatorProps.hidden}
            message={props.activityIndicatorProps.message}
          />
        )}
      </Translation>
    );
  };

  render() {
    return (
      <Translation>
        {(t) => (
          <NavigationContainer linking={linking} onStateChange={(state) => {
            // console.log('New state:', state);
          }}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: false,
              }}
            >
              <Stack.Group>
                <Stack.Screen name="LaunchView" component={LaunchView} />
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
              </Stack.Group>
              <Stack.Screen
                name="LoginView"
                component={LoginView}
                options={{
                  title: t('views.login.header'),
                }}
              />
            </Stack.Navigator>
            {this.renderActivityIndicator()}
          </NavigationContainer>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  return {
    activityIndicatorProps: state.appReducer.activityIndicatorProps,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    setRedeem: (...args) => dispatch(SignUpViewAction.setRedeem(...args)),
    setIsLoggedIn: (...args) => dispatch(DataAction.setIsLoggedIn(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
