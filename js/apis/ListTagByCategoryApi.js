/**
 * @format
 * @flow strict-local
 */

import { PropTypes } from 'react';

import { Environment } from '../config';

import * as Request from './Request';
import * as Header from './Header';

import { store } from '../redux';

const IDENTIFIER = 'ListTagByCategoryApi';
const URL = Environment.API_URL + '/tag/category/';

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
      'GET',
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

        if (json) {
          resolve(params);
        } else {
          reject(`[${IDENTIFIER}] JSON not found.`);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
