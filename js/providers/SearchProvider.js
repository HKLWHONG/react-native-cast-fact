/**
 * @format
 * @flow strict-local
 */

import { Environment } from '../config';

import {
  store,
  AppAction,
  DataAction,
  CriteriaSectionAction,
  RecentSearchesSectionAction,
  SearchResultViewAction,
} from '../redux';

import {
  Common,
} from '../utils';

import {
  CommonProcessor,
  RecentSearchProcessor,
  SearchProcessor,
  TagProcessor,
} from '../processors';

import { AuthProvider } from '../providers';

import {
  SearchStorage,
} from '../storages';

import {
  SearchApi,
  GetHistoryApi,
} from '../apis';

const IDENTIFIER = 'SearchProvider';

export const prefetchRecentSearches = (props, params, options) => {
  return new Promise(async (resolve) => {
    // let page = 1;

    let cachedRecentSearches = await SearchStorage.getRecentSearches()
      .catch((error) => {
        console.error(error);
      });

    if (cachedRecentSearches) {
      console.log(`[${IDENTIFIER}] cached-recent-searches-found.`);

      let tags = cachedRecentSearches.map((tag) => {
        return tag.text;
      });

      store.dispatch(DataAction.setRecentSearchesSectionTags(cachedRecentSearches));

      RecentSearchProcessor.reload();

      getRecentSearches(
        props,
        {
          // page: page,
          // length: Environment.MAX_RECENT_SEARCHES_NUM,
        },
        options,
      )
        .then((params) => {
          const { json } = params;

          SearchStorage.setRecentSearches(json)
            .catch((error) => {
              console.error(error);
            });

          if (JSON.stringify(cachedRecentSearches) !== JSON.stringify(json)) {
            console.log(`[${IDENTIFIER}] need-to-reload-recent-searches.`);

            RecentSearchProcessor.reload();
          } else {
            console.log(`[${IDENTIFIER}] no-need-to-reload-recent-searches.`);
          }

          resolve();
        })
        .catch((error) => {
          console.error(error);

          resolve();
        });
    } else {
      console.log(`[${IDENTIFIER}] no-cached-recent-searches.`);

      params = await getRecentSearches(
        props,
        {
          // page: page,
          // length: Environment.MAX_RECENT_SEARCHES_NUM,
        },
        options,
      )
        .catch((error) => {
          console.error(error);
        });

      if (params && params.response && params.response.status === 200) {
        SearchStorage.setRecentSearches(params.json)
          .catch((error) => {
            console.error(error);
          });

        RecentSearchProcessor.reload();
      }

      resolve();
    }
  });
};

