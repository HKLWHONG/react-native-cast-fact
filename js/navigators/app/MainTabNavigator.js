/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform, Dimensions, ImageBackground, View } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  DrawerNavigatorAction,
  MainTabNavigatorAction,
  CriteriaSectionAction,
  RecentSearchesSectionAction,
  FindTalentSectionAction,
  DataAction,
} from '../../redux';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { BaseComponent, Image } from '../../components';

import { Theme } from '../../utils';

import {
  AuthProvider,
} from '../../providers';

import {
  ProfileStackNavigator,
  SearchStackNavigator,
  // InboxStackNavigator,
  ProjectStackNavigator,
  SettingsStackNavigator,
} from '../../navigators';

import { Translation } from 'react-i18next';

import { Router } from '../../utils';

import { TagProcessor } from '../../processors';

const ic_tab_bar_light = require('../../../assets/images/ic_tab_bar_light/ic_tab_bar_light.png');
const ic_tab_bar_search = require('../../../assets/images/ic_tab_bar_search/ic_tab_bar_search.png');
const ic_tab_bar_search_focused = require('../../../assets/images/ic_tab_bar_search_focused/ic_tab_bar_search_focused.png');
const ic_tab_bar_inbox = require('../../../assets/images/ic_tab_bar_inbox/ic_tab_bar_inbox.png');
const ic_tab_bar_inbox_focused = require('../../../assets/images/ic_tab_bar_inbox_focused/ic_tab_bar_inbox_focused.png');
const ic_tab_bar_calendar = require('../../../assets/images/ic_tab_bar_calendar/ic_tab_bar_calendar.png');
const ic_tab_bar_calendar_focused = require('../../../assets/images/ic_tab_bar_calendar_focused/ic_tab_bar_calendar_focused.png');
const ic_tab_bar_profile = require('../../../assets/images/ic_tab_bar_profile/ic_tab_bar_profile.png');
const ic_tab_bar_profile_focused = require('../../../assets/images/ic_tab_bar_profile_focused/ic_tab_bar_profile_focused.png');
const ic_tab_bar_settings = require('../../../assets/images/ic_tab_bar_settings/ic_tab_bar_settings.png');
const ic_tab_bar_settings_focused = require('../../../assets/images/ic_tab_bar_settings_focused/ic_tab_bar_settings_focused.png');

const Tab = createMaterialBottomTabNavigator();

class MainTabNavigator extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  tabPress = ({ navigation, route }, e, { index, stack }) => {
    const { props } = this;

    // console.log('[navigation] ', navigation);
    // console.log('[route] ', route);
    // console.log('[route.state] ', route.state);

    e.preventDefault();

