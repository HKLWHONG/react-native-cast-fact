/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  SearchResultViewAction,
  MainTabNavigatorAction,
  SearchStackNavigatorAction,
  SearchStackNavigatorRightViewAction,
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
  SearchStackNavigatorRightView,
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

import { SearchProvider, UserProvider } from '../../providers';

import {
  Constants,
} from '../../constants';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
// import Pdf from 'react-native-pdf';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_no_result = require('../../../assets/images/ic_no_result/ic_no_result.png');

const ic_select_all = require('../../../assets/images/ic_select_all/ic_select_all.png');
const ic_select_none = require('../../../assets/images/ic_select_none/ic_select_none.png');

const ic_export= require('../../../assets/images/ic_export/ic_export.png');

export const IDENTIFIER = 'SearchResultView';

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

    console.log('[searched]', props.searched);
    console.log('[results]', props.results);
    console.log('[searchResultListData]', props.searchResultListData);

    props.addSearchStackNavigatorOnRightViewRender(IDENTIFIER, this.renderSearchStackNavigatorRightView);

    console.log('[search-result-page]', store.getState().searchResultViewReducer.searchResultListPaging.page);
  };

  clearData = () => {
    const { props } = this;

    props.reset();
  };

  createPDF = async () => {
    console.log('[RNHTMLtoPDF]', RNHTMLtoPDF);

    let options = {
      html: UserProvider.generateHttpProfile(),
      fileName: 'castfact_castsheet',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    alert(file.filePath);

    await RNPrint.print({ filePath: file.filePath })
  };

  renderSearchStackNavigatorRightView = (info) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <SearchStackNavigatorRightView />
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

        if (json.length > 0) {
          props.setSearchResultListPagingPage(page);

          props.setSearchResultListData(SearchProcessor.formatSearchResultListData(data || props.searchResultListData, json));
        }
      })
      .catch((error) => {
        console.error(error);

        // props.setSearched(true);
        props.setSearchResultListPagingLoading(false);
        // props.setRefreshing(false);
      });
  };

  // search = () => {
  //   const { props } = this;
  //
  //   let criteriaTags = store.getState().criteriaSectionReducer.tags;
  //
  //   // console.log('[criteriaTags', criteriaTags);
  //
  //   if (profiles.length === 0) {
  //     return;
  //   }
  //
  //   let data = [];
  //
  //   profiles[0].data.forEach((profile) => {
  //     let matched = false;
  //
  //     // console.log('[profile.tags]', profile.tags);
  //     if (criteriaTags.length === 0) {
  //       matched = true;
  //     }
  //
  //     profile.tags.forEach((tag) => {
  //       if (matched) {
  //         return;
  //       }
  //
  //       let matchedCriteriaTags = criteriaTags[0].data.filter((criteriaTag) => {
  //         return tag.text && criteriaTag.text && tag.text.toLowerCase() === criteriaTag.text.toLowerCase();
  //       });
  //
  //       if (matchedCriteriaTags.length === 0) {
  //         return;
  //       }
  //
  //       matched = true;
  //     });
  //
  //     if (!matched) {
  //       return;
  //     }
  //
  //     data.push({ profile: profile });
  //   });
  //
  //   data = data.map((item, index) => {
  //     return {
  //       ...item,
  //       resultId: (props.searchResultListData.length + index).toString(),
  //     }
  //   })
  //
  //   console.log('[result.found]', data.length);
  //
  //   props.setSearchResultListData(data);
  // };

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

    // this.loadMoreData();
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
              type={props.searchStackNavigatorRightViewSearchResultListType}
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

  renderEditBar = () => {
    const { props } = this;

    if (!props.searchStackNavigatorRightViewEditModeEnabled) {
      return;
    }

    const numberOfSelected = props.searchResultListData.filter((item) => {
      return item.selected;
    }).length;

    return (
      <Translation>
        {(t) => (
          <View
            style={styles.editBarContainer}
          >
            <View style={styles.editBarSubContainer}>
              <Text
                style={styles.editBarText}
              >
                {`${numberOfSelected} Selected`}
              </Text>
            </View>
            <Separator />
            <View style={styles.editBarSubContainer}>
              <View style={styles.editBarRightSubContainer}>
                <Button
                  style={{ marginRight: 4 }}
                  leftAccessoryImageStyle={{ marginRight: 4 }}
                  type="small"
                  leftAccessorySource={ic_select_all}
                  leftAccessoryResizeMode="center"
                  text={'ALL'}
                  onPress={() => {
                    const data = store.getState().searchResultViewReducer.searchResultListData.map((item) => {
                      return {
                        ...item,
                        selected: true,
                      }
                    });

                    props.setSearchResultListData(data);
                  }}
                />
                <Button
                  style={{ marginLeft: 4 }}
                  leftAccessoryImageStyle={{ marginRight: 4 }}
                  type="small"
                  leftAccessorySource={ic_select_none}
                  leftAccessoryResizeMode="center"
                  text={'NONE'}
                  onPress={() => {
                    const data = store.getState().searchResultViewReducer.searchResultListData.map((item) => {
                      return {
                        ...item,
                        selected: false,
                      }
                    });

                    props.setSearchResultListData(data);
                  }}
                />
              </View>
              <Button
                type="small"
                source={ic_export}
                resizeMode="center"
                onPress={() => {
                  this.createPDF()
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              />
            </View>
          </View>
        )}
      </Translation>
    );
  }

  renderFooter = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Footer style={styles.footer}>
            {this.renderEditBar()}
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
  editBarContainer: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.background.primary,
    position: 'absolute',
    width: Dimensions.get('window').width - 32,
    bottom: 0,
    margin: 16,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.decorations.splitline,
  },
  editBarSubContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    padding: 8,
  },
  editBarText: {
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    textTransform: 'uppercase',
  },
  editBarRightSubContainer: {
    // backgroundColor: '#0ff',
    flex: 1,
    flexDirection: 'row',
  },
});

