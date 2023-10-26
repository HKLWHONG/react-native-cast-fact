/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { connect } from 'react-redux';

import { store, ProfileStackNavigatorAction, ProfileCastSheetEditionViewAction } from '../../redux';

import { createStackNavigator } from '@react-navigation/stack';

import { getHeaderTitle } from '@react-navigation/elements';

import { BaseComponent } from '../../components';

import {
  Header,
  Button
} from '../../project-components';

import {
  ProfileView,
  ProfileCastSheetEditionView,
} from '../../views';

import { Theme } from '../../utils';

import {
  SignUpStackNavigator,
} from '../../navigators';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const Stack = createStackNavigator();

const ic_header_2 = require('../../../assets/images/ic_header_2/ic_header_2.png');

const ic_next = require('../../../assets/images/ic_next/ic_next.png');

class ProfileStackNavigator extends BaseComponent {
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
    const { props } = this;
  };

  hiddenRightIfNeeded = (name) => {
    const { props } = this;

    const screens = [
      'ProfileView',
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
                    source={ic_header_2}
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
                              if (store.getState().profileStackNavigatorReducer.callbacks.onRightButtonPressList[route.name]) {
                                store.getState().profileStackNavigatorReducer.callbacks.onRightButtonPressList[route.name](event);
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

                if (store.getState().profileStackNavigatorReducer.callbacks.onScreenAppearList[state.routes[state.index].name]) {
                  store.getState().profileStackNavigatorReducer.callbacks.onScreenAppearList[state.routes[state.index].name](event);
                }
              },
            }}
          >
            <Stack.Screen
              name="ProfileView"
              component={ProfileView}
              options={{
                title: t('views.profile.header'),
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
              <Stack.Screen name="SignUpStackNavigator" component={SignUpStackNavigator} />
            </Stack.Group>
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
    hiddenRight: state.profileStackNavigatorReducer.hiddenRight,
    enabledRight: state.profileStackNavigatorReducer.enabledRight,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(ProfileStackNavigatorAction.reset(...args)),
    setHiddenRight: (...args) => dispatch(ProfileStackNavigatorAction.setHiddenRight(...args)),
    setEnabledRight: (...args) => dispatch(ProfileStackNavigatorAction.setEnabledRight(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStackNavigator);
