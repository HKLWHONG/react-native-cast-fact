/**
 * @format
 * @flow strict-local
 */

import { PropTypes } from 'react';

import { Environment } from '../config';

import * as Request from './Request';
import * as Header from './Header';

import { store } from '../redux';

const IDENTIFIER = 'RegisterApi';
const URL = Environment.API_URL + '/register/';

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
        const { response, json } = params;

        if (response.status === 200) {
          resolve(params);
        } else {
          let error = undefined;

          if (json.email && json.email.length > 0 ) {
            error = json.email[0]
          }

          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
