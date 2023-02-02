/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  CriteriaSectionAction,
  MainTabAction,
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

import {
  Theme,
  Router,
} from '../../utils';

import { CriteriaProcessor, TagProcessor } from '../../processors';

import { SearchProvider, TagProvider } from '../../providers';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

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

    SearchProvider.search(props, { prefetch: true }, {})
      .catch((error) => {
        console.error(error);
      });
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
            onPressSearchBar={async () => {
              await SearchProvider.presearch(props);

              Router.push(props, "SearchStack", "SearchResult");
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
            onPressGroupFrame={async (groupFrame) => {
              let tags = store.getState().criteriaSectionReducer.tags;

              groupFrame.data.forEach((tag) => {
                tags = CriteriaProcessor.addTag(tags, tag);
              });

              props.setCriteriaTags(tags);

              TagProcessor.reload();

              await SearchProvider.presearch(props, {}, { disableAddRecentSearches: true });

              Router.push(props, "SearchStack", "SearchResult");
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
              innerRef={(ref) => {
                if (!ref) {
                  return;
                }

                props.setListRef(0, props.navigation.getState().index, ref);
              }}
              contentContainerStyle={styles.listContentContainer}
              sections={sections}
              renderItem={this.renderItem}
              SectionSeparatorComponent={this.renderSectionSeparatorComponent}
              androidRefreshControlColor={Theme.colors.general.black}
              iosRefreshControlColor={Theme.colors.general.white}
              refreshing={props.refreshing}
              onRefresh={(refreshing) => {
                props.setRefreshing(true);

                let numberOfTasks = 2;
                let numberOfFinsihedTasks = 0;

                SearchProvider.search(props, { prefetch: true }, {})
                  .then(() => {
                    numberOfFinsihedTasks += 1;

                    if (numberOfTasks === numberOfFinsihedTasks) {
                      props.setRefreshing(false);
                    }
                  })
                  .catch((error) => {
                    console.error(error);

                    numberOfFinsihedTasks += 1;

                    if (numberOfTasks === numberOfFinsihedTasks) {
                      props.setRefreshing(false);
                    }
                  });

                TagProvider.prefetchTags(props)
                  .then(() => {
                    numberOfFinsihedTasks += 1;

                    if (numberOfTasks === numberOfFinsihedTasks) {
                      props.setRefreshing(false);
                    }
                  })
                  .catch((error) => {
                    console.error(error);

                    numberOfFinsihedTasks += 1;

                    if (numberOfTasks === numberOfFinsihedTasks) {
                      props.setRefreshing(false);
                    }
                  });
              }}
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
    refreshing: state.searchReducer.refreshing,
    criteriaTags: state.criteriaSectionReducer.tags,
    recentSearchesTags: state.recentSearchesSectionReducer.tags,
    findTalentTags: state.findTalentSectionReducer.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SearchAction.reset(...args)),
    setRefreshing: (...args) => dispatch(SearchAction.setRefreshing(...args)),
    setListRef: (...args) => dispatch(MainTabAction.setListRef(...args)),
    setCriteriaTags: (...args) => dispatch(CriteriaSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
