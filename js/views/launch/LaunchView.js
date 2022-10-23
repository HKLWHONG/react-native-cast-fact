/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform, Image } from 'react-native';

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
  FindTalentSectionAction,
  FeedAction,
} from '../../redux';

import { Environment } from '../../config';

import { StackActions } from '@react-navigation/native';

import { BaseComponent, Root, Header, Body, Footer } from '../../components';

import {
  Theme,
  Router,
  TagProcessor,
  FeedProcessor,
  DummyData,
} from '../../utils';

import {
  AuthStorage,
  TagStorage,
  FeedStorage,
} from '../../storages';

import {
  TagProvider,
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

  initialize = async () => {
    const { props } = this;

    props.selectDrawer(0);
    props.selectTab(0);

    if (Environment.USE_DUMMY_DATA) {
      props.setDummyData(DummyData.tags);

      Router.route(props, 'Login');
    } else {
      let tags = await TagStorage.getTags()
        .catch((error) => {
          console.error(error);
        });

      if (tags) {
        props.setFindTalentTags(tags);
      }

      TagProvider.getTags(props, {})
        .then((json) => {
          let tags = TagProcessor.format(json.payload);

          TagStorage.setTags(tags)
            .catch((error) => {
              console.error(error);
            });

          props.setFindTalentTags(tags);
        })
        .catch((error) => {
          console.error(error);
        });

        AuthStorage.getToken()
          .then(async () => {
            let feeds = await FeedStorage.getFeeds()
              .catch((error) => {
                console.error(error);
              });

            if (feeds) {
              props.setFeedsPagingPage(1);

              props.setFeeds(feeds);
            } else {
              let page = 1;

              let json = await FeedProvider.getFeeds(props, {
                page: page,
                length: store.getState().feedReducer.feedsPaging.length,
              })
                .catch((error) => {
                  console.error(error);
                });

              if (json && json.payload && json.payload.length > 0) {
                props.setFeedsPagingPage(page);

                let feeds = FeedProcessor.format([], json.payload);

                FeedStorage.setFeeds(feeds)
                  .catch((error) => {
                    console.error(error);
                  });

                props.setFeeds(feeds);
              }
            }

            Router.route(props, 'Main');
          })
          .catch((error) => {
            console.error(error);

            Router.route(props, 'Login');
          });
    }
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
            source={ic_splash_screen_bg}>
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
    setDummyData: (...args) => dispatch(DataAction.setDummyData(...args)),
    selectDrawer: (...args) => dispatch(DrawerAction.select(...args)),
    selectTab: (...args) => dispatch(MainTabAction.select(...args)),
    setCriteriaTags: (...args) => dispatch(CriteriaSectionAction.setTags(...args)),
    setRecentSearchesTags: (...args) => dispatch(RecentSearchesSectionAction.setTags(...args)),
    setFindTalentTags: (...args) => dispatch(FindTalentSectionAction.setTags(...args)),
    setFeedsPagingPage: (...args) => dispatch(FeedAction.setFeedsPagingPage(...args)),
    setFeeds: (...args) => dispatch(FeedAction.setFeeds(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchView);
