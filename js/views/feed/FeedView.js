/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import {
  FeedAction,
  CriteriaAction,
  RecentSearchesAction,
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
  ProfileList,
  FeedList,
  GroupFrame,
  Tag,
} from '../../project-components';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { Theme, Router } from '../../utils';

const preview = require('../../../assets/images/preview/preview.png');
const ic_checklist = require('../../../assets/images/ic_checklist/ic_checklist.png');
const ic_clock = require('../../../assets/images/ic_clock/ic_clock.png');
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

  initialize = async () => {
    const { props } = this;

    props.setCriteriaTags([
      {
        groupFrameId: '0',
        data: [
          {
            tagId: '0',
            text: 'Male',
            rightAccessoryType: 'delete',
          },
          {
            tagId: '1',
            text: 'Blue Eye',
            dotColor: Theme.colors.dot.blue,
            leftAccessoryType: 'dot',
            rightAccessoryType: 'delete',
          },
        ]
      },
    ]);

    props.setRecentSearchesTags([
      {
        groupFrameId: '0',
        data: [
          {
            tagId: '0',
            text: 'Muscular',
          },
          {
            tagId: '1',
            text: 'Black Hair',
            dotColor: Theme.colors.dot.black,
          },
        ]
      },
      {
        groupFrameId: '1',
        data: [
          {
            tagId: '0',
            text: 'Female',
          },
          {
            tagId: '1',
            text: 'Red Eye',
            dotColor: Theme.colors.dot.red,
            leftAccessoryType: 'dot',
          },
          {
            tagId: '2',
            text: '~165CM',
          },
          {
            tagId: '3',
            text: 'Film',
          },
          {
            tagId: '4',
            text: 'Korean',
          },
        ],
      },
    ]);

    props.setFeedList(this.testAddFeedData(props.feedList, 5));
  };

  clearData = () => {
    const { props } = this;
  };

  testAddFeedData = (list, num) => {
    const { state } = this;

    let data = [];

    for (let i = 0; i < num; i += 1) {
      data.push(
        {
          feedId: i.toString(),
          uri: i % 2 == 0 ? 'https://kcplace.com/preview.png' : 'https://kcplace.com/preview2.png',
          name: 'Wong Siu Yu',
          title: 'Camera',
          isFollowed: false,
          isLiked: false,
          isBookmarked: false,
        },
      );
    }

    return [...list, ...data];
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
            iconSource={ic_checklist}
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

    // console.log('[props.tags]', props.tags);

    let children = (
      Array(props.tags.length)
        .fill()
        .map((_, i) => i)
        .map((i) => {
          let groupFrame = props.tags[i];

          let style = {};

          if (i > 0) {
            style = {
              ...style,
              marginTop: 8,
            };
          }

          let tags = (
            Array(groupFrame.data.length)
              .fill()
              .map((_, t) => t)
              .map((t) => {
                let tag = groupFrame.data[t];

                // console.log('[tag.tagId]', tag.tagId);

                return (
                  <Tag
                    key={t.toString()}
                    info={{
                      groupFrameId: groupFrame.groupFrameId,
                      tagId: tag.tagId,
                    }}
                    dotStyle={{ backgroundColor: tag.dotColor }}
                    text={tag.text}
                    leftAccessoryType={tag.leftAccessoryType}
                    rightAccessoryType={tag.rightAccessoryType}
                    onPress={({ groupFrameId, tagId }) => {
                      // console.log(`[groupFrameId] ${groupFrameId}, [tagId] ${tagId}`);
                    }}
                  />
                );
              })
          );

          return (
            <GroupFrame
              key={i.toString()}
              info={{
                groupFrameId: groupFrame.groupFrameId,
              }}
              style={style}
              rightAccessoryType="delete"
              onPressRightAccessory={({ groupFrameId }) => {
                console.log('[groupFrameId] ', groupFrameId);

                props.deleteRecentSearchesGroupFrame(groupFrameId);
              }}>
              {tags}
            </GroupFrame>
          );
        })
    );

    return (
      <Translation>
        {(t) => (
          <Section
            iconSource={ic_clock}
            label={section.title}
            rightAccessoryType="delete"
            onPress={() => {
              props.deleteTags();
            }}>
            {children}
          </Section>
        )}
      </Translation>
    );
  };

  renderBaseOnProjectsSection = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            iconSource={ic_calendar}
            label={section.title}>
            <ProfileList
              // style={{backgroundColor: 'cyan'}}
              data={[
                {
                  uri: 'https://kcplace.com/preview.png',
                  name: 'Tsz',
                  title: 'Photographer',
                },
                {
                  uri: 'https://kcplace.com/preview.png',
                  name: 'Kelvin Chuk',
                  title: 'Writer',
                },
                {
                  uri: 'https://kcplace.com/preview.png',
                  name: 'Wong Siu Yu',
                  title: 'Camera',
                },
              ]}
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

    props.setFeedList(this.testAddFeedData(props.feedList, 5));
  };

  renderFeedSection = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            contentContainerStyle={styles.feedSectionContentContainer}
            iconSource={ic_stack}
            label={section.title}>
            <FeedList
              data={props.feedList}
              onPressCalendar={({ item, index, separators }) => {
                // TODO
              }}
              onPressFollow={({ item, index, separators }) => {
                // console.log('[item.isFollowed] ', item.isFollowed);

                props.setFeedListFollowed(item.feedId, !item.isFollowed);
              }}
              onPressLike={({ item, index, separators }) => {
                // console.log('[item.isLiked] ', item.isLiked);

                props.setFeedListLiked(item.feedId, !item.isLiked);
              }}
              onPressBookmark={({ item, index, separators }) => {
                // console.log('[item.isBookmarked] ', item.isBookmarked);

                props.setFeedListBookmarked(item.feedId, !item.isBookmarked);
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
  };

  renderSectionSeparatorComponent = () => {
    const { props } = this;

    return (
      <Separator />
    );
  };

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}
            scrollable={false}>
            <List
              contentContainerStyle={styles.listContentContainer}
              sections={[
                {
                  title: t('app.criteria'),
                  data: [''],
                },
                {
                  title: t('app.recent_searches'),
                  data: [''],
                },
                {
                  title: t('app.based_on_projects_format').replace('{0}', '1'),
                  data: [''],
                },
                {
                  title: t('app.feed'),
                  data: [''],
                },
              ]}
              renderItem={this.renderItem}
              SectionSeparatorComponent={this.renderSectionSeparatorComponent}
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
  feedSectionContentContainer: {
    paddingHorizontal: 0,
  },
  footer: {},
});

function mapStateToProps(state) {
  return {
    tags: state.recentSearchesReducer.tags,
    feedList: state.feedReducer.feedList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(FeedAction.reset(...args)),
    setCriteriaTags: (...args) => dispatch(CriteriaAction.setTags(...args)),
    setRecentSearchesTags: (...args) => dispatch(RecentSearchesAction.setTags(...args)),
    deleteRecentSearchesGroupFrame: (...args) => dispatch(RecentSearchesAction.deleteGroupFrame(...args)),
    deleteTags: (...args) => dispatch(RecentSearchesAction.deleteTags(...args)),
    setFeedList: (...args) => dispatch(FeedAction.setFeedList(...args)),
    setFeedListFollowed: (...args) => dispatch(FeedAction.setFeedListFollowed(...args)),
    setFeedListLiked: (...args) => dispatch(FeedAction.setFeedListLiked(...args)),
    setFeedListBookmarked: (...args) => dispatch(FeedAction.setFeedListBookmarked(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
