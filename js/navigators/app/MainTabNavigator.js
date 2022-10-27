/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform, Dimensions, ImageBackground, View } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  DrawerAction,
  MainTabAction,
} from '../../redux';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { BaseComponent, Image } from '../../components';

import { Theme } from '../../utils';

import {
  FeedStackNavigator,
  InboxStackNavigator,
  CalendarStackNavigator,
  ProfileStackNavigator,
} from '../../navigators';

import { Translation } from 'react-i18next';

import { Router } from '../../utils';

const ic_tab_bar_light = require('../../../assets/images/ic_tab_bar_light/ic_tab_bar_light.png');
const ic_tab_bar_search = require('../../../assets/images/ic_tab_bar_search/ic_tab_bar_search.png');
const ic_tab_bar_search_focused = require('../../../assets/images/ic_tab_bar_search_focused/ic_tab_bar_search_focused.png');
const ic_tab_bar_inbox = require('../../../assets/images/ic_tab_bar_inbox/ic_tab_bar_inbox.png');
const ic_tab_bar_inbox_focused = require('../../../assets/images/ic_tab_bar_inbox_focused/ic_tab_bar_inbox_focused.png');
const ic_tab_bar_calendar = require('../../../assets/images/ic_tab_bar_calendar/ic_tab_bar_calendar.png');
const ic_tab_bar_calendar_focused = require('../../../assets/images/ic_tab_bar_calendar_focused/ic_tab_bar_calendar_focused.png');
const ic_tab_bar_profile = require('../../../assets/images/ic_tab_bar_profile/ic_tab_bar_profile.png');
const ic_tab_bar_profile_focused = require('../../../assets/images/ic_tab_bar_profile_focused/ic_tab_bar_profile_focused.png');

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

  render() {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Tab.Navigator
           barStyle={styles.bar}
           shifting={false}>
            <Tab.Screen
              name="FeedStack"
              component={FeedStackNavigator}
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
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  // console.log('[navigation] ', navigation);
                  // console.log('[route] ', route);
                  // console.log('[route.state] ', route.state);

                  e.preventDefault();

                  if (navigation.isFocused()) {
                    if (!store.getState().mainTabReducer.tapTimer) {
                      props.setTapTimer(
                        setTimeout(() => {
                          if (
                            route.state && route.state.index > 0
                            &&
                            store.getState().mainTabReducer.tapCount > 1
                          ) {
                            // console.log('[double-tapped]');

                            navigation.popToTop();
                          } else {
                            // console.log('[single-tapped]');

                            let index = (route.state && route.state.index) || 0;

                            if (
                              store.getState().mainTabReducer.listRefs.length > 0
                              &&
                              store.getState().mainTabReducer.listRefs[0].length > index
                            ) {
                              store.getState().mainTabReducer.listRefs[0][index].props.scrollToPosition(0, 0);
                            }
                          }

                          props.setTapTimer(undefined);

                          // console.log('[tap-timer-reset]');

                          props.setTapCount(0);

                          // console.log('[tap-count-reset]', store.getState().mainTabReducer.tapCount);
                        }, 250),
                      );

                      // console.log('[tap-timer-set]');
                    }

                    // console.log('[tap-count]', store.getState().mainTabReducer.tapCount);

                    props.setTapCount(store.getState().mainTabReducer.tapCount + 1);

                    // console.log('[tap-count-updated]', store.getState().mainTabReducer.tapCount);
                  } else {
                    clearTimeout(store.getState().mainTabReducer.tapTimer);
                    props.setTapTimer(undefined);
                    props.setTapCount(0);

                    props.selectDrawer(0);
                    props.selectTab(0);

                    if (Platform.OS === 'ios') {
                      Router.jumpTo(props, 'FeedStack');
                    } else {
                      // let routes = (route.state && route.state.routes) || [];
                      //
                      // routes = routes.map((route) => route.name);
                      //
                      // Router.route(props, 'FeedStack', routes);

                      Router.route(props, 'FeedStack');
                    }
                  }
                },
              })}
            />
            <Tab.Screen
              name="InboxStack"
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
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();

                  clearTimeout(store.getState().mainTabReducer.tapTimer);
                  props.setTapTimer(undefined);
                  props.setTapCount(0);

                  props.selectDrawer(1);
                  props.selectTab(1);

                  Router.jumpTo(props, 'InboxStack');
                },
              })}
            />
            <Tab.Screen
              name="CalendarStack"
              component={CalendarStackNavigator}
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
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();

                  clearTimeout(store.getState().mainTabReducer.tapTimer);
                  props.setTapTimer(undefined);
                  props.setTapCount(0);

                  props.selectDrawer(2);
                  props.selectTab(2);

                  Router.jumpTo(props, 'CalendarStack');
                },
              })}
            />
            <Tab.Screen
              name="ProfileStack"
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
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();

                  clearTimeout(store.getState().mainTabReducer.tapTimer);
                  props.setTapTimer(undefined);
                  props.setTapCount(0);

                  props.selectDrawer(3);
                  props.selectTab(3);

                  Router.jumpTo(props, 'ProfileStack');
                },
              })}
            />
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
    index: state.mainTabReducer.index,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectDrawer: (...args) => dispatch(DrawerAction.select(...args)),
    selectTab: (...args) => dispatch(MainTabAction.select(...args)),
    setTapCount: (...args) => dispatch(MainTabAction.setTapCount(...args)),
    setTapTimer: (...args) => dispatch(MainTabAction.setTapTimer(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTabNavigator);
