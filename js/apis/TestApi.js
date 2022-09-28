/**
 * @format
 * @flow strict-local
 */

import { PropTypes } from 'react';

import Environment from '../config/Environment';

import * as Request from './Request';
import * as Header from './Header';

import { store } from '../redux';

const IDENTIFIER = 'TestApi';
const URL = Environment.API_URL + '/items';

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
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
