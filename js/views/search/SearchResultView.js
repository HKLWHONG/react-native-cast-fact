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

class SearchResultView extends BaseComponent {
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

    this.testAddResultData(10);
  };

  clearData = () => {
    const { props } = this;
  };

  testAddResultData = (num) => {
    const { state } = this;

    let data = [];

    for (let i = 0; i < num; i += 1) {
      let uri1 = 'https://kcplace.com/preview.png';
      let uri2 = 'https://kcplace.com/preview2.png';

      data.push(
        {
          uri: uri1,
          uris: [
            { uri: uri1 },
            { uri: uri2 },
            { uri: uri1 },
            { uri: uri1 },
            { uri: uri2 },
            { uri: uri1 },
          ],
          name: 'Cath Wong 黃妍',
          title: 'Photographer',
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
            iconSource={preview}
            label={section.title}
            rightAccessoryType="delete">
            <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
              <Tag
                text={'Kc Lui'}
                rightAccessoryType="delete"
              />
              <Tag
                text={'Male'}
                rightAccessoryType="delete"
              />
              <Tag
                dotStyle={{ backgroundColor: Theme.colors.dot.blue }}
                text={'Blue Eye'}
                leftAccessoryType="dot"
                rightAccessoryType="delete"
              />
            </GroupFrame>
          </Section>
        )}
      </Translation>
    );
  };

  onEndReached = () => {
    console.log('[onEndReached]');

    this.testAddResultData(5);
  };

  renderResultSection = (params) => {
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
        return this.renderResultSection(params);

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
                  title: t(''),
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
  resultSectionHeaderContainer: {
    // backgroundColor: '#f00',
    paddingVertical: 8,
  },
  resultSectionContentContainer: {
    // backgroundColor: '#ff0',
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultView);
