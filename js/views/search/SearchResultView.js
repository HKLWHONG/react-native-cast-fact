/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  SearchResultAction,
  MainTabAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  List,
} from '../../components';

import {
  Separator,
  Section,
  CriteriaSection,
  ProfileList,
  FeedList,
  GroupFrame,
  Tag,
} from '../../project-components';

import { Theme, Router, FeedProcessor } from '../../utils';

import { SearchProvider } from '../../providers';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_no_result = require('../../../assets/images/ic_no_result/ic_no_result.png');

class SearchResultView extends BaseComponent {
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

    console.log('[results]', props.results);

    if (props.results.length > 0) {
      props.setFeeds(FeedProcessor.format(props.feeds, props.results));
    }

    // this.loadFeeds();

    // this.search();

    // props.setFeeds(this.testAddFeedData(props.feeds, 5));

    // props.setFeeds(FeedProcessor.format(props.feeds, props.results));
  };

  clearData = () => {
    const { props } = this;

    props.reset();
  };

  // loadFeeds = (feeds) => {
  //   const { props } = this;
  //
  //   if (store.getState().searchResultReducer.feedsPaging.loading) {
  //     return;
  //   }
  //
  //   props.setFeedsPagingLoading(true);
  //   // props.setSearched(false);
  //
  //   let page = store.getState().searchResultReducer.feedsPaging.page + 1;
  //
  //   SearchProvider.search(props, {
  //     page: page,
  //     length: store.getState().searchResultReducer.feedsPaging.length,
  //   })
  //     .then((json) => {
  //       // props.setSearched(true);
  //       props.setFeedsPagingLoading(false);
  //
  //       if (json.payload.length > 0) {
  //         props.setFeedsPagingPage(page);
  //
  //         props.setFeeds(FeedProcessor.format(feeds || props.feeds, json.payload));
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //
  //       // props.setSearched(true);
  //       props.setFeedsPagingLoading(false);
  //       props.setRefreshing(false);
  //     });
  // };

  testAddFeedData = (data, num) => {
    const { props } = this;

    if (!data) {
      return;
    }

    let newData = [];

    for (let i = data.length; i < data.length + num; i += 1) {
      let uri1 = 'https://kcplace.com/preview.png';
      let uri2 = 'https://kcplace.com/preview2.png';

      newData.push(
        {
          feedId: i.toString(),
          uri: uri1,
          uris: [
            { uri: uri1 },
            { uri: uri2 },
            { uri: uri1 },
            { uri: uri2 },
            { uri: uri1 },
            { uri: uri2 },
          ],
          name: 'Cath Wong 黃妍',
          title: 'Photographer',
          followed: false,
        },
      );
    }

    return [...data, ...newData];
  };

  search = () => {
    const { props } = this;

    let criteriaTags = store.getState().criteriaSectionReducer.tags;

    let profiles = props.dummyData.filter((data) => {
      // console.log('[data]', data);

      return data.label === 'profiles';
    });

    // console.log('[criteriaTags', criteriaTags);

    if (profiles.length === 0) {
      return;
    }

    let feeds = [];

    profiles[0].data.forEach((profile) => {
      let matched = false;

      // console.log('[profile.tags]', profile.tags);
      if (criteriaTags.length === 0) {
        matched = true;
      }

      profile.tags.forEach((tag) => {
        if (matched) {
          return;
        }

        let matchedCriteriaTags = criteriaTags[0].data.filter((criteriaTag) => {
          return tag.text && criteriaTag.text && tag.text.toLowerCase() === criteriaTag.text.toLowerCase();
        });

        if (matchedCriteriaTags.length === 0) {
          return;
        }

        matched = true;
      });

      if (!matched) {
        return;
      }

      feeds.push({ profile: profile });
    });

    feeds = feeds.map((feed, index) => {
      return {
        ...feed,
        feedId: (props.feeds.length + index).toString(),
      }
    })

    console.log('[result.found]', feeds.length);

    props.setFeeds(feeds);
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
          <CriteriaSection
            label={section.title}
            onChangeTags={() => {
              // props.setFeedsPagingPage(0);
              //
              // this.loadFeeds([]);
            }} />
        )}
      </Translation>
    );
  };

  onEndReached = () => {
    const { props } = this;

    console.log('[onEndReached]');

    if (store.getState().searchResultReducer.feedsPaging.loading) {
      return;
    }

    // this.loadFeeds();

    // props.setFeeds(this.testAddFeedData(props.feeds, 5));
  };

  renderFeedSection = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            headerContainerStyle={styles.resultSectionHeaderContainer}
            contentContainerStyle={styles.resultSectionContentContainer}
            label={section.title}>
            <FeedList
              type="simple"
              data={props.feeds}
              onPressCalendar={({ item, index, separators }) => {
                // TODO
              }}
              onPressFollow={({ item, index, separators }) => {
                // console.log('[item.followed] ', item.followed);

                props.updateFeed(item.feedId, { followed: !item.followed });
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

    switch (section.index) {
      case 0:
        return this.renderCriteriaSection(params);

      case 1:
        return this.renderFeedSection(params);

      default:
        break;
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

  renderListView = (sections) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <List
            innerRef={(ref) => {
              props.setListRef(0, 2, ref);
            }}
            contentContainerStyle={styles.listContentContainer}
            sections={sections}
            renderItem={this.renderItem}
            SectionSeparatorComponent={this.renderSectionSeparatorComponent}
            androidRefreshControlColor={Theme.colors.general.black}
            iosRefreshControlColor={Theme.colors.general.white}
            refreshing={props.refreshing}
            onRefresh={(refreshing) => {
              // props.setRefreshing(true);
              //
              // props.setFeedsPagingPage(0);
              //
              // this.loadFeeds([]);
            }}
          />
        )}
      </Translation>
    );
  };

  renderNoReultView = (sections) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.noReultContainer}>
            {this.renderCriteriaSection(sections)}
            <Separator />
            <View style={styles.noReultSubContainer}>
              <Image
                style={styles.noResultImage}
                source={ic_no_result}
                resizeMode="center"
              />
              <Text
                style={styles.noResultText}
              >
                {t('app.no_result')}
              </Text>
              <Text
                style={styles.noResultDescriptionText}
              >
                {t('app.no_result_description')}
              </Text>
            </View>
          </View>
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
      {
        title: i18n.t(''),
        data: [''],
      },
    ];

    let children = this.renderListView(sections);

    if (props.searched && props.feeds && props.feeds.length === 0) {
      children = this.renderNoReultView({
        section: sections[0],
      });
    }

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}
            scrollable={false}
          >
            {children}
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
  resultSectionHeaderContainer: {
    // backgroundColor: '#f00',
    paddingVertical: 8,
  },
  resultSectionContentContainer: {
    // backgroundColor: '#ff0',
    paddingHorizontal: 0,
  },
  noReultContainer: {
    // backgroundColor: '#f00',
    flex: 1,
    paddingBottom: 64,
  },
  noReultSubContainer: {
    // backgroundColor: '#00f',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultImage: {
    width: 96,
    height: 96,
  },
  noResultText: {
    // backgroundColor: '#f00',
    color: Theme.colors.text.subtitle,
    fontSize: 17,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 2.22,
    textTransform: 'uppercase',
  },
  noResultDescriptionText: {
    // backgroundColor: '#f00',
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    letterSpacing: 0,
  },
  footer: {},
});

function mapStateToProps(state) {
  return {
    refreshing: state.searchResultReducer.refreshing,
    searched: state.searchResultReducer.searched,
    results: state.searchResultReducer.results,
    feeds: state.searchResultReducer.feeds,
    dummyData: state.dataReducer.dummyData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SearchResultAction.reset(...args)),
    setRefreshing: (...args) => dispatch(SearchResultAction.setRefreshing(...args)),
    // setSearched: (...args) => dispatch(SearchResultAction.setSearched(...args)),
    setFeedsPagingLoading: (...args) => dispatch(SearchResultAction.setFeedsPagingLoading(...args)),
    setFeedsPagingPage: (...args) => dispatch(SearchResultAction.setFeedsPagingPage(...args)),
    setFeeds: (...args) => dispatch(SearchResultAction.setFeeds(...args)),
    updateFeed: (...args) => dispatch(SearchResultAction.updateFeed(...args)),
    setListRef: (...args) => dispatch(MainTabAction.setListRef(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultView);