export const getRecentSearches = (props, params, options) => {
  return new Promise((resolve, reject) => {
    GetHistoryApi.request(
      props,
      {
        // page: params && params.page,
        // length: params && params.length,
      },
      options,
    )
      .then((params) => {
        const { json } = params;

        let tags = json.map((tag) => {
          return tag.text;
        });

        // console.log('[recent-tags]', JSON.stringify(tags));

        store.dispatch(DataAction.setRecentSearchesSectionTags(tags));

        resolve(params);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addRecentSearches = async (props, params, options) => {
  return new Promise((resolve, reject) => {
    if (!params || !params.tags) {
      resolve();

      return;
    }

    let tags = RecentSearchProcessor.formatTags(params.tags);

    if (tags.length === 0) {
      resolve();

      return;
    }

    AddRecentSearchesApi.request(
      props,
      {
        tags: JSON.stringify(tags),
      },
      options,
    )
      .then(async (params) => {
        const { json } = params;

        SearchStorage.setRecentSearches(json)
          .catch((error) => {
            console.error(error);
          });

        store.dispatch(DataAction.setRecentSearchesSectionTags(json));

        RecentSearchProcessor.reload();

        TagProcessor.reload();

        resolve(params);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeRecentSearches = async (props, params, options) => {
  return new Promise((resolve, reject) => {
    if (!params || !params.ids) {
      resolve();

      return;
    }

    let ids = RecentSearchProcessor.toIds(params.ids);

    if (ids.length === 0) {
      resolve();

      return;
    }

    let recentSearchesSectionTags = CommonProcessor.deepCopy(store.getState().dataReducer.recentSearchesSectionTags);

    recentSearchesSectionTags.filter((tag) => {
      let found = false;

      params.ids.forEach((id) => {
        if (id === tag.id) {
          found = true;
        }
      });

      return !found;
    });

    store.dispatch(DataAction.setRecentSearchesSectionTags(recentSearchesSectionTags));

    RecentSearchProcessor.reload();

    TagProcessor.reload();

    RemoveRecentSearchesApi.request(
      props,
      {
        ids: ids,
      },
      options,
    )
      .then(async (params) => {
        const { json } = params;

        SearchStorage.setRecentSearches(json)
          .catch((error) => {
            console.error(error);
          });

        store.dispatch(DataAction.setRecentSearchesSectionTags(json));

        RecentSearchProcessor.reload();

        TagProcessor.reload();

        resolve(params);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const presearch = async (props, params, options) => {
  if (!options || !options.disableActivityIndicator) {
    store.dispatch(AppAction.showActivityIndicator());
  }

  let page = 1;

  params = await search(
    props,
    {
      page: page,
      length: store.getState().searchResultViewReducer.searchResultListPaging.length,
    },
    options,
  )
    .catch((error) => {
      console.error(error);
    });

  if (params && params.json) {
    store.dispatch(SearchResultViewAction.setSearchResultListPagingPage(page));

    let data = SearchProcessor.formatSearchResultListData([], params.json);

    store.dispatch(SearchResultViewAction.setSearchResultListData(data));
  }

  if (!options || !options.disableActivityIndicator) {
    store.dispatch(AppAction.hideActivityIndicator());
  }
};

export const search = (props, params, options) => {
  return new Promise(async (resolve, reject) => {
    let userId = '';

    if (!params || !params.prefetch) {
      store.dispatch(SearchResultViewAction.setSearched(false));

      const jwtToken = await AuthProvider.decodeJWTToken()
        .catch((error) => {
          reject(error);
        });

      userId = (jwtToken && jwtToken.user_id) || '';
    }

    // if (params && params.prefetch) {
    //   SearchProcessor.reload();
    // }

    let tags = store.getState().criteriaSectionReducer.tags.map((groupFrame) => {
      let data = [];

      groupFrame.data.forEach((tag) => {
        // console.log('[tag]', tag.text);

        if (tag.text && tag.text.startsWith('~')) {
          const floatingValue = 5;

          const baseTagText = tag.text.replaceAll('~', '').replaceAll((tag.suffix || ''), '').trim();
          const fromTagText = parseInt(baseTagText) - floatingValue;
          const toTagText = parseInt(baseTagText) + floatingValue;

          for (let i = fromTagText; i <= toTagText; i += 1) {
            data = [
              ...data,
              {
                ...tag,
                text: `${i} ${(tag.suffix || '').trim()}`
              },
            ];
          }
        } else {
          data = [
            ...data,
            tag,
          ];
        }
      });

      return {
        ...groupFrame,
        data: data,
      };
    });

    tags = SearchProcessor.formatTags(tags);

    // if (params && params.prefetch) {
    //   tags = SearchProcessor.formatTags(SearchProcessor.getCriteriaTags());
    // }

    tags = (params && params.tags) || tags;

    let numberOfTasks = 0;
    let numberOfFinsihedTasks = 0;
    let searchApiParams = undefined;
    let searchApiError = undefined;

    // if (
    //   (!options || !options.disableAddRecentSearches)
    //   &&
    //   (!params || !params.prefetch)
    //   &&
    //   tags.length > 0
    // ) {
    //   numberOfTasks += 1;
    //
    //   addRecentSearches(props, { tags: tags })
    //     .then((params) => {
    //       numberOfFinsihedTasks += 1;
    //
    //       if (numberOfTasks === numberOfFinsihedTasks) {
    //         if (searchApiParams) {
    //           resolve(searchApiParams);
    //         } else {
    //           reject(searchApiError);
    //         }
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //
    //       numberOfFinsihedTasks += 1;
    //
    //       if (numberOfTasks === numberOfFinsihedTasks) {
    //         if (searchApiParams) {
    //           resolve(searchApiParams);
    //         } else {
    //           reject(searchApiError);
    //         }
    //       }
    //     });
    // }

    tags = tags.map((tag) => {
      return tag.text;
    });

    numberOfTasks += 1;

    // console.log('[tags]', JSON.stringify(tags));
    SearchApi.request(
      props,
      {
        // tags: JSON.stringify(tags),
        // page: params && params.page,
        // length: params && params.length,
        // prefetch: params && params.prefetch,

        json: {
          user_id: userId,
          search: tags,
        },
      },
      options,
    )
      .then((params) => {
        const { json } = params;

        store.dispatch(CriteriaSectionAction.setLengthOfResults(json.length));

        store.dispatch(SearchResultViewAction.setResults(json));

        store.dispatch(SearchResultViewAction.setSearched(true));

        numberOfFinsihedTasks += 1;

        if (numberOfTasks === numberOfFinsihedTasks) {
          resolve(params);
        } else {
          searchApiParams = params;
        }
      })
      .catch((error) => {
        store.dispatch(SearchResultViewAction.setSearched(true));
        numberOfFinsihedTasks += 1;

        if (numberOfTasks === numberOfFinsihedTasks) {
          resolve(error);
        } else {
          searchApiError = error;
        }
      });
  });
};
