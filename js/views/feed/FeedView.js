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

class FeedView extends BaseComponent {
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

  renderCriteriaSection = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Section
            iconSource={preview}
            label={t('app.criteria')}>
            <SearchBar
              onPress={(text) => {
                console.log('[search-text] ', text)
              }}
            />
          </Section>
        )}
      </Translation>
    );
  }

  renderRecentSearchesSection = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Section
            iconSource={preview}
            label={t('app.recent_searches')}>
            <GroupFrame rightAccessoryType="delete">
              <Tag
                dotStyle={{
                  backgroundColor: 'red',
                }}
                text={'Muscular'}
              />
              <Tag
                dotStyle={{
                  backgroundColor: 'black',
                }}
                text={'Black Hair'}
                leftAccessoryType="dot"
              />
            </GroupFrame>
            <GroupFrame rightAccessoryType="delete">
              <Tag
                dotStyle={{
                  backgroundColor: 'red',
                }}
                text={'Female'}
              />
              <Tag
                dotStyle={{
                  backgroundColor: 'red',
                }}
                text={'Red Eye'}
                leftAccessoryType="dot"
              />
              <Tag
                dotStyle={{
                  backgroundColor: 'red',
                }}
                text={'~165CM'}
              />
              <Tag
                dotStyle={{
                  backgroundColor: 'red',
                }}
                text={'Film'}
              />
              <Tag
                dotStyle={{
                  backgroundColor: 'red',
                }}
                text={'Korean'}
              />
            </GroupFrame>
          </Section>
        )}
      </Translation>
    );
  }

  renderBaseOnProjectsSection = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Section
            iconSource={preview}
            label={t('app.based_on_projects_format').replace('{0}', '1')}>
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
  }

  renderFeedSection = () => {
    const { props } = this;

    let data = [];

    for (let i = 0; i < 10; i++) {
      data.push(
        {
          uri: i % 2 == 0 ? 'https://kcplace.com/preview.png' : 'https://kcplace.com/preview2.png',
          name: 'Wong Siu Yu',
          title: 'Camera',
        },
      );
    }

    return (
      <Translation>
        {(t) => (
          <Section
            contentContainerStyle={styles.feedSectionContentContainer}
            iconSource={preview}
            label={t('app.feed')}>
            <FeedList
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
  }

  renderItem = ({ item, index, section, separators }) => {
    const { props } = this;

    console.log('[item]', item);
    console.log('[index]', index);
    console.log('[section]', section);
    console.log('[separators]', separators);

    switch (section.index) {
      case 0:
        return this.renderCriteriaSection();

      case 1:
        return this.renderRecentSearchesSection();

      case 2:
        return this.renderBaseOnProjectsSection();

      case 3:
        return this.renderFeedSection();

      default:
        return undefined;
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
                  title: '',
                  data: [''],
                },
                {
                  title: '',
                  data: [''],
                },
                {
                  title: '',
                  data: [''],
                },
                {
                  title: '',
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
