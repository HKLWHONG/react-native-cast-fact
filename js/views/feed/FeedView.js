/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  FeedViewAction,
  MainTabNavigatorAction,
  CriteriaSectionAction,
  FindTalentSectionAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  List,
  SingleTouch,
} from '../../components';

import {
  Separator,
  Section,
  SearchBar,
  RecentSearchesSection,
  ProfileList,
  FeedList,
  GroupFrame,
  Tag,
} from '../../project-components';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { Theme, Router } from '../../utils';

import { FeedProcessor, CriteriaProcessor, TagProcessor } from '../../processors';

import { FeedProvider, SearchProvider } from '../../providers';

const ic_checklist = require('../../../assets/images/ic_checklist/ic_checklist.png');
const ic_calendar = require('../../../assets/images/ic_calendar/ic_calendar.png');
const ic_stack = require('../../../assets/images/ic_stack/ic_stack.png');

export const IDENTIFIER = 'FeedView';

class FeedView extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {};
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

    // this.loadFeeds();

    console.log('[feed-page]', store.getState().feedViewReducer.feedsPaging.page);

    // this.loadFeedsFromDummyData();

    // this.loadTagsFromDummyData();

    // props.setFeeds(this.testAddFeedData(props.feeds, 5));
  };

  clearData = () => {
    const { props } = this;
  };

  loadMoreFeeds = (feeds) => {
    const { props } = this;

    if (store.getState().feedViewReducer.feedsPaging.loading) {
      return;
    }

    props.setFeedsPagingLoading(true);

    let page = store.getState().feedViewReducer.feedsPaging.page + 1;

    FeedProvider.getFeeds(props, {
      page: page,
      length: store.getState().feedViewReducer.feedsPaging.length,
    })
      .then(({ json }) => {
        props.setFeedsPagingLoading(false);
        // props.setRefreshing(false);

        if (json.payload.length > 0) {
          props.setFeedsPagingPage(page);

          props.setFeeds(FeedProcessor.format(feeds || props.feeds, json.payload));
        }
      })
      .catch((error) => {
        console.error(error);

        props.setFeedsPagingLoading(false);
        // props.setRefreshing(false);
      });
  };

  loadFeedsFromDummyData = () => {
    const { props } = this;

    let profiles = props.dummyData.filter((data) => {
      // console.log('[data]', data);

      return data.label === 'profiles';
    });

    if (profiles.length === 0) {
      return;
    }

    let feeds = [];

    profiles[0].data.forEach((profile) => {
      profile.posts.forEach((post) => {
        profile = { ...profile };

        delete profile.posts;

        feeds.push({
          post: post,
          ...profile,
        });
      });
    });

    feeds = feeds.map((feed, index) => {
      return {
        ...feed,
        feedId: (props.feeds.length + index).toString(),
      }
    })

    props.setFeeds([...props.feeds, ...feeds]);
  };

  loadTagsFromDummyData = () => {
    const { props } = this;

    let tags = props.dummyData.filter((data) => {
      // console.log('[data]', data);

      return data.label === 'tags';
    });

    if (tags.length === 0) {
      return;
    }

    props.setFindTalentTags(tags[0].data.map((tag) => {
      return {...tag};
    }));
  };

  testAddFeedData = (data, num) => {
    const { props } = this;

    if (!data) {
      return;
    }

    let newData = [];

    for (let i = data.length; i < data.length + num; i += 1) {
      newData.push(
        {
          feedId: i.toString(),
          uri: i % 2 === 0 ? 'https://kcplace.com/preview.png' : 'https://kcplace.com/preview2.png',
          name: 'Wong Siu Yu',
          title: 'Camera',
          followed: false,
          liked: false,
          bookmarked: false,
        },
      );
    }

    return [...data, ...newData];
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

  renderCriteriaSection = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            source={ic_checklist}
            label={section.title}
          >
            <SingleTouch
              onPress={() => {
                Router.push(props, 'FeedStackNavigator', 'SearchView');
              }}
            >
              <SearchBar disabled />
            </SingleTouch>
          </Section>
        )}
      </Translation>
    );
  };

  renderRecentSearchesSection = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <RecentSearchesSection
            label={section.title}
            onPressGroupFrame={async (groupFrame) => {
              let tags = store.getState().criteriaSectionReducer.tags;

              groupFrame.data.forEach((tag) => {
                tags = CriteriaProcessor.addTag(tags, tag);
              });

              props.setCriteriaTags(tags);

              TagProcessor.reload();

              await SearchProvider.presearch(props, {}, { disableAddRecentSearches: true });

              Router.push(props, 'FeedStackNavigator', 'SearchResultView');
            }}
            onPressTag={(tag) => {
              Router.push(props, 'FeedStackNavigator', 'SearchView');
            }}
          />
        )}
      </Translation>
    );
  };

  renderBaseOnProjectsSection = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    let data = [];

    props.feeds.forEach((feed) => {
      if (!feed.profile || !feed.post) {
        return;
      }

      let found = false;

      data.forEach((item) => {
        if (!item.profile || !item.post) {
          return;
        }

        if (feed.profile.id === item.profile.id) {
          found = true;
        }
      });

      if (!found) {
        data.push(feed);
      }
    });

    return (
      <Translation>
        {(t) => (
          <Section
            contentContainerStyle={styles.baseOnProjectsSectionContentContainer}
            source={ic_calendar}
            label={section.title}
          >
            <ProfileList
              // style={{backgroundColor: 'cyan'}}
              data={data}
              onPressItem={({ item, index, separators }) => {
                console.log('[item] ', item);
                console.log('[index] ', index);
                console.log('[separators] ', separators);
              }}
            />
          </Section>
        )}
      </Translation>
    );
  };

  onViewMoreTextLayout = ({ item, index, separators, nativeEvent }) => {
    const { props } = this;

    const { feedId, numberOfLines } = item;
    const { length } = nativeEvent.lines;

    if (numberOfLines) {
      return;
    }

    console.log('[view-more-text-layout-item-feedId]', feedId);
    console.log('[view-more-text-layout-nativeEvent-lines-length]', length);

    props.updateFeed(feedId, { numberOfLines: length });
  };

  onPressProfile = ({ item, index, separators }) => {
    const { props } = this;

    console.log('[onPressProfile]');

    Router.push(props, 'FeedStackNavigator', 'ProfileView');
  };

  onPressCalendar = ({ item, index, separators }) => {
    const { props } = this;

    // TODO
  };

  onPressFollow = ({ item, index, separators }) => {
    const { props } = this;

    // console.log('[followed] ', item && item.profile && item.profile.followed);

    props.updateFeed(item.feedId, {
      profile: {
        ...item.profile,
        followed: !(item && item.profile && item.profile.followed),
      },
    });
  };

  onPressLike = ({ item, index, separators }) => {
    const { props } = this;

    // console.log('[liked] ', item && item.post && item.post.liked);

    props.updateFeed(item.feedId, {
      post: {
        ...item.post,
        liked: !(item && item.post && item.post.liked),
      },
    });
  };

  onPressBookmark = ({ item, index, separators }) => {
    const { props } = this;

    // console.log('[bookmarked] ', item && item.post && item.post.bookmarked);

    props.updateFeed(item.feedId, {
      post: {
        ...item.post,
        bookmarked: !(item && item.post && item.post.bookmarked),
      },
    });
  };

  onPressViewMoreText = ({ item, index, separators }) => {
    const { props } = this;

    const { feedId, expanded } = item;

    console.log('[view-more-text-expanded] ', expanded);

    props.updateFeed(feedId, { expanded: !expanded });
  };

  onEndReached = () => {
    const { props } = this;

    console.log('[onEndReached]');

    this.loadMoreFeeds();

    // this.loadFeedsFromDummyData();

    // props.setFeeds(this.testAddFeedData(props.feeds, 5));
  };

  renderFeedSection = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            contentContainerStyle={styles.feedSectionContentContainer}
            source={ic_stack}
            label={section.title}
          >
            <FeedList
              onViewMoreTextLayout={this.onViewMoreTextLayout}
              data={props.feeds}
              onPressProfile={this.onPressProfile}
              onPressCalendar={this.onPressCalendar}
              onPressFollow={this.onPressFollow}
              onPressLike={this.onPressLike}
              onPressBookmark={this.onPressBookmark}
              onPressViewMoreText={this.onPressViewMoreText}
              onEndReached={this.onEndReached}
            />
          </Section>
        )}
      </Translation>
    );
  };

  renderItem = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    // console.log('[item]', item);
    // console.log('[index]', index);
    // console.log('[section]', section);
    // console.log('[separators]', separators);

    if (props.recentSearchesTags.length > 0) {
      switch (section.index) {
        case 0:
          return this.renderCriteriaSection(params);

        case 1:
          return this.renderRecentSearchesSection(params);

        case 2:
          return this.renderBaseOnProjectsSection(params);

        case 3:
          return this.renderFeedSection(params);

        default:
          break;
      }
    } else {
      switch (section.index) {
        case 0:
          return this.renderCriteriaSection(params);

        case 1:
          return this.renderBaseOnProjectsSection(params);

        case 2:
          return this.renderFeedSection(params);

        default:
          break;
      }
    }
  };

  renderSectionSeparatorComponent = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Separator />
        )}
      </Translation>
    );
  };

  renderBody = () => {
    const { props } = this;

    let sections = [
      {
        title: i18n.t('app.criteria'),
        data: [''],
      },
    ];

    if (props.recentSearchesTags.length > 0) {
      sections.push(
        {
          title: i18n.t('app.recent_searches'),
          data: [''],
        },
      );
    }

    sections.push(
      {
        title: i18n.t('app.based_on_projects_format').replace('{0}', '1'),
        data: [''],
      },
      {
        title: i18n.t('app.feed'),
        data: [''],
      },
    );

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}
            scrollable={false}
          >
            <List
              innerRef={(ref) => {
                if (!ref) {
                  return;
                }

                props.setListRef(0, props.navigation.getState().index, ref);
              }}
              contentContainerStyle={styles.listContentContainer}
              sections={sections}
              renderItem={this.renderItem}
              SectionSeparatorComponent={this.renderSectionSeparatorComponent}
              androidRefreshControlColor={Theme.colors.general.black}
              iosRefreshControlColor={Theme.colors.general.white}
              refreshing={props.refreshing}
              onRefresh={async (refreshing) => {
                props.setRefreshing(true);

                // props.setFeedsPagingPage(0);
                //
                // this.loadFeeds([]);

                await FeedProvider.prefetchFeeds(props);

                props.setRefreshing(false);
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
          <Footer style={styles.footer} />
        )}
      </Translation>
    );
  };

  render() {
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
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.colors.background.primary,
  },
  header: {},
  body: {
    // backgroundColor: '#f00',
  },
  listContentContainer: {
    paddingHorizontal: 0,
  },
  baseOnProjectsSectionContentContainer: {
    paddingHorizontal: 0,
  },
  feedSectionContentContainer: {
    paddingHorizontal: 0,
  },
  footer: {},
});

function mapStateToProps(state) {
  return {
    refreshing: state.feedViewReducer.refreshing,
    feeds: state.feedViewReducer.feeds,
    dummyData: state.dataReducer.dummyData,
    recentSearchesTags: state.recentSearchesSectionReducer.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(FeedViewAction.reset(...args)),
    setRefreshing: (...args) => dispatch(FeedViewAction.setRefreshing(...args)),
    setFeedsPagingLoading: (...args) => dispatch(FeedViewAction.setFeedsPagingLoading(...args)),
    setFeedsPagingPage: (...args) => dispatch(FeedViewAction.setFeedsPagingPage(...args)),
    setFeeds: (...args) => dispatch(FeedViewAction.setFeeds(...args)),
    updateFeed: (...args) => dispatch(FeedViewAction.updateFeed(...args)),
    setListRef: (...args) => dispatch(MainTabNavigatorAction.setListRef(...args)),
    setCriteriaTags: (...args) => dispatch(CriteriaSectionAction.setTags(...args)),
    setFindTalentTags: (...args) => dispatch(FindTalentSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
