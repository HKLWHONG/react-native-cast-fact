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

  initialize = async () => {
    const { props } = this;
  };

  clearData = () => {
    const { props } = this;
  };

  addHeightTagIfNeeded = () => {
    const { props } = this;

    let heightTags = props.findTalentTags.filter((groupFrame) => {
      return (
        groupFrame.label.toLowerCase() === 'height'.toLowerCase()
        &&
        groupFrame.checked
      )
    });

    if (heightTags.length > 0 && heightTags[0].data.length > 1) {
      let tag = heightTags[0].data[0];

      if (tag && tag.value && tag.value.length > 0) {
        let deviationTag = heightTags[0].data[1];

        if (deviationTag && deviationTag.checked) {
          props.addCriteriaTag({
            ...tag,
            text: '~' + tag.value + tag.text,
          });
        } else {
          props.addCriteriaTag({
            ...tag,
            text: tag.value + tag.text,
          });
        }
      }
    }
  };

  addAgeTagIfNeeded = () => {
    const { props } = this;

    let ageTags = props.findTalentTags.filter((groupFrame) => {
      return (
        groupFrame.label.toLowerCase() === 'age'.toLowerCase()
        &&
        groupFrame.checked
      )
    });

    if (ageTags.length > 0 && ageTags[0].data.length > 0) {
      let tag = ageTags[0].data[0];

      props.addCriteriaTag({
        ...tag,
        text: tag.fromValue + '-' + tag.toValue,
      });
    }
  };

  addRecentSearchesGroupFrame = () => {
    const { props } = this;

    if (props.criteriaTags.length === 0) {
      return;
    }

    let data = props.criteriaTags[0].data.map((tag) => {
      return {
        ...tag,
        rightAccessoryType: undefined,
      };
    });

    props.addRecentSearchesGroupFrame({
      data: data,
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
          <CriteriaSection
            label={section.title}
            onPressSearchBar={() => {
              this.addHeightTagIfNeeded();
              this.addAgeTagIfNeeded();
              this.addRecentSearchesGroupFrame();

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
          <FindTalentSection label={section.title} />
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
    criteriaTags: state.criteriaSectionReducer.tags,
    findTalentTags: state.findTalentSectionReducer.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SearchAction.reset(...args)),
    addCriteriaTag: (...args) => dispatch(CriteriaSectionAction.addTag(...args)),
    addRecentSearchesGroupFrame: (...args) => dispatch(RecentSearchesSectionAction.addGroupFrame(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
