/**
 * @format
 * @flow strict-local
 */

import i18n from '../../i18n';

import { store, AppAction } from '../redux';

import { Common } from '../utils';

import {
  GetFeedApi,
} from '../apis';

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
