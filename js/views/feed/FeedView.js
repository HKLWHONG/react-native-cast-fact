/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  FeedAction,
  MainTabAction,
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

import { Theme, Router, FeedProcessor } from '../../utils';

import { FeedProvider } from '../../providers';

const preview = require('../../../assets/images/preview/preview.png');
const ic_checklist = require('../../../assets/images/ic_checklist/ic_checklist.png');
const ic_calendar = require('../../../assets/images/ic_calendar/ic_calendar.png');
const ic_stack = require('../../../assets/images/ic_stack/ic_stack.png');

class FeedView extends BaseComponent {
  constructor(props) {
    super(props);

    this.state={};
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

    this.loadFeeds();

    // this.loadFeedsFromDummyData();

    // this.loadTagsFromDummyData();

    // props.setFeeds(this.testAddFeedData(props.feeds, 5));
  };

  clearData = () => {
    const { props } = this;
  };

  loadFeeds = (feeds) => {
    const { props } = this;

    if (store.getState().feedReducer.feedsPaging.loading) {
      return;
    }

    props.setFeedsPagingLoading(true);

    FeedProvider.getFeeds(props, {
      page: store.getState().feedReducer.feedsPaging.page,
      length: store.getState().feedReducer.feedsPaging.length,
    })
      .then((json) => {
        props.setFeedsPagingLoading(false);
        props.setRefreshing(false);

        if (json.payload.length > 0) {
          props.setFeeds(FeedProcessor.format(feeds || props.feeds, json.payload));
        } else {
          props.setFeedsPagingPage(store.getState().feedReducer.feedsPaging.page - 1);
        }
      })
      .catch((error) => {
        console.error(error);

        props.setFeedsPagingLoading(false);
        props.setRefreshing(false);
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
            label={section.title}>
            <SingleTouch
              onPress={() => {
                Router.push(props, "FeedStack", "Search");
              }}>
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
            onPressGroupFrame={(groupFrame) => {
              props.setCriteriaTags([{
                ...groupFrame,
                data: groupFrame.data.map((tag) => {
                  return {
                    ...tag,
                    rightAccessoryType: 'delete',
                  };
                }),
              }]);

              Router.push(props, "FeedStack", "SearchResult");
            }}
            onPressTag={(tag) => {
              Router.push(props, "FeedStack", "Search");
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

    let profiles = props.dummyData.filter((data) => {
      // console.log('[data]', data);

      return data.label === 'profiles';
    });

    if (profiles.length > 0) {
      data = profiles[0].data.filter((profile) => {
        return profile.posts.length > 0;
      });
    }

    return (
      <Translation>
        {(t) => (
          <Section
            contentContainerStyle={styles.baseOnProjectsSectionContentContainer}
            source={ic_calendar}
            label={section.title}>
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

  onEndReached = () => {
    const { props } = this;

    console.log('[onEndReached]');

    if (store.getState().feedReducer.feedsPaging.loading) {
      return;
    }

    props.setFeedsPagingPage(store.getState().feedReducer.feedsPaging.page + 1);

    this.loadFeeds();

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
            label={section.title}>
            <FeedList
              data={props.feeds}
              onPressCalendar={({ item, index, separators }) => {
                // TODO
              }}
              onPressFollow={({ item, index, separators }) => {
                // console.log('[followed] ', item && item.profile && item.profile.followed);

                props.updateFeed(item.feedId, {
                  profile: {
                    ...item.profile,
                    followed: !(item && item.profile && item.profile.followed),
                  },
                });
              }}
              onPressLike={({ item, index, separators }) => {
                // console.log('[liked] ', item && item.post && item.post.liked);

                props.updateFeed(item.feedId, {
                  post: {
                    ...item.post,
                    liked: !(item && item.post && item.post.liked),
                  },
                });
              }}
              onPressBookmark={({ item, index, separators }) => {
                // console.log('[bookmarked] ', item && item.post && item.post.bookmarked);

                props.updateFeed(item.feedId, {
                  post: {
                    ...item.post,
                    bookmarked: !(item && item.post && item.post.bookmarked),
                  },
                });
              }}
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
            scrollable={false}>
            <List
              innerRef={(ref) => {
                props.setListRef(0, 0, ref);
              }}
              contentContainerStyle={styles.listContentContainer}
              sections={sections}
              renderItem={this.renderItem}
              SectionSeparatorComponent={this.renderSectionSeparatorComponent}
              androidRefreshControlColor={Theme.colors.general.black}
              iosRefreshControlColor={Theme.colors.general.white}
              refreshing={props.refreshing}
              onRefresh={(refreshing) => {
                props.setRefreshing(true);

                props.setFeedsPagingPage(1);

                this.loadFeeds([]);
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
    refreshing: state.feedReducer.refreshing,
    feeds: state.feedReducer.feeds,
    dummyData: state.dataReducer.dummyData,
    recentSearchesTags: state.recentSearchesSectionReducer.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(FeedAction.reset(...args)),
    setRefreshing: (...args) => dispatch(FeedAction.setRefreshing(...args)),
    setFeedsPagingLoading: (...args) => dispatch(FeedAction.setFeedsPagingLoading(...args)),
    setFeedsPagingPage: (...args) => dispatch(FeedAction.setFeedsPagingPage(...args)),
    setFeeds: (...args) => dispatch(FeedAction.setFeeds(...args)),
    updateFeed: (...args) => dispatch(FeedAction.updateFeed(...args)),
    setListRef: (...args) => dispatch(MainTabAction.setListRef(...args)),
    setCriteriaTags: (...args) => dispatch(CriteriaSectionAction.setTags(...args)),
    setFindTalentTags: (...args) => dispatch(FindTalentSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
