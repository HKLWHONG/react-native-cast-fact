/**
 * @format
 * @flow strict-local
 */

import i18n from '../../i18n';

import { store, DataAction } from '../redux';

import { Common } from '../utils';

import {
  GetTagApi,
} from '../apis';

export const getTags = (props, params, options) => {
  return new Promise((resolve, reject) => {
    GetTagApi.request(
      props,
      {},
      {},
    )
      .then((json) => {
        store.dispatch(DataAction.setTagData(json.payload));

        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
