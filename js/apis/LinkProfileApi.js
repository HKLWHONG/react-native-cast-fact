/**
 * @format
 * @flow strict-local
 */

import { PropTypes } from 'react';

import { Environment } from '../config';

import * as Request from './Request';
import * as Header from './Header';

import { store } from '../redux';

import { AuthProvider } from '../providers';

const IDENTIFIER = 'LinkProfileApi';
const URL = Environment.API_URL + '/user/{id}/link_profile/';

export const request = (
  props: PropTypes.object.isRequired,
  body?: PropTypes.object.isRequired,
  options?: PropTypes.object.isRequired,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const jwtToken = await AuthProvider.decodeJWTToken()
      .catch((error) => {
        reject(error);
      });
    Request.request(
      props,
      IDENTIFIER,
      URL.replace('{id}', jwtToken.user_id),
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
        const { response, json } = params;
        if (response.status === 200) {
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
