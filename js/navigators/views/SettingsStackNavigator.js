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
  SettingsView,
  ProfileNameDisplaySelectionView,
  ProfileCastSheetEditionView,
  ProfilePictureSelectionView,
  AccountChangePasswordStep1View,
  AccountChangePasswordStep2View,
} from '../../views';

import { Translation } from 'react-i18next';

const ic_header_4 = require('../../../assets/images/ic_header_4/ic_header_4.png');

const Stack = createStackNavigator();

class SettingsStackNavigator extends BaseComponent {
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
                    source={ic_header_4}
                    title={title}
                  />
                );
              },
              animationEnabled: Platform.OS === 'ios',
            }}
          >
            <Stack.Screen
              name="SettingsView"
              component={SettingsView}
              options={{
                title: t('views.settings.header'),
              }}
            />
            <Stack.Screen
              name="ProfileNameDisplaySelectionView"
              component={ProfileNameDisplaySelectionView}
              options={{
                title: t('views.profile_name_display_selection.header'),
              }}
            />
            <Stack.Screen
              name="ProfileCastSheetEditionView"
              component={ProfileCastSheetEditionView}
              options={{
                title: t('views.profile_cast_sheet_edition.header'),
              }}
            />
            <Stack.Screen
              name="ProfilePictureSelectionView"
              component={ProfilePictureSelectionView}
              options={{
                title: t('views.profile_picture_selection.header'),
              }}
            />
            <Stack.Screen
              name="AccountChangePasswordStep1View"
              component={AccountChangePasswordStep1View}
              options={{
                title: t('views.account_change_password_step1.header'),
              }}
            />
            <Stack.Screen
              name="AccountChangePasswordStep2View"
              component={AccountChangePasswordStep2View}
              options={{
                title: t('views.account_change_password_step2.header'),
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsStackNavigator);
