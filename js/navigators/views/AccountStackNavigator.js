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

import { AccountView } from '../../views';

import { Translation } from 'react-i18next';

const ic_header_4 = require('../../../assets/images/ic_header_4/ic_header_4.png');

const Stack = createStackNavigator();

class AccountStackNavigator extends BaseComponent {
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
              header: ({ navigation, route, options, back }) => {
                const title = getHeaderTitle(options, route.name);

                return (
                  <Header
                    hiddenLeft={!back}
                    navigation={navigation}
                    source={ic_header_4}
                    title={title}
                  />
                );
              },
              animationEnabled: Platform.OS === 'ios',
            }}
          >
            <Stack.Screen
              name="Account"
              component={AccountView}
              options={{
                title: t('views.account.header'),
              }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountStackNavigator);
