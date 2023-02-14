/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  CriteriaSectionAction,
  RecentSearchesSectionAction,
  FindTalentSectionAction,
} from '../../redux';

import { createStackNavigator } from '@react-navigation/stack';

import { getHeaderTitle } from '@react-navigation/elements';

import { BaseComponent } from '../../components';

import { Header } from '../../project-components';

import {
  FeedView,
  SearchView,
  SearchResultView,
  ProfileView,
} from '../../views';

import { TagProcessor } from '../../processors';

import { SearchProvider } from '../../providers';

import { Translation } from 'react-i18next';

const Stack = createStackNavigator();

const ic_header_1 = require('../../../assets/images/ic_header_1/ic_header_1.png');

class SearchStackNavigator extends BaseComponent {
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
              header: (info) => {
                const { navigation, route, options, back } = info;

                const title = getHeaderTitle(options, route.name);

                return (
                  <Header
                    hiddenLeft={!back}
                    info={info}
                    source={ic_header_1}
                    title={title}
                    onPressLeft={(info) => {
                      const { navigation, route } = info;

                      // console.log('[info]', info);
                      // console.log('[state]', navigation.getState());
                      // console.log('[navigation]', navigation);
                      // console.log('[route.name]', route.name);

                      // let state = navigation.getState();
                      //
                      // if (state && state.index == 1) {
                      //   props.resetCriteria();
                      //
                      //   props.resetRecentSearchesTags();
                      //
                      //   TagProcessor.reload();
                      // }
                      //
                      // if (back && back.title === t('views.search.header')) {
                      //   SearchProvider.search(props, { prefetch: true }, {})
                      //     .catch((error) => {
                      //       console.error(error);
                      //     });
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

                // console.log('[state-changed]', state);
                // console.log('[state-changed-screen-name]', state.routeNames[state.index]);

                let index = state.routeNames.findIndex((routeName) => {
                  return routeName === 'SearchResultView';
                });

                if (state.index < index) {
                  props.resetCriteria();

                  props.resetRecentSearchesTags();

                  TagProcessor.reload();

                  SearchProvider.search(props, { prefetch: true }, {})
                    .catch((error) => {
                      console.error(error);
                    });
                }
              },
            }}
          >
            <Stack.Screen
              name="SearchView"
              component={SearchView}
              options={{
                title: t('views.search.header'),
              }}
            />
            <Stack.Screen
              name="SearchResultView"
              component={SearchResultView}
              options={{
                title: t('views.search_result.header'),
              }}
            />
            <Stack.Screen
              name="ProfileView"
              component={ProfileView}
              options={{
                title: t('views.profile.header'),
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
  return {
    resetCriteria: (...args) => dispatch(CriteriaSectionAction.reset(...args)),
    resetRecentSearchesTags: (...args) => dispatch(RecentSearchesSectionAction.resetTags(...args)),
    setFindTalentTags: (...args) => dispatch(FindTalentSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStackNavigator);
