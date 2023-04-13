/**
 * @format
 * @flow strict-local
 */

import { store } from '../redux';

import {
  CreateProfileApi,
  LinkProfileApi,
  UploadProfileImageApi,
} from '../apis';

const IDENTIFIER = 'UserProvider';

export const createAndLinkProfile = (props, params, options) => {
  return new Promise((resolve, reject) => {
    CreateProfileApi.request(
      props,
      {
        json: params,
      },
      options,
    )
      .then((params) => {
        const { json } = params;

        LinkProfileApi.request(
          props,
          {
            profile_id: json[0].profile,
          },
          options,
        )
          .then((params) => {
            resolve(params);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const uploadProfileImage = (props, params, options) => {
  return new Promise((resolve, reject) => {
    UploadProfileImageApi.request(
      props,
      {
        file: params,
      },
      options,
    )
      .then((params) => {
        const { json } = params;

        resolve(params);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
