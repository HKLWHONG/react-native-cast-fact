/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { connect } from 'react-redux';
import { DrawerNavigatorAction, MainTabNavigatorAction } from '../../redux';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { BaseComponent, Root, Header, Body, Footer, Image } from '../../components';

import { DrawerItem } from '../../project-components';

import {
  MainTabNavigator,
  LoginStackNavigator,
  SignUpStackNavigator,
} from '../../navigators';

import { Router } from '../../utils';

import {
  // CreateProjectSlideSheetContainerView,
  SettingsSlideSheetContainerView,
  WelcomeSlideSheetContainerView,
} from '../../views';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class DrawerNavigator extends BaseComponent {
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

  renderHeader = () => {
    return <Translation>{(t) => <Header style={styles.header} />}</Translation>;
  };

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body style={styles.body}>
            <DrawerItem
              focused={props.index === 0}
              onPress={() => {
                props.selectDrawer(0);
                props.selectTab(0);

                Router.route(props, 'SearchStackNavigator');
              }}
            />
          </Body>
        )}
      </Translation>
    );
  };

  renderFooter = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Footer style={styles.footer}>
            <Text style={styles.version}>
              {`${t('app.version')} 1.0.0`}
            </Text>
          </Footer>
        )}
      </Translation>
    );
  };

  renderDrawerContent = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Root style={styles.root}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          </Root>
        )}
      </Translation>
    );
  };

  renderDrawerStackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
      >
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
        <Stack.Group
          screenOptions={{
            presentation: 'transparentModal',
            headerShown: false,
            animationEnabled: false,
          }}
        >
          {
            /*
              <Stack.Screen name="CreateProjectSlideSheetContainerView" component={CreateProjectSlideSheetContainerView} />
            */
          }
          <Stack.Screen name="WelcomeSlideSheetContainerView" component={WelcomeSlideSheetContainerView} />
          <Stack.Screen name="LoginStackNavigator" component={LoginStackNavigator} />
          <Stack.Screen name="SignUpStackNavigator" component={SignUpStackNavigator} />
          <Stack.Screen name="SettingsSlideSheetContainerView" component={SettingsSlideSheetContainerView} />
        </Stack.Group>
      </Stack.Navigator>
    );
  };

  render() {
    const {props} = this;

    return (
      <Translation>
        {(t) => (
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
            drawerContent={this.renderDrawerContent}>
            <Drawer.Screen
              name="DrawerStack"
              component={this.renderDrawerStackNavigator}
            />
          </Drawer.Navigator>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    // backgroundColor: 'grey',
    backgroundColor: '#000000',
  },
  header: {
    // backgroundColor: 'red',
  },
  body: {
    // backgroundColor: 'green',
    justifyContent: 'center',
    padding: 16,
    paddingTop: 50,
  },
  footer: {
    // backgroundColor: 'blue',
    justifyContent: 'center',
    padding: 16,
  },
  version: {
    color: '#FFFFFF',
    fontSize: 12,
    marginHorizontal: 16,
    marginVertical: 16,
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    selectDrawer: (...args) => dispatch(DrawerNavigatorAction.select(...args)),
    selectTab: (...args) => dispatch(MainTabNavigatorAction.select(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);
