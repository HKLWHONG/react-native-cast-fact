/**
 * @format
 * @flow strict-local
 */

import { PropTypes } from 'react';

import { Environment } from '../config';

import * as Request from './Request';
import * as Header from './Header';

import { store } from '../redux';

import { UserStorage } from '../storages';

const IDENTIFIER = 'GetProfileApi';
const URL = Environment.API_URL + '/profile/{id}/';

export const request = (
  props: PropTypes.object.isRequired,
  body?: PropTypes.object.isRequired,
  options?: PropTypes.object.isRequired,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const profileId = await UserStorage.getProfileId()
      .catch((error) => {
        reject(error);
      });

    Request.request(
      props,
      IDENTIFIER,
      URL.replace('{id}', profileId),
      'GET',
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
