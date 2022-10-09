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

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { Theme, Router } from '../../utils';

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

    this.search();

    // props.setFeeds(this.testAddFeedData(props.feeds, 5));
  };

  clearData = () => {
    const { props } = this;

    props.reset();
  };

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
              console.log('[onChangeTags]');

              this.search();
          }} />
        )}
      </Translation>
    );
  };

  onEndReached = () => {
    const { props } = this;

    console.log('[onEndReached]');

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
            contentContainerStyle={styles.listContentContainer}
            sections={sections}
            renderItem={this.renderItem}
            SectionSeparatorComponent={this.renderSectionSeparatorComponent}
            androidRefreshControlColor={Theme.colors.general.black}
            iosRefreshControlColor={Theme.colors.general.white}
            refreshing={props.refreshing}
            onRefresh={(refreshing) => {
              props.setRefreshing(true);

              setTimeout(() => {
                props.setRefreshing(false);
              }, 500);
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

    if (props.feeds && props.feeds.length === 0) {
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
    dummyData: state.dataReducer.dummyData,
    refreshing: state.searchResultReducer.refreshing,
    feeds: state.searchResultReducer.feeds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SearchResultAction.reset(...args)),
    setRefreshing: (...args) => dispatch(SearchResultAction.setRefreshing(...args)),
    setFeeds: (...args) => dispatch(SearchResultAction.setFeeds(...args)),
    updateFeed: (...args) => dispatch(SearchResultAction.updateFeed(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultView);
