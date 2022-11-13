/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  AppAction,
  DataAction,
  DrawerAction,
  LaunchAction,
  MainTabAction,
  CriteriaSectionAction,
  RecentSearchesSectionAction,
} from '../../redux';

import { Environment } from '../../config';

import { StackActions } from '@react-navigation/native';

import { BaseComponent, Root, Header, Body, Footer, Image } from '../../components';

import {
  Theme,
  Router,
} from '../../utils';

import {
  AuthStorage,
} from '../../storages';

import {
  TagProvider,
  SearchProvider,
  FeedProvider,
} from '../../providers';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_splash_screen_bg = require('../../../assets/images/ic_splash_screen_bg/ic_splash_screen_bg.png');

class LaunchView extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();

    const { props } = this;

    this.initialize();
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.clearData();
  }

  initialize = () => {
    const { props } = this;

    props.selectDrawer(0);
    props.selectTab(0);

    TagProvider.prefetchTags(props)
      .catch((error) => {
        console.error(error);
      });

    AuthStorage.getToken()
      .then(async () => {
        await SearchProvider.prefetchRecentSearches(props);

        await FeedProvider.prefetchFeeds(props);

        Router.route(props, 'Main');
      })
      .catch((error) => {
        console.error(error);

        Router.route(props, 'Login');
      });
  };

  clearData = () => {
    const { props } = this;
  };

  renderHeader = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Header style={styles.header} />
        )}
      </Translation>
    );
  };

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body style={styles.body} />
        )}
      </Translation>
    );
  };

  renderFooter = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Footer style={styles.footer} />
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Root
            style={styles.root}
            source={ic_splash_screen_bg}
          >
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          </Root>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  root: {},
  header: {},
  body: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footer: {
    // backgroundColor: 'cyan',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    selectDrawer: (...args) => dispatch(DrawerAction.select(...args)),
    selectTab: (...args) => dispatch(MainTabAction.select(...args)),
    setCriteriaTags: (...args) => dispatch(CriteriaSectionAction.setTags(...args)),
    setRecentSearchesTags: (...args) => dispatch(RecentSearchesSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchView);
