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
  Button,
  Separator,
  Section,
  SearchBar,
  FeedList,
  GroupFrame,
  Tag,
} from '../../project-components';

import Collapsible from 'react-native-collapsible';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { Theme, Router } from '../../utils';

const preview = require('../../../assets/images/preview/preview.png');

class SearchView extends BaseComponent {
  constructor(props) {
    super(props);

    this.state={
      collapsed: false,
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

  renderCriteriaSection = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            iconSource={preview}
            label={section.title}>
            <SearchBar
              onPress={(text) => {
                console.log('[search-text] ', text)
              }}
            />
            <GroupFrame
              style={{ borderColor: Theme.colors.general.transparent, marginTop: 8 }}>
              <Tag
                text={'Male'}
                rightAccessoryType="delete"
              />
              <Tag
                dotStyle={{
                  backgroundColor: Theme.colors.dot.blue,
                }}
                text={'Blue Eye'}
                leftAccessoryType="dot"
              />
            </GroupFrame>
            <View
              style={{
                // backgroundColor: '#f00',
                alignItems: 'center',
                marginVertical: 8,
              }}>
              <Text
               style={{
                 // backgroundColor: '#f00',
                 color: Theme.colors.text.subtitle,
                 fontSize: 13,
                 fontFamily: Theme.fonts.light,
                 letterSpacing: 1.7,
                 textTransform: 'uppercase',
               }}>
               {'More than 100 results.'}
             </Text>
            </View>
          </Section>
        )}
      </Translation>
    );
  }

  renderRecentSearchesSection = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            iconSource={preview}
            label={section.title}
            rightAccessoryType="delete">
            <GroupFrame rightAccessoryType="delete">
              <Tag
                dotStyle={{
                  backgroundColor: 'red',
                }}
                text={'Muscular'}
              />
              <Tag
                dotStyle={{
                  backgroundColor: Theme.colors.dot.black,
                }}
                text={'Black Hair'}
                leftAccessoryType="dot"
              />
            </GroupFrame>
            <GroupFrame
              style={{ marginTop: 8 }}
              rightAccessoryType="delete">
              <Tag
                dotStyle={{
                  backgroundColor: 'red',
                }}
                text={'Female'}
              />
              <Tag
                dotStyle={{
                  backgroundColor: Theme.colors.dot.red,
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

  renderFindTalentSection = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            iconSource={preview}
            label={section.title}>
            <Button
              text={'Gender'}
              onPress={() => {
                this.setState({
                  collapsed: !state.collapsed,
                });
              }}/>
            <Collapsible collapsed={state.collapsed}>
              <GroupFrame
                style={{ borderColor: Theme.colors.general.transparent }}
                rightAccessoryType="delete">
                <Tag text={'Female'} />
                <Tag text={'Gender-Noconforming'} />
                <Tag text={'Non-Binary'} />
                <Tag text={'Trans Female'} />
                <Tag text={'Agender'} />
                <Tag text={'Androgyne'} />
              </GroupFrame>
            </Collapsible>
          </Section>
        )}
      </Translation>
    );
  }

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
        return this.renderFindTalentSection(params);

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
                  title: t('app.criteria'),
                  data: [''],
                },
                {
                  title: t('app.recent_searches'),
                  data: [''],
                },
                {
                  title: t('app.find_talent'),
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
