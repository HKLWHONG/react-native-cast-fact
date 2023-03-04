/**
 * @format
 * @flow strict-local
 */

import { PropTypes } from 'react';

import { Environment } from '../config';

import * as Request from './Request';
import * as Header from './Header';

import { store } from '../redux';

const IDENTIFIER = 'LoginApi';
const URL = Environment.API_URL + '/login/';

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
      Header.getHeader(),
      {},
      body,
      {
        ...options,
        useFetch: true,
      },
    )
      .then((params) => {
        const { json } = params;

        if (json && json.token) {
          resolve(params);
        } else {
          reject(`[${IDENTIFIER}] Token not found.`);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
