/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';

import { connect } from 'react-redux';
import { DrawerAction, MainTabAction } from '../../redux';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { BaseComponent } from '../../components';

import { Theme } from '../../utils';

import {
  FeedStackNavigator,
  InboxStackNavigator,
  CalendarStackNavigator,
  ProfileStackNavigator,
} from '../../navigators';

import { Translation } from 'react-i18next';

import { Router } from '../../utils';

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
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      }}>
                      <Image
                        style={styles.icon}
                        source={focused ? ic_tab_bar_search_focused : ic_tab_bar_search}
                        resizeMode="center"
                      />
                      <View style={[styles.dot, dotStyle]} />
                    </View>
                  );
                },
                tabBarLabel: t(''),
              }}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();

                  props.selectDrawer(0);
                  props.selectTab(0);

                  Router.jumpTo(props, 'FeedStack');
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
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      }}>
                      <Image
                        style={styles.icon}
                        source={focused ? ic_tab_bar_inbox_focused : ic_tab_bar_inbox}
                        resizeMode="center"
                      />
                      <View style={[styles.dot, dotStyle]} />
                    </View>
                  );
                },
                tabBarLabel: t(''),
              }}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();

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
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      }}>
                      <Image
                        style={styles.icon}
                        source={focused ? ic_tab_bar_calendar_focused : ic_tab_bar_calendar}
                        resizeMode="center"
                      />
                      <View style={[styles.dot, dotStyle]} />
                    </View>
                  );
                },
                tabBarLabel: t(''),
              }}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();

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
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      }}>
                      <Image
                        style={styles.icon}
                        source={focused ? ic_tab_bar_profile_focused : ic_tab_bar_profile}
                        resizeMode="center"
                      />
                      <View style={[styles.dot, dotStyle]} />
                    </View>
                  );
                },
                tabBarLabel: t(''),
              }}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();

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
  iconContainer: {
    // width: Dimensions.get('window').width / 4,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 16,
    // paddingBottom: 24,
    // top: -8,
  },
  activeBackgroundColor: {
    // backgroundColor: '#404040',
  },
  icon: {
    // backgroundColor: '#f00',
    width: 32,
    height: 32,
    marginVertical: 12,
    marginBottom: 4
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTabNavigator);
