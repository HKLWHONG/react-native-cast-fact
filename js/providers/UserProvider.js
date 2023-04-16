/**
 * @format
 * @flow strict-local
 */

import { store, DataAction } from '../redux';

import {
  CreateProfileApi,
  GetProfileApi,
  LinkProfileApi,
  UploadProfileImageApi,
} from '../apis';

import { UserStorage } from '../storages';

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

        const profileId = json[0].profile;

        LinkProfileApi.request(
          props,
          {
            profile_id: profileId,
          },
          options,
        )
          .then((params) => {
            UserStorage.setProfileId(profileId)
              .then(() => {
                resolve(params);
              })
              .catch((error) => {
                reject(error);
              });
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

export const getProfile = (props, params, options) => {
  return new Promise((resolve, reject) => {
    GetProfileApi.request(
      props,
      {},
      options,
    )
      .then((params) => {
        const { json } = params;

        store.dispatch(DataAction.setUserProfile(json));

        resolve(params);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
