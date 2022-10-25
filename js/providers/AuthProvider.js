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
} from '../apis';

const IDENTIFIER = 'AuthProvider';

export const login = (props, params, options) => {
  return new Promise((resolve, reject) => {
    LoginApi.request(
      props,
      {
        email: params && params.email,
        password: params && params.password,
      },
      {},
    )
      .then((json) => {
        AuthStorage.setToken(json.payload.token)
          .then(() => {
            resolve(json);
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

// export const logout = (props, params, options) => {
//   return new Promise((resolve, reject) => {
//     LogoutAPI.request(props, {
//       activityIndicatorMessage: i18n.t('providers.auth.logging_out'),
//       ...options,
//     })
//       .then(async (json) => {
//         await Common.reset(props).catch((error) => {
//           console.error(error);
//         });
//
//         resolve(json);
//       })
//       .catch(async (error) => {
//         await Common.reset(props).catch((resetError) => {
//           console.error(resetError);
//         });
//
//         reject(error);
//       })
//       .done();
//   });
// };
