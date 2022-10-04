/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import {
  SearchAction,
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
  CriteriaSection,
  RecentSearchesSection,
  FeedList,
  CollapsibleSection,
  GroupFrame,
  Tag,
  RangeTag,
} from '../../project-components';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { Theme, Router } from '../../utils';

const preview = require('../../../assets/images/preview/preview.png');
const ic_search_gray = require('../../../assets/images/ic_search_gray/ic_search_gray.png');

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
          <CriteriaSection
            label={section.title}
            onPressSearchBar={() => {
              Router.push(props, "FeedStack", "SearchResult");
            }}
            enableSearchBar
            enableResultView />
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
            enableAddCriteriaTag />
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
            iconSource={ic_search_gray}
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
              <GroupFrame
                style={{ borderColor: Theme.colors.general.transparent }}
                rightAccessoryType="check">
                <Tag
                  type="input"
                  value={'170'}
                  text={'CM'}
                />
                <Tag
                  text={'Deviation'}
                  leftAccessoryType="check"
                />
              </GroupFrame>
            </CollapsibleSection>
            <CollapsibleSection
              style={{ marginTop: 16 }}
              text={'Age'}>
              <GroupFrame
                style={{ borderColor: Theme.colors.general.transparent }}
                rightAccessoryType="check">
                <RangeTag fromValue={'18'} toValue={'25'} />
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
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SearchAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
