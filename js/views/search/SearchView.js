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
  CollapsibleSection,
  GroupFrame,
  Tag,
} from '../../project-components';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { Theme, Router } from '../../utils';

const preview = require('../../../assets/images/preview/preview.png');

class SearchView extends BaseComponent {
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

                Router.push(props, "FeedStack", "SearchResult");
              }}
            />
            <GroupFrame
              style={{ borderColor: Theme.colors.general.transparent, marginTop: 8 }}>
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
  };

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

  renderFindTalentSection = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            iconSource={preview}
            label={section.title}>
            <CollapsibleSection text={'Gender'}>
              <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
                <Tag text={'Female'} />
                <Tag text={'Gender-Noconforming'} />
                <Tag text={'Non-Binary'} />
                <Tag text={'Trans Female'} />
                <Tag text={'Agender'} />
                <Tag text={'Androgyne'} />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Ethnicities'}>
              <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
                <Tag text={'Option A'} />
                <Tag text={'Option B'} />
                <Tag text={'Option C'} />
                <Tag text={'Option D'} />
                <Tag text={'Option E'} />
                <Tag text={'Option F'} />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Body Type'}>
              <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
                <Tag text={'Option A'} />
                <Tag text={'Option B'} />
                <Tag text={'Option C'} />
                <Tag text={'Option D'} />
                <Tag text={'Option E'} />
                <Tag text={'Option F'} />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Eye Color'}>
              <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.amber }}
                  text={'Amber'}
                  leftAccessoryType="dot"
                />
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.brown }}
                  text={'Brown'}
                  leftAccessoryType="dot"
                />
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.gray }}
                  text={'Gray'}
                  leftAccessoryType="dot"
                />
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.green }}
                  text={'Green'}
                  leftAccessoryType="dot"
                />
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.hazel }}
                  text={'Hazel'}
                  leftAccessoryType="dot"
                />
                <Tag
                  dotStyle={{ backgroundColor: Theme.colors.dot.red }}
                  text={'Red'}
                  leftAccessoryType="dot"
                />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Height'}>
              <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
                <Tag
                  type="input"
                  text={'170CM'}
                />
                <Tag text={'Option B'} />
                <Tag text={'Option C'} />
                <Tag text={'Option D'} />
                <Tag text={'Option E'} />
                <Tag text={'Option F'} />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Age'}>
              <GroupFrame style={{ borderColor: Theme.colors.general.transparent }}>
                <Tag text={'Option A'} />
                <Tag text={'Option B'} />
                <Tag text={'Option C'} />
                <Tag text={'Option D'} />
                <Tag text={'Option E'} />
                <Tag text={'Option F'} />
              </GroupFrame>
            </CollapsibleSection>
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
        return this.renderFindTalentSection(params);

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
