/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  SearchResultViewAction,
  MainTabNavigatorAction,
  SearchStackNavigatorAction,
  CriteriaSectionAction,
  RecentSearchesSectionAction,
  FindTalentSectionAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  List,
  Image,
} from '../../components';

import {
  Button,
  Separator,
  Section,
  CriteriaSection,
  ProfileList,
  SearchResultList,
  GroupFrame,
  Tag,
} from '../../project-components';

import { Theme, Router } from '../../utils';

import { SearchProcessor, TagProcessor } from '../../processors';

import { SearchProvider } from '../../providers';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
// import Pdf from 'react-native-pdf';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_no_result = require('../../../assets/images/ic_no_result/ic_no_result.png');

const preview = require('../../../assets/images/preview/preview.png');

class SearchResultView extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {};
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

    // console.log('[searched]', props.searched);
    // console.log('[results]', props.results);
    // console.log('[searchResultListData]', props.searchResultListData);

    props.addSearchStackNavigatorOnRightViewRender(this.constructor.name, this.renderRightView);

    console.log('[search-result-page]', store.getState().searchResultViewReducer.searchResultListPaging.page);
  };

  clearData = () => {
    const { props } = this;

    props.reset();
  };

  createPDF = async () => {
    console.log('[RNHTMLtoPDF]', RNHTMLtoPDF);

    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    alert(file.filePath);

    await RNPrint.print({ filePath: file.filePath })
  };

  renderRightView = (info) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={{ flexDirection: 'row' }}>
            <Button
              style={{ marginRight: 4 }}
              type="circle"
              source={preview}
              resizeMode="center"
              onPress={() => {
                if (store.getState().searchResultViewReducer.searchResultListType !== 'grid') {
                  props.setSearchResultListType('grid');
                } else {
                  props.setSearchResultListType(undefined);
                }
              }}
            />
            <Button
              style={{ marginLeft: 4 }}
              type="circle"
              source={preview}
              resizeMode="center"
              onPress={() => {
                let selected = true;

                if (store.getState().searchResultViewReducer.searchResultListData.length > 0) {
                  selected = !store.getState().searchResultViewReducer.searchResultListData[0].selected;
                }

                const data = store.getState().searchResultViewReducer.searchResultListData.map((item) => {
                  return {
                    ...item,
                    selected: selected,
                  }
                });

                props.setSearchResultListData(data);
              }}
            />
          </View>
        )}
      </Translation>
    );
  };

  loadMoreData = (data) => {
    const { props } = this;

    if (store.getState().searchResultViewReducer.searchResultListPaging.loading) {
      return;
    }

    props.setSearchResultListPagingLoading(true);
    // props.setSearched(false);

    let page = store.getState().searchResultViewReducer.searchResultListPaging.page + 1;

    SearchProvider.search(
      props,
      {
        page: page,
        length: store.getState().searchResultViewReducer.searchResultListPaging.length,
      },
      {
        disableAddRecentSearches: true,
      },
    )
      .then(({ json }) => {
        // props.setSearched(true);
        props.setSearchResultListPagingLoading(false);
        // props.setRefreshing(false);

        if (json.payload.length > 0) {
          props.setSearchResultListPagingPage(page);

          props.setSearchResultListData(SearchProcessor.formatSearchResultListData(data || props.searchResultListData, json.payload));
        }
      })
      .catch((error) => {
        console.error(error);

        // props.setSearched(true);
        props.setSearchResultListPagingLoading(false);
        // props.setRefreshing(false);
      });
  };

  search = () => {
    const { props } = this;

    let criteriaTags = store.getState().criteriaSectionReducer.tags;

    // console.log('[criteriaTags', criteriaTags);

    if (profiles.length === 0) {
      return;
    }

    let data = [];

    profiles[0].data.forEach((profile) => {
      let matched = false;

      // console.log('[profile.tags]', profile.tags);
      if (criteriaTags.length === 0) {
        matched = true;
      }

      profile.tags.forEach((tag) => {
        if (matched) {
          return;
        }

        let matchedCriteriaTags = criteriaTags[0].data.filter((criteriaTag) => {
          return tag.text && criteriaTag.text && tag.text.toLowerCase() === criteriaTag.text.toLowerCase();
        });

        if (matchedCriteriaTags.length === 0) {
          return;
        }

        matched = true;
      });

      if (!matched) {
        return;
      }

      data.push({ profile: profile });
    });

    data = data.map((item, index) => {
      return {
        ...item,
        resultId: (props.searchResultListData.length + index).toString(),
      }
    })

    console.log('[result.found]', data.length);

    props.setSearchResultListData(data);
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
            onChangeTags={async () => {
              await SearchProvider.presearch(props);
            }}
          />
        )}
      </Translation>
    );
  };

  onEndReached = () => {
    const { props } = this;

    console.log('[onEndReached]');

    this.loadMoreData();
  };

  renderSearchResultListSection = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            headerContainerStyle={styles.resultSectionHeaderContainer}
            contentContainerStyle={styles.resultSectionContentContainer}
            label={section.title}
          >
            <SearchResultList
              type={props.searchResultListType}
              data={props.searchResultListData}
              onPressSelection={({ item, index, separators }) => {
                // console.log("[on-press-selection-item]", item);
                // console.log("[on-press-selection-item-profile]", profile);
                // console.log("[on-press-selection-item-posts]", posts);
                console.log("[on-press-selection-item-selected]", item.selected);

                props.updateSearchResultListData(item.resultId, {
                  selected: !item.selected,
                });
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

    switch (section.index) {
      case 0:
        return this.renderCriteriaSection(params);

      case 1:
        return this.renderSearchResultListSection(params);

      default:
        break;
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

  renderListView = (sections) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
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
            onRefresh={async (refreshing) => {
              props.setRefreshing(true);

              await SearchProvider.presearch(
                props,
                {},
                {
                  disableAddRecentSearches: true,
                  disableActivityIndicator: true,
                },
              );

              props.setRefreshing(false);
            }}
          />
        )}
      </Translation>
    );
  };

  renderNoReultView = (sections) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.noReultContainer}>
            {this.renderCriteriaSection(sections)}
            <Separator />
            <View style={styles.noReultSubContainer}>
              <Image
                style={styles.noResultImage}
                source={ic_no_result}
                resizeMode="center"
              />
              <Text style={styles.noResultText}>
                {t('app.no_result')}
              </Text>
              <Text style={styles.noResultDescriptionText}>
                {t('app.no_result_description')}
              </Text>
            </View>
          </View>
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
      {
        title: i18n.t(''),
        data: [''],
      },
    ];

    let children = this.renderListView(sections);

    if (props.searched && props.searchResultListData && props.searchResultListData.length === 0) {
      children = this.renderNoReultView({
        section: sections[0],
      });
    }

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}
            scrollable={false}
          >
            {children}
          </Body>
        )}
      </Translation>
    );
  };

  renderFooter = () => {
    const { props } = this;

    const numberOfSelected = props.searchResultListData.filter((item) => {
      return item.selected;
    }).length;

    return (
      <Translation>
        {(t) => (
          <Footer style={styles.footer}>
            <View
              style={{
                // backgroundColor: '#f00',
                backgroundColor: Theme.colors.background.primary,
                margin: 16,
                borderRadius: 8,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: Theme.colors.decorations.splitline,
              }}
            >
              <View style={{
                // backgroundColor: '#00f',
                flexDirection: 'row',
                padding: 8,
              }}>
                <Text
                  style={{
                    color: Theme.colors.text.subtitle,
                    fontSize: 15,
                    fontFamily: Theme.fonts.bold,
                    textTransform: 'uppercase',
                  }}
                >
                  {`${numberOfSelected} Selected`}
                </Text>
              </View>
              <Separator />
              <View
                style={{
                  // backgroundColor: '#f0f',
                  flexDirection: 'row',
                  padding: 8,
                }}
              >
                <View
                  style={{
                    // backgroundColor: '#0ff',
                    flex: 1,
                    flexDirection: 'row',
                  }}
                >
                  <Button
                    type="small"
                    leftAccessorySource={preview}
                    text={'ALL'}
                  />
                  <Button
                    type="small"
                    leftAccessorySource={preview}
                    text={'NONE'}
                  />
                </View>
                <Button
                  type="small"
                  source={preview}
                  onPress={() => {
                    this.createPDF()
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                />
              </View>
            </View>
          </Footer>
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
  noReultContainer: {
    // backgroundColor: '#f00',
    flex: 1,
    paddingBottom: 64,
  },
  noReultSubContainer: {
    // backgroundColor: '#00f',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultImage: {
    width: 96,
    height: 96,
  },
  noResultText: {
    // backgroundColor: '#f00',
    color: Theme.colors.text.subtitle,
    fontSize: 17,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 2.22,
    textTransform: 'uppercase',
  },
  noResultDescriptionText: {
    // backgroundColor: '#f00',
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    letterSpacing: 0,
  },
  footer: {},
});

function mapStateToProps(state) {
  return {
    refreshing: state.searchResultViewReducer.refreshing,
    searched: state.searchResultViewReducer.searched,
    results: state.searchResultViewReducer.results,
    searchResultListType: state.searchResultViewReducer.searchResultListType,
    searchResultListData: state.searchResultViewReducer.searchResultListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SearchResultViewAction.reset(...args)),
    setRefreshing: (...args) => dispatch(SearchResultViewAction.setRefreshing(...args)),
    setSearchResultListType: (...args) => dispatch(SearchResultViewAction.setSearchResultListType(...args)),
    setSearchResultListPagingLoading: (...args) => dispatch(SearchResultViewAction.setSearchResultListPagingLoading(...args)),
    setSearchResultListPagingPage: (...args) => dispatch(SearchResultViewAction.setSearchResultListPagingPage(...args)),
    setSearchResultListData: (...args) => dispatch(SearchResultViewAction.setSearchResultListData(...args)),
    updateSearchResultListData: (...args) => dispatch(SearchResultViewAction.updateSearchResultListData(...args)),
    setListRef: (...args) => dispatch(MainTabNavigatorAction.setListRef(...args)),
    addSearchStackNavigatorOnRightViewRender: (...args) => dispatch(SearchStackNavigatorAction.addOnRightViewRender(...args)),
    resetCriteria: (...args) => dispatch(CriteriaSectionAction.reset(...args)),
    resetRecentSearchesTags: (...args) => dispatch(RecentSearchesSectionAction.resetTags(...args)),
    setFindTalentTags: (...args) => dispatch(FindTalentSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultView);
