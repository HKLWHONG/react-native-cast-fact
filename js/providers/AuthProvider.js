/**
 * @format
 * @flow strict-local
 */

import {
  store,
  AppAction,
  DataAction,
  ProfileViewAction,
} from '../redux';

import { Common } from '../utils';

import { UserProvider } from '../providers';

import { AuthStorage, UserStorage } from '../storages';

import {
  LoginApi,
  RegisterApi,
  GetUserApi,
  ChangePasswordApi,
} from '../apis';

import jwt_decode from "jwt-decode";

import i18n from '../../i18n';

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

        const profileId = json.profile_id;

        AuthStorage.setToken(json.token)
          .then(() => {
            store.dispatch(DataAction.setIsLoggedIn(true));

            GetUserApi.request(
              props,
              {},
              options,
            )
              .then((params) => {
                const { json } = params;

                store.dispatch(DataAction.setUserData(json));

                if (profileId) {
                  UserStorage.setProfileId(profileId)
                    .then(() => {
                      UserProvider.getProfile(props, {}, options)
                        .then((params) => {
                          const { json } = params;

                          store.dispatch(DataAction.setUserProfile(json));

                          resolve(params);
                        })
                        .catch((error) => {
                          reject(error);
                        });
                    })
                    .catch((error) => {
                      reject(error);
                    });
                } else {
                  resolve(params);
                }
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
    Promise.all([
      AuthStorage.removeAll(),
      UserStorage.removeAll(),
    ])
      .then(() => {
        store.dispatch(DataAction.reset());
        store.dispatch(ProfileViewAction.reset());

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

export const changePassword = (props, params, options) => {
  return new Promise((resolve, reject) => {
    ChangePasswordApi.request(
      props,
      {
        current_password: params && params.password,
        new_password: params && params.newPassword,
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
