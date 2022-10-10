/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import {
  CriteriaSectionAction,
  RecentSearchesSectionAction,
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
  FindTalentSection,
  FeedList,
  GroupFrame,
  Tag,
  RangeTag,
} from '../../project-components';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import {
  Theme,
  Router,
} from '../../utils';

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

  initialize = () => {
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
            enableResultView
            enableSearchBarLinearGradientBorder
          />
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
          />
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
          <FindTalentSection label={section.title} />
        )}
      </Translation>
    );
  };

  renderItem = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    if (props.recentSearchesTags.length > 0) {
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
    } else {
      switch (section.index) {
        case 0:
          return this.renderCriteriaSection(params);

        case 1:
          return this.renderFindTalentSection(params);

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
        title: i18n.t('app.find_talent'),
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
              contentContainerStyle={styles.listContentContainer}
              sections={sections}
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
    criteriaTags: state.criteriaSectionReducer.tags,
    recentSearchesTags: state.recentSearchesSectionReducer.tags,
    findTalentTags: state.findTalentSectionReducer.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SearchAction.reset(...args)),
    setCriteriaTags: (...args) => dispatch(CriteriaSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
