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
  ProfilePictureSelectionView,
} from '../../views';

import { Theme, Router } from '../../utils';

import {
  CameraStackNavigator,
} from '../../navigators';

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
                          rightAccessorySource={preview}
                          rightAccessoryResizeMode="center"
                          onPress={(e) => {
                            console.log('[on-right-button-press]');

                            if (route.name) {
                              if (store.getState().signUpStackNavigatorReducer.callbacks.onRightButtonPressList[route.name]) {
                                store.getState().signUpStackNavigatorReducer.callbacks.onRightButtonPressList[route.name](e);
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
                      //   props.setOnRightButtonPress((e) => {
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
              state: (e) => {
                const { state } = e.data;

                // console.log('[state-changed]', state);
                // console.log('[state-changed-route-names]', state.routeNames);
                // console.log('[state-changed-screen-name]', state.routeNames[state.index]);

                props.setHiddenRight(this.hiddenRightIfNeeded(state.routeNames[state.index]));
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
            <Stack.Screen
              name="CameraStackNavigator"
              component={CameraStackNavigator}
              options={{
                title: t(''),
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
