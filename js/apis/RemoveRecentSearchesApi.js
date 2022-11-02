/**
 * @format
 * @flow strict-local
 */

import { PropTypes } from 'react';

import { Environment } from '../config';

import * as Request from './Request';
import * as Header from './Header';

import { store } from '../redux';

const IDENTIFIER = 'RemoveRecentSearchesApi';
const URL = Environment.API_URL + '/recent_searches/delete';

export const request = (
  props: PropTypes.object.isRequired,
  body?: PropTypes.object.isRequired,
  options?: PropTypes.object.isRequired,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    Request.request(
      props,
      IDENTIFIER,
      URL,
      'POST',
      await Header.getAuthHeader(),
      {},
      body,
      {
        ...options,
        useFetch: true,
      },
    )
      .then((params) => {
        const { response } = params;

        if (response.status === 200) {
          resolve(params);
        } else {
          reject(`[${IDENTIFIER}] Delete failed.`);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
