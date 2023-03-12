/**
 * @format
 * @flow strict-local
 */

import i18n from '../../i18n';

import { store, AppAction } from '../redux';

import { Common } from '../utils';

import { AuthStorage } from '../storages';

import {
  LoginApi,
  RegisterApi,
} from '../apis';

import jwt_decode from "jwt-decode";

const IDENTIFIER = 'AuthProvider';

export const login = (props, params, options) => {
  return new Promise((resolve, reject) => {
    LoginApi.request(
      props,
      {
        email: params && params.email,
        password: params && params.password,
      },
      options,
    )
      .then((params) => {
        const { json } = params;

        AuthStorage.setToken(json.token)
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
  });
};

export const register = (props, params, options) => {
  return new Promise((resolve, reject) => {
    RegisterApi.request(
      props,
      {
        email: params && params.email,
        password: params && params.password,
        phone_number: params && params.phoneNumber,
      },
      options,
    )
      .then(() => {
        login(props, params, options)
          .then((params) => {
            const { json } = params;

            AuthStorage.setToken(json.token)
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

export const decodeJWTToken = (props, params, options) => {
  return new Promise((resolve, reject) => {
    AuthStorage.getToken()
      .then((token) => {
        resolve(jwt_decode(token));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = (props, params, options) => {
  return new Promise((resolve, reject) => {
    AuthStorage.removeAll()
    .then(() => {
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
  });

  // return new Promise((resolve, reject) => {
  //   LogoutAPI.request(props, {
  //     activityIndicatorMessage: i18n.t('providers.auth.logging_out'),
  //     ...options,
  //   })
  //     .then(async (json) => {
  //       await Common.reset(props).catch((error) => {
  //         console.error(error);
  //       });
  //
  //       resolve(json);
  //     })
  //     .catch(async (error) => {
  //       await Common.reset(props).catch((resetError) => {
  //         console.error(resetError);
  //       });
  //
  //       reject(error);
  //     })
  //     .done();
  // });
};
