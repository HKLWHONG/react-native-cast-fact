/**
 * @format
 * @flow strict-local
 */

import { PropTypes } from 'react';

import { Environment } from '../config';

import * as Request from './Request';
import * as Header from './Header';

import { store } from '../redux';

const IDENTIFIER = 'SearchApi';
const URL = Environment.API_URL + '/search';

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
      .then((json) => {
        if (json && json.payload) {
          resolve(json);
        } else {
          reject(`[${IDENTIFIER}] Payload not found.`);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
