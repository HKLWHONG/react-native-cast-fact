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

import { UserStorage } from '../storages';

const IDENTIFIER = 'UploadProfileImageApi';
const URL = Environment.API_URL + '/profile/{id}/update_image/';

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
      'POST',
      await Header.getAuthHeader('file'),
      {},
      body,
      {
        ...options,
        useFile: true,
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
