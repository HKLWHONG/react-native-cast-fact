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
const URL = Environment.API_URL + '/search/';

export const request = (
  props: PropTypes.object.isRequired,
  body?: PropTypes.object.isRequired,
  options?: PropTypes.object.isRequired,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    Request.request(
      props,
      IDENTIFIER,
      URL,
      'POST',
      Header.getHeader('json'),
      {},
      body,
      {
        ...options,
        useJson: true,
        useFetch: true,
      },
    )
      .then((params) => {
        const { response } = params;

        if (response.status === 200) {
          resolve(params);
        } else {
          reject(`[${IDENTIFIER}] Payload not found.`);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
