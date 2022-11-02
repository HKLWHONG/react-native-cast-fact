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

import { FeedView, SearchView, SearchResultView } from '../../views';

import { TagProcessor } from '../../processors';

import { SearchProvider } from '../../providers';

import { Translation } from 'react-i18next';

const Stack = createStackNavigator();

const ic_header_1 = require('../../../assets/images/ic_header_1/ic_header_1.png');

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
                    source={ic_header_1}
                    title={title}
                    onPressLeft={(navigation) => {
                      // console.log('[route.name]', route.name);

                      props.resetCriteria();

                      props.resetRecentSearchesTags();

                      props.setFindTalentTags(store.getState().dataReducer.findTalentSectionTags);

                      if (route.name === 'SearchResult') {
                        SearchProvider.search(props, { prefetch: true }, {})
                          .catch((error) => {
                            console.error(error);
                          });
                      }

                      navigation.goBack();
                    }}
                  />
                );
              },
              animationEnabled: Platform.OS === 'ios',
            }}>
            <Stack.Screen
              name="Feed"
              component={FeedView}
              options={{
                title: t('views.feed.header'),
              }}
            />
            <Stack.Screen
              name="Search"
              component={SearchView}
              options={{
                title: t('views.search.header'),
              }}
            />
            <Stack.Screen
              name="SearchResult"
              component={SearchResultView}
              options={{
                title: t('views.search_result.header'),
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedStackNavigator);
