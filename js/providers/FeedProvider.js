/**
 * @format
 * @flow strict-local
 */

import i18n from '../../i18n';

import {
  store,
  AppAction,
  FeedAction,
} from '../redux';

import {
  Common,
  FeedProcessor,
} from '../utils';

import {
  FeedStorage,
} from '../storages';

import {
  GetFeedApi,
} from '../apis';

const IDENTIFIER = 'FeedProvider';

export const prefetchFeeds = async (props) => {
  let page = 1;

  let cachedFeeds = await FeedStorage.getFeeds()
    .catch((error) => {
      console.error(error);
    });

  if (cachedFeeds) {
    store.dispatch(FeedAction.setFeedsPagingPage(page));

    store.dispatch(FeedAction.setFeeds(cachedFeeds));

    getFeeds(props, {
      page: page,
      length: store.getState().feedReducer.feedsPaging.length,
    })
      .then((json) => {
        if (json.payload && json.payload.length > 0) {
          let feeds = FeedProcessor.format([], json.payload);

          FeedStorage.setFeeds(feeds)
            .catch((error) => {
              console.error(error);
            });

          if (JSON.stringify(cachedFeeds) !== JSON.stringify(feeds)) {
            console.log(`[${IDENTIFIER}] need-to-reload-feeds.`);

            store.dispatch(FeedAction.setFeedsPagingPage(page));
            store.dispatch(FeedAction.setFeeds(feeds));
          } else {
            console.log(`[${IDENTIFIER}] no-need-to-reload-feeds.`);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log(`[${IDENTIFIER}] no-cached-feeds.`);

    let json = await getFeeds(props, {
      page: page,
      length: store.getState().feedReducer.feedsPaging.length,
    })
      .catch((error) => {
        console.error(error);
      });

    if (json && json.payload && json.payload.length > 0) {
      let feeds = FeedProcessor.format([], json.payload);

      FeedStorage.setFeeds(feeds)
        .catch((error) => {
          console.error(error);
        });

      store.dispatch(FeedAction.setFeedsPagingPage(page));
      store.dispatch(FeedAction.setFeeds(feeds));
    }
  }
};

export const getFeeds = (props, params, options) => {
  return new Promise((resolve, reject) => {
    GetFeedApi.request(
      props,
      {
        page: params && params.page,
        length: params && params.length,
      },
      {},
    )
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
