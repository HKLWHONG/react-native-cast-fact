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

import { Header, Button } from '../../project-components';

import { Theme } from '../../utils';

import { ProjectView } from '../../views';

import { Translation } from 'react-i18next';

import ContextMenu from "react-native-context-menu-view";

const Stack = createStackNavigator();

const ic_header_3 = require('../../../assets/images/ic_header_3/ic_header_3.png');

const ic_calendar_plus = require('../../../assets/images/ic_calendar_plus/ic_calendar_plus.png');

class ProjectStackNavigator extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  renderRightView = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <ContextMenu
            actions={[{ title: "Title 1" }, { title: "Title 2" }]}
            previewBackgroundColor={'transparent'}
            onPress={(e) => {
              console.log(
                `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`
              );
            }}
            onCancel={(e) => {
              console.log(
                `Cancelled`
              );
            }}
          >
            <Button
              style={styles.button}
              type="circle"
              source={ic_calendar_plus}
              resizeMode="center"
            />
          </ContextMenu>
        )}
      </Translation>
    );
  };

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
                    hiddenRight={false}
                    navigation={navigation}
                    source={ic_header_3}
                    title={title}
                    renderRightView={this.renderRightView}
                  />
                );
              },
              animationEnabled: Platform.OS === 'ios',
            }}
          >
            <Stack.Screen
              name="Project"
              component={ProjectView}
              options={{
                title: t('views.project.header'),
              }}
            />
          </Stack.Navigator>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStackNavigator);