function mapStateToProps(state) {
  return {
    refreshing: state.searchResultViewReducer.refreshing,
    searched: state.searchResultViewReducer.searched,
    results: state.searchResultViewReducer.results,
    searchResultListData: state.searchResultViewReducer.searchResultListData,
    searchStackNavigatorRightViewSearchResultListType: state.searchStackNavigatorRightViewReducer.searchResultListType,
    searchStackNavigatorRightViewEditModeEnabled: state.searchStackNavigatorRightViewReducer.editModeEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SearchResultViewAction.reset(...args)),
    setRefreshing: (...args) => dispatch(SearchResultViewAction.setRefreshing(...args)),
    setSearchResultListPagingLoading: (...args) => dispatch(SearchResultViewAction.setSearchResultListPagingLoading(...args)),
    setSearchResultListPagingPage: (...args) => dispatch(SearchResultViewAction.setSearchResultListPagingPage(...args)),
    setSearchResultListData: (...args) => dispatch(SearchResultViewAction.setSearchResultListData(...args)),
    updateSearchResultListData: (...args) => dispatch(SearchResultViewAction.updateSearchResultListData(...args)),
    setListRef: (...args) => dispatch(MainTabNavigatorAction.setListRef(...args)),
    addSearchStackNavigatorOnRightViewRender: (...args) => dispatch(SearchStackNavigatorAction.addOnRightViewRender(...args)),
    setSearchStackNavigatorRightViewSearchResultListType: (...args) => dispatch(SearchStackNavigatorRightViewAction.setSearchResultListType(...args)),
    resetCriteria: (...args) => dispatch(CriteriaSectionAction.reset(...args)),
    resetRecentSearchesTags: (...args) => dispatch(RecentSearchesSectionAction.resetTags(...args)),
    setFindTalentTags: (...args) => dispatch(FindTalentSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultView);
