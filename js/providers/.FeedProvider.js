/**
 * @format
 * @flow strict-local
 */

import {
  store,
  AppAction,
  FeedViewAction,
} from '../redux';

import {
  Common,
} from '../utils';

import {
  FeedProcessor,
} from '../processors';

import {
  FeedStorage,
} from '../storages';

import {
  GetFeedApi,
} from '../apis';

import i18n from '../../i18n';

const IDENTIFIER = 'FeedProvider';

export const prefetchFeeds = (props, params, options) => {
  return new Promise(async (resolve) => {
    let page = 1;

    let cachedFeeds = await FeedStorage.getFeeds()
      .catch((error) => {
        console.error(error);
      });

    if (cachedFeeds) {
      console.log(`[${IDENTIFIER}] cached-feeds-found.`);

      store.dispatch(FeedViewAction.setFeedsPagingPage(page));

      store.dispatch(FeedViewAction.setFeeds(cachedFeeds));

      getFeeds(
        props,
        {
          page: page,
          length: store.getState().feedViewReducer.feedsPaging.length,
        },
        options,
      )
        .then((params) => {
          const { json } = params;

          let feeds = FeedProcessor.format([], json.payload);

          FeedStorage.setFeeds(feeds)
            .catch((error) => {
              console.error(error);
            });

          if (JSON.stringify(cachedFeeds) !== JSON.stringify(feeds)) {
            console.log(`[${IDENTIFIER}] need-to-reload-feeds.`);

            store.dispatch(FeedViewAction.setFeedsPagingPage(page));
            store.dispatch(FeedViewAction.setFeeds(feeds));
          } else {
            console.log(`[${IDENTIFIER}] no-need-to-reload-feeds.`);
          }

          resolve();
        })
        .catch((error) => {
          console.error(error);

          resolve();
        });
    } else {
      console.log(`[${IDENTIFIER}] no-cached-feeds.`);

      params = await getFeeds(
        props,
        {
          page: page,
          length: store.getState().feedViewReducer.feedsPaging.length,
        },
        options,
      )
        .catch((error) => {
          console.error(error);
        });

      if (params && params.json && params.json.payload) {
        let feeds = FeedProcessor.format([], params.json.payload);

        FeedStorage.setFeeds(feeds)
          .catch((error) => {
            console.error(error);
          });

        store.dispatch(FeedViewAction.setFeedsPagingPage(page));
        store.dispatch(FeedViewAction.setFeeds(feeds));
      }

      resolve();
    }
  });
};

export const getFeeds = (props, params, options) => {
  return new Promise((resolve, reject) => {
    GetFeedApi.request(
      props,
      {
        page: params && params.page,
        length: params && params.length,
      },
      options,
    )
      .then((params) => {
        resolve(params);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
