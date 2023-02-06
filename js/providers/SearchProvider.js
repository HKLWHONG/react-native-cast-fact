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
  SearchResultAction,
} from '../redux';

import {
  Common,
} from '../utils';

import {
  CommonProcessor,
  FeedProcessor,
  RecentSearchProcessor,
  SearchProcessor,
  TagProcessor,
} from '../processors';

import {
  SearchStorage,
} from '../storages';

import {
  AddRecentSearchesApi,
  GetRecentSearchesApi,
  RemoveRecentSearchesApi,
  SearchApi,
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

          SearchStorage.setRecentSearches(json.payload)
            .catch((error) => {
              console.error(error);
            });

          if (JSON.stringify(cachedRecentSearches) !== JSON.stringify(json.payload)) {
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

      if (params && params.json && params.json.payload) {
        SearchStorage.setRecentSearches(params.json.payload)
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
    GetRecentSearchesApi.request(
      props,
      {
        page: params && params.page,
        length: params && params.length,
      },
      options,
    )
      .then((params) => {
        const { json } = params;

        store.dispatch(DataAction.setRecentSearchesSectionTags(json.payload));

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

    let tags = RecentSearchProcessor.format(params.tags);

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

        SearchStorage.setRecentSearches(json.payload)
          .catch((error) => {
            console.error(error);
          });

        store.dispatch(DataAction.setRecentSearchesSectionTags(json.payload));

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

        SearchStorage.setRecentSearches(json.payload)
          .catch((error) => {
            console.error(error);
          });

        store.dispatch(DataAction.setRecentSearchesSectionTags(json.payload));

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
      length: store.getState().searchResultReducer.feedsPaging.length,
    },
    options,
  )
    .catch((error) => {
      console.error(error);
    });

  if (params && params.json && params.json.payload) {
    store.dispatch(SearchResultAction.setFeedsPagingPage(page));

    let feeds = FeedProcessor.format([], params.json.payload);

    store.dispatch(SearchResultAction.setFeeds(feeds));
  }

  if (!options || !options.disableActivityIndicator) {
    store.dispatch(AppAction.hideActivityIndicator());
  }
};

export const search = (props, params, options) => {
  return new Promise(async (resolve, reject) => {
    if (!params || !params.prefetch) {
      store.dispatch(SearchResultAction.setSearched(false));
    }

    // if (params && params.prefetch) {
    //   SearchProcessor.reload();
    // }

    let tags = SearchProcessor.format(store.getState().criteriaSectionReducer.tags);

    // if (params && params.prefetch) {
    //   tags = SearchProcessor.format(SearchProcessor.getCriteriaTags());
    // }

    tags = (params && params.tags) || tags;

    let numberOfTasks = 0;
    let numberOfFinsihedTasks = 0;
    let searchApiParams = undefined;
    let searchApiError = undefined;

    if (
      (!options || !options.disableAddRecentSearches)
      &&
      (!params || !params.prefetch)
      &&
      tags.length > 0
    ) {
      numberOfTasks += 1;

      addRecentSearches(props, { tags: tags })
        .then((params) => {
          numberOfFinsihedTasks += 1;

          if (numberOfTasks === numberOfFinsihedTasks) {
            if (searchApiParams) {
              resolve(searchApiParams);
            } else {
              reject(searchApiError);
            }
          }
        })
        .catch((error) => {
          console.error(error);

          numberOfFinsihedTasks += 1;

          if (numberOfTasks === numberOfFinsihedTasks) {
            if (searchApiParams) {
              resolve(searchApiParams);
            } else {
              reject(searchApiError);
            }
          }
        });
    }

    numberOfTasks += 1;

    SearchApi.request(
      props,
      {
        tags: JSON.stringify(tags),
        page: params && params.page,
        length: params && params.length,
        prefetch: params && params.prefetch,
      },
      options,
    )
      .then((params) => {
        const { json } = params;

        store.dispatch(CriteriaSectionAction.setLengthOfResults(json.payload.length));

        store.dispatch(SearchResultAction.setResults(json.payload));

        store.dispatch(SearchResultAction.setSearched(true));

        numberOfFinsihedTasks += 1;

        if (numberOfTasks === numberOfFinsihedTasks) {
          resolve(params);
        } else {
          searchApiParams = params;
        }
      })
      .catch((error) => {
        store.dispatch(SearchResultAction.setSearched(true));

        numberOfFinsihedTasks += 1;

        if (numberOfTasks === numberOfFinsihedTasks) {
          resolve(error);
        } else {
          searchApiError = error;
        }
      });
  });
};
