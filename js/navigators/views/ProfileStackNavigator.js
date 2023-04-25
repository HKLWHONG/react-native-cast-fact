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

import { Header } from '../../project-components';

import {
  ProfileView,
} from '../../views';

import {
  SignUpStackNavigator,
} from '../../navigators';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const Stack = createStackNavigator();

const ic_header_2 = require('../../../assets/images/ic_header_2/ic_header_2.png');

class ProfileStackNavigator extends BaseComponent {
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
                    source={ic_header_2}
                    title={title}
                  />
                );
              },
              animationEnabled: Platform.OS === 'ios',
            }}
          >
            <Stack.Screen
              name="ProfileView"
              component={ProfileView}
              options={{
                title: t('views.profile.header'),
              }}
            />
            <Stack.Group
              screenOptions={{
                presentation: 'transparentModal',
                headerShown: false,
                animationEnabled: false,
              }}
            >
              <Stack.Screen name="SignUpStackNavigator" component={SignUpStackNavigator} />
            </Stack.Group>
          </Stack.Navigator>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStackNavigator);