    if (navigation.isFocused()) {
      if (!store.getState().mainTabNavigatorReducer.tapTimer) {
        props.setTapTimer(
          setTimeout(() => {
            if (
              route.state && route.state.index > 0
              &&
              store.getState().mainTabNavigatorReducer.tapCount > 1
            ) {
              // console.log('[double-tapped]');

              // props.resetCriteria();
              //
              // props.resetRecentSearchesTags();
              //
              // TagProcessor.reload();

              navigation.popToTop();
            } else {
              // console.log('[single-tapped]');

              let routeIndex = (route.state && route.state.index) || 0;

              if (
                store.getState().mainTabNavigatorReducer.listRefs.length > index
                &&
                store.getState().mainTabNavigatorReducer.listRefs[index].length > routeIndex
                &&
                store.getState().mainTabNavigatorReducer.listRefs[index][routeIndex]
                &&
                store.getState().mainTabNavigatorReducer.listRefs[index][routeIndex].props
                &&
                store.getState().mainTabNavigatorReducer.listRefs[index][routeIndex].props.scrollToPosition
              ) {
                store.getState().mainTabNavigatorReducer.listRefs[index][routeIndex].props.scrollToPosition(0, 0);
              }
            }

            props.setTapTimer(undefined);

            // console.log('[tap-timer-reset]');

            props.setTapCount(0);

            // console.log('[tap-count-reset]', store.getState().mainTabNavigatorReducer.tapCount);
          }, 250),
        );

        // console.log('[tap-timer-set]');
      }

      // console.log('[tap-count]', store.getState().mainTabNavigatorReducer.tapCount);

      props.setTapCount(store.getState().mainTabNavigatorReducer.tapCount + 1);

      // console.log('[tap-count-updated]', store.getState().mainTabNavigatorReducer.tapCount);
    } else {
      clearTimeout(store.getState().mainTabNavigatorReducer.tapTimer);
      props.setTapTimer(undefined);
      props.setTapCount(0);

      props.selectDrawer(index);
      props.selectTab(index);

      if (Platform.OS === 'ios') {
        Router.jumpTo(props, stack);
      } else {
        // let routes = (route.state && route.state.routes) || [];
        //
        // routes = routes.map((route) => route.name);
        //
        // Router.route(props, 'SearchStackNavigator', routes);

        Router.route(props, stack);
      }
    }
  };

  render() {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Tab.Navigator
           barStyle={styles.bar}
           shifting={false}
          >
            <Tab.Screen
              name="SearchStackNavigator"
              component={SearchStackNavigator}
              options={{
                tabBarIcon: ({focused}) => {
                  let dotStyle= {};

                  // if (focused) {
                  //   dotStyle = {
                  //     ...dotStyle,
                  //     backgroundColor: Theme.colors.general.white,
                  //   }
                  // }

                  return (
                    <ImageBackground
                      style={styles.background}
                      imageStyle={styles.iconContainer}
                      source={focused ? ic_tab_bar_light: undefined}
                      resizeMode="center"
                    >
                      <Image
                        style={styles.icon}
                        source={focused ? ic_tab_bar_search_focused : ic_tab_bar_search}
                        resizeMode="center"
                      />
                      <View style={[styles.dot, dotStyle]} />
                    </ImageBackground>
                  );
                },
                tabBarLabel: t(''),
              }}
              listeners={(params) => ({
                tabPress: (event) => {
                  this.tabPress(params, event, { index: 0, stack: 'SearchStackNavigator' });
                },
              })}
            />
            {
              /*
              <Tab.Screen
                name="InboxStackNavigator"
                component={InboxStackNavigator}
                options={{
                  tabBarIcon: ({focused}) => {
                    let dotStyle= {};

                    // if (focused) {
                    //   dotStyle = {
                    //     ...dotStyle,
                    //     backgroundColor: Theme.colors.general.white,
                    //   }
                    // }

                    return (
                      <ImageBackground
                        style={styles.background}
                        imageStyle={styles.iconContainer}
                        source={focused ? ic_tab_bar_light: undefined}
                        resizeMode="center"
                      >
                        <Image
                          style={styles.icon}
                          source={focused ? ic_tab_bar_inbox_focused : ic_tab_bar_inbox}
                          resizeMode="center"
                        />
                        <View style={[styles.dot, dotStyle]} />
                      </ImageBackground>
                    );
                  },
                  tabBarLabel: t(''),
                }}
                listeners={(params) => ({
                  tabPress: (event) => {
                    this.tabPress(params, event, { index: 1, stack: 'InboxStackNavigator' });
                  },
                })}
              />
              <Tab.Screen
                name="ProjectStackNavigator"
                component={ProjectStackNavigator}
                options={{
                  tabBarIcon: ({focused}) => {
                    let dotStyle= {};

                    // if (focused) {
                    //   dotStyle = {
                    //     ...dotStyle,
                    //     backgroundColor: Theme.colors.general.white,
                    //   }
                    // }

                    return (
                      <ImageBackground
                        style={styles.background}
                        imageStyle={styles.iconContainer}
                        source={focused ? ic_tab_bar_light: undefined}
                        resizeMode="center"
                      >
                        <Image
                          style={styles.icon}
                          source={focused ? ic_tab_bar_calendar_focused : ic_tab_bar_calendar}
                          resizeMode="center"
                        />
                        <View style={[styles.dot, dotStyle]} />
                      </ImageBackground>
                    );
                  },
                  tabBarLabel: t(''),
                }}
                listeners={(params) => ({
                  tabPress: (event) => {
                    this.tabPress(params, event, { index: 2, stack: 'ProjectStackNavigator' });
                  },
                })}
              />
              */
            }
            <Tab.Screen
              name="ProfileStackNavigator"
              component={ProfileStackNavigator}
              options={{
                tabBarIcon: ({focused}) => {
                  let dotStyle= {};

                  // if (focused) {
                  //   dotStyle = {
                  //     ...dotStyle,
                  //     backgroundColor: Theme.colors.general.white,
                  //   }
                  // }

                  return (
                    <ImageBackground
                      style={styles.background}
                      imageStyle={styles.iconContainer}
                      source={focused ? ic_tab_bar_light: undefined}
                      resizeMode="center"
                    >
                      <Image
                        style={styles.icon}
                        source={focused ? ic_tab_bar_profile_focused : ic_tab_bar_profile}
                        resizeMode="center"
                      />
                      <View style={[styles.dot, dotStyle]} />
                    </ImageBackground>
                  );
                },
                tabBarLabel: t(''),
              }}
              listeners={(params) => ({
                tabPress: async (event) => {
                  event.preventDefault();

                  AuthProvider.decodeJWTToken()
                    .then((json) => {
                      console.log('[decoded-jwt]', json);

                      this.tabPress(params, event, { index: 1, stack: 'ProfileStackNavigator' });
                    })
                    .catch((error) => {
                      console.error(error);

                      Router.push(props, 'WelcomeSlideSheetContainerView');
                    });
                },
              })}
            />
            <Tab.Screen
              name="SettingsStackNavigator"
              component={SettingsStackNavigator}
              options={{
                tabBarIcon: ({focused}) => {
                  let dotStyle= {};

                  // if (focused) {
                  //   dotStyle = {
                  //     ...dotStyle,
                  //     backgroundColor: Theme.colors.general.white,
                  //   }
                  // }

                  return (
                    <ImageBackground
                      style={styles.background}
                      imageStyle={styles.iconContainer}
                      source={focused ? ic_tab_bar_light: undefined}
                      resizeMode="center"
                    >
                      <Image
                        style={styles.icon}
                        source={focused ? ic_tab_bar_settings_focused : ic_tab_bar_settings}
                        resizeMode="center"
                      />
                      <View style={[styles.dot, dotStyle]} />
                    </ImageBackground>
                  );
                },
                tabBarLabel: t(''),
              }}
              listeners={(params) => ({
                tabPress: (event) => {
                  this.tabPress(params, event, { index: 2, stack: 'SettingsStackNavigator' });

                  AuthProvider.decodeJWTToken()
                    .then((jwtToken) => {
                      // console.log('[jwt-token]', jwtToken);

                      props.setIsLoggedIn(true);
                      if (jwtToken.profile_id) {
                        // props.setHasProfile(true);
                      } else {
                        props.setUserProfile(undefined);
                      }
                    })
                    .catch((error) => {
                      console.error(error);

                      props.setIsLoggedIn(false);
                      props.setUserProfile(undefined);
                    });
                },
              })}
            />
            {
              /*
              <Tab.Screen
                name="ProjectStackNavigator"
                component={ProjectStackNavigator}
                options={{
                  tabBarIcon: ({focused}) => {
                    let dotStyle= {};

                    // if (focused) {
                    //   dotStyle = {
                    //     ...dotStyle,
                    //     backgroundColor: Theme.colors.general.white,
                    //   }
                    // }

                    return (
                      <ImageBackground
                        style={styles.background}
                        imageStyle={styles.iconContainer}
                        source={focused ? ic_tab_bar_light: undefined}
                        resizeMode="center"
                      >
                        <Image
                          style={styles.icon}
                          source={focused ? ic_tab_bar_calendar_focused : ic_tab_bar_calendar}
                          resizeMode="center"
                        />
                        <View style={[styles.dot, dotStyle]} />
                      </ImageBackground>
                    );
                  },
                  tabBarLabel: t(''),
                }}
                listeners={(params) => ({
                  tabPress: (event) => {
                    this.tabPress(params, event, { index: 3, stack: 'ProjectStackNavigator' });
                  },
                })}
              />
              */
            }
          </Tab.Navigator>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Theme.colors.background.secondary,
  },
  background: {
    // backgroundColor: '#00f',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  iconContainer: {
    // backgroundColor: '#0f0',
    width: 57,
    height: 37,
    marginTop: 14,
    marginLeft: -12,
  },
  activeBackgroundColor: {
    // backgroundColor: '#404040',
  },
  icon: {
    // backgroundColor: '#f00',
    width: 32,
    height: 32,
  },
  dot: {
    // backgroundColor: '#f00',
    width: 5,
    height: 5,
    borderRadius: 2.5,
  }
});

function mapStateToProps(state) {
  return {
    index: state.mainTabNavigatorReducer.index,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectDrawer: (...args) => dispatch(DrawerNavigatorAction.select(...args)),
    selectTab: (...args) => dispatch(MainTabNavigatorAction.select(...args)),
    setTapCount: (...args) => dispatch(MainTabNavigatorAction.setTapCount(...args)),
    setTapTimer: (...args) => dispatch(MainTabNavigatorAction.setTapTimer(...args)),
    resetCriteria: (...args) => dispatch(CriteriaSectionAction.reset(...args)),
    resetRecentSearchesTags: (...args) => dispatch(RecentSearchesSectionAction.resetTags(...args)),
    setFindTalentTags: (...args) => dispatch(FindTalentSectionAction.setTags(...args)),
    setIsLoggedIn: (...args) => dispatch(DataAction.setIsLoggedIn(...args)),
    setUserProfile: (...args) => dispatch(DataAction.setUserProfile(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTabNavigator);
