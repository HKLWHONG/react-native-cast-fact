/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  SettingsStackNavigatorAction,
} from '../../redux';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { getHeaderTitle } from '@react-navigation/elements';

import { BaseComponent } from '../../components';

import {
  Header,
  Button,
} from '../../project-components';

import {
  CameraStackNavigator,
} from '../../navigators';

import {
  SettingsView,
  ProfileNameEditionView,
  ProfileNameDisplaySelectionView,
  ProfileCastSheetEditionView,
  CalendarModalView,
  ProfilePictureSelectionView,
  AccountChangePasswordStep1View,
  AccountChangePasswordStep2View,
} from '../../views';

import { Theme } from '../../utils';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_header_3 = require('../../../assets/images/ic_header_3/ic_header_3.png');

const ic_next = require('../../../assets/images/ic_next/ic_next.png');

const Stack = createStackNavigator();

class SettingsStackNavigator extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();

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

  hiddenRightIfNeeded = (name) => {
    const { props } = this;

    const screens = [
      'SettingsView',
      'AccountChangePasswordStep1View',
      'AccountChangePasswordStep2View',
    ];

    const filteredScreens = screens.filter((screen) => {
      return screen === name;
    });

    return filteredScreens.length > 0;
  };

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
                    hiddenRight={props.hiddenRight}
                    info={info}
                    source={ic_header_3}
                    title={title}
                    renderRightView={() => {
                      return (
                        <Button
                          buttonStyle={styles.rightButton}
                          textStyle={styles.rightButtonText}
                          type="small"
                          text={i18n.t('app.next')}
                          rightAccessorySource={ic_next}
                          rightAccessoryResizeMode="center"
                          onPress={(event) => {
                            console.log('[on-right-button-press]');

                            if (route.name) {
                              if (store.getState().settingsStackNavigatorReducer.callbacks.onRightButtonPressList[route.name]) {
                                store.getState().settingsStackNavigatorReducer.callbacks.onRightButtonPressList[route.name](event);
                              }
                            }
                          }}
                          disabled={!props.enabledRight}
                        />
                      );
                    }}
                  />
                );
              },
              animationEnabled: Platform.OS === 'ios',
            }}
            screenListeners={{
              state: (event) => {
                const { state } = event.data;

                // console.log(`[${this.constructor.name}-state-changed]`, state);
                // console.log(`[${this.constructor.name}-state-changed-route-names]`, state.routeNames);
                // console.log(`[${this.constructor.name}-state-changed-routes]`, state.routes);
                console.log(`[${this.constructor.name}-state-changed-screen-name]`, state.routes[state.index].name);

                props.setHiddenRight(this.hiddenRightIfNeeded(state.routes[state.index].name));
                props.setEnabledRight(false);

                if (store.getState().settingsStackNavigatorReducer.callbacks.onScreenAppearList[state.routes[state.index].name]) {
                  store.getState().settingsStackNavigatorReducer.callbacks.onScreenAppearList[state.routes[state.index].name](event);
                }
              },
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
              name="ProfileNameEditionView"
              component={ProfileNameEditionView}
              options={{
                title: t('views.profile_name_display_selection.header'),
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
            <Stack.Group
              screenOptions={{
                presentation: 'transparentModal',
                headerShown: false,
                animationEnabled: false,
              }}
            >
              <Stack.Screen name="CalendarModalView" component={CalendarModalView} />
            </Stack.Group>
            <Stack.Screen
              name="ProfilePictureSelectionView"
              component={ProfilePictureSelectionView}
              options={{
                title: t('views.profile_picture_selection.header'),
              }}
            />
            <Stack.Group
              screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                animationEnabled: true,
                gestureEnabled: false,
              }}
            >
              <Stack.Screen
                name="CameraStackNavigator"
                component={CameraStackNavigator}
                options={{
                  title: t(''),
                }}
              />
            </Stack.Group>
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

const styles = StyleSheet.create({
  rightButton: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.background.secondary,
    paddingLeft: 10,
    paddingRight: 2,
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
  return {
    hiddenRight: state.settingsStackNavigatorReducer.hiddenRight,
    enabledRight: state.settingsStackNavigatorReducer.enabledRight,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SettingsStackNavigatorAction.reset(...args)),
    setHiddenRight: (...args) => dispatch(SettingsStackNavigatorAction.setHiddenRight(...args)),
    setEnabledRight: (...args) => dispatch(SettingsStackNavigatorAction.setEnabledRight(...args)),
    addOnRightButtonPress: (...args) => dispatch(SettingsStackNavigatorAction.addOnRightButtonPress(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsStackNavigator);
