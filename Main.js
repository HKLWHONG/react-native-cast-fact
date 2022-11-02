/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';
// import { AppAction } from './js/redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  BaseComponent,
  ActivityIndicator,
} from './js/components';

import { DrawerNavigator } from './js/navigators';

import { LaunchView, LoginView, SignUpView } from './js/views';

import './i18n';
import { Translation } from 'react-i18next';

const Stack = createStackNavigator();

class Main extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();

    this.initialize();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  initialize = () => {

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
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: false,
              }}
            >
              <Stack.Group>
                <Stack.Screen name="Launch" component={LaunchView} />
                <Stack.Screen name="Login" component={LoginView} />
                <Stack.Screen name="Main" component={DrawerNavigator} />
              </Stack.Group>
              <Stack.Group
                screenOptions={{
                  presentation: 'modal',
                  animationEnabled: true,
                }}
              >
                <Stack.Screen name="SignUp" component={SignUpView} />
              </Stack.Group>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
