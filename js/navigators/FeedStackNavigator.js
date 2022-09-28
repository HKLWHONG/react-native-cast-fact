/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';

import { getHeaderTitle } from '@react-navigation/elements';

import { BaseComponent } from '../components';

import { Header } from '../project-components';

import { FeedView } from '../views';

import { Translation } from 'react-i18next';

const Stack = createStackNavigator();

class FeedStackNavigator extends BaseComponent {
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
              header: ({ navigation, route, options, back }) => {
                const title = getHeaderTitle(options, route.name);

                return (
                  <Header
                    hiddenLeft={!back}
                    navigation={navigation}
                    title={title}
                  />
                );
              },
              gestureEnabled: false,
            }}>
            <Stack.Screen
              name="Feed"
              component={FeedView}
              options={{
                title: t('views.feed.header'),
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedStackNavigator);
