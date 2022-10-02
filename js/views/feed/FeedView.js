/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import {
  FeedAction,
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

    this.state={
      data: [],
    };
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

    this.testAddFeedData(5);
  };

  clearData = () => {
    const { props } = this;
  };

  testAddFeedData = (num) => {
    const { state } = this;

    let data = [];

    for (let i = 0; i < num; i += 1) {
      data.push(
        {
          uri: i % 2 == 0 ? 'https://kcplace.com/preview.png' : 'https://kcplace.com/preview2.png',
          name: 'Wong Siu Yu',
          title: 'Camera',
        },
      );
    }

    this.setState({
      data: [...state.data, ...data],
    });
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

    return (
      <Translation>
        {(t) => (
          <Section
            iconSource={ic_clock}
            label={section.title}
            rightAccessoryType="delete">
            <GroupFrame rightAccessoryType="delete">
              <Tag text={'Muscular'} />
              <Tag
                dotStyle={{ backgroundColor: Theme.colors.dot.black }}
                text={'Black Hair'}
                leftAccessoryType="dot"
              />
            </GroupFrame>
            <GroupFrame
              style={{ marginTop: 8 }}
              rightAccessoryType="delete">
              <Tag text={'Female'} />
              <Tag
                dotStyle={{ backgroundColor: Theme.colors.dot.red }}
                text={'Red Eye'}
                leftAccessoryType="dot"
              />
              <Tag text={'~165CM'} />
              <Tag text={'Film'} />
              <Tag text={'Korean'} />
            </GroupFrame>
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
    console.log('[onEndReached]');

    this.testAddFeedData(5);
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
              data={state.data}
              onPressItem={({ item, index, separators }) => {
                console.log('[item] ', item);
                console.log('[index] ', index);
                console.log('[separators] ', separators);
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
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
