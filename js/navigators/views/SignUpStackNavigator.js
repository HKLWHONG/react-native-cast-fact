/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  SignUpStackNavigatorAction,
} from '../../redux';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { getHeaderTitle } from '@react-navigation/elements';

import { BaseComponent } from '../../components';

import {
  Header,
  Button,
} from '../../project-components';

import {
  SignUpView,
  SignUpAccountTypeSelectionView,
  ProfilePictureSelectionView,
  ProfileNameEditionView,
  ProfileNameDisplaySelectionView,
  ProfileCastSheetEditionView,
  CalendarModalView,
  ProfileCompletionView,
} from '../../views';

import { Theme, Router } from '../../utils';

import {
  CameraStackNavigator,
} from '../../navigators';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const Stack = createStackNavigator();

const ic_next = require('../../../assets/images/ic_next/ic_next.png');

class SignUpStackNavigator extends BaseComponent {
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
      'SignUpAccountTypeSelectionView',
      'CameraStackNavigator',
      'ProfileCompletionView',
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
                              if (store.getState().signUpStackNavigatorReducer.callbacks.onRightButtonPressList[route.name]) {
                                store.getState().signUpStackNavigatorReducer.callbacks.onRightButtonPressList[route.name](event);
                              }
                            }
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

                      // if (route.name) {
                      //   props.setHiddenRight(this.hiddenRightIfNeeded(route.name));
                      //
                      //   props.setOnRightButtonPress((event) => {
                      //     Router.push(props, route.name);
                      //   });
                      // }

                      navigation.goBack();
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

                if (store.getState().signUpStackNavigatorReducer.callbacks.onScreenAppearList[state.routes[state.index].name]) {
                  store.getState().signUpStackNavigatorReducer.callbacks.onScreenAppearList[state.routes[state.index].name](event);
                }
              },
            }}
          >
            <Stack.Screen
              name="SignUpView"
              component={SignUpView}
              options={{
                title: t('views.sign_up.header'),
              }}
            />
            <Stack.Screen
              name="SignUpAccountTypeSelectionView"
              component={SignUpAccountTypeSelectionView}
              options={{
                title: t('views.sign_up_account_type_selection.header'),
              }}
            />
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
              name="ProfileNameEditionView"
              component={ProfileNameEditionView}
              options={{
                title: t('views.profile_name_edition.header'),
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
              name="ProfileCompletionView"
              component={ProfileCompletionView}
              options={{
                title: t('views.profile_completion.header'),
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
    hiddenRight: state.signUpStackNavigatorReducer.hiddenRight,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SignUpStackNavigatorAction.reset(...args)),
    setHiddenRight: (...args) => dispatch(SignUpStackNavigatorAction.setHiddenRight(...args)),
    addOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStackNavigator);
