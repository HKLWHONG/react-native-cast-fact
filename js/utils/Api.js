/**
 * @format
 * @flow strict-local
 */

import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import i18n from '../../i18n';

import { fetch as sslFetch } from 'react-native-ssl-pinning';

const API_LOGGING = true;
const API_TIMEOUT = 30000;

/**
 *
 * Basic Info
 */
const appendQueryToUrl = (url: string, query: PropTypes.object.isRequired) => {
  Object.keys(query).forEach((key, index) => {
    if (API_LOGGING) {
      console.log('key=' + key + ', value=' + query[key]);
    }

    if (index === 0) {
      url += '?' + key + '=' + query[key];
    } else {
      url += '&' + key + '=' + query[key];
    }
  });

  return url;
};

const getBasicInfo = () => {
  return {
    lang: i18n.language.toLowerCase(),
    deviceId: DeviceInfo.getUniqueId(),
    operId: 'APP',
    appVersion: DeviceInfo.getVersion(),
    os: Platform.OS === 'ios' ? 'iOS' : 'Android',
    osVersion:
      Platform.OS === 'ios' ? Platform.Version : DeviceInfo.getSystemVersion(),
  };
};

/**
 * Api
 */
export const request = (
  identifier: string,
  url: string,
  method: string,
  header?: PropTypes.object.isRequired,
  query?: PropTypes.object.isRequired,
  body?: PropTypes.object.isRequired,
  options?: PropTypes.object.isRequired,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (method) {
      if (method.toUpperCase() === 'GET') {
        GET(identifier, url, header, query, options)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      } else if (method.toUpperCase() === 'POST') {
        POST(identifier, url, header, query, body, options)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      } else if (method.toUpperCase() === 'PUT') {
        PUT(identifier, url, header, query, body, options)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      } else if (method.toUpperCase() === 'DELETE') {
        DELETE(identifier, url, header, query, options)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      }
    } else {
      GET(identifier, url, header, query, options)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

export const GET = (
  identifier: string,
  url: string,
  header?: PropTypes.object.isRequired,
  query?: PropTypes.object.isRequired,
  options?: PropTypes.object.isRequired,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    header = {
      'Cache-Control': 'no-cache',
      ...header,
    };

    const basicInfo = getBasicInfo();

    if (query) {
      query = {
        ...query,
        ...basicInfo,
      };
    } else {
      query = basicInfo;
    }

    url = appendQueryToUrl(url, query);

    if (API_LOGGING) {
      console.log(
        '[' + identifier + '] ==================== GET REQUEST ====================\n[URL] ' + url,
      );

      console.log('[Header] ', header);
    }

    const useFetch = options && options.useFetch;

    const fetchImpl = useFetch ? fetch : sslFetch;

    return fetchImpl(url, {
      method: 'GET',
      timeoutInterval: API_TIMEOUT,
      headers: header,
      disableAllSecurity: !options || !options.certs || !options.certs.length,
      sslPinning: {
        certs: options && options.certs,
      },
    })
      .then((response) => {
        const contentType = useFetch
          ? response.headers.get('Content-Type')
          : response.headers['Content-Type'];

        if (contentType && contentType.indexOf('application/json') !== -1) {
          response
            .json()
            .then((json) => {
              if (API_LOGGING) {
                console.log(
                  '[' + identifier + '] ==================== GET RESPONSE ====================\n',
                  {
                    status: response.status,
                    body: json,
                  },
                );
              }

              resolve({
                response: response,
                data: json,
              });
            })
            .catch((error) => {
              if (API_LOGGING) {
                console.log(
                  '[' + identifier + '] ==================== GET RESPONSE ====================\n',
                  error,
                );
              }

              reject(error);
            });
        } else {
          response
            .blob()
            .then((blob) => {
              if (API_LOGGING) {
                console.log(
                  '[' + identifier + '] ==================== GET RESPONSE ====================\n',
                  blob,
                );
              }

              resolve({
                response: response,
                data: blob,
              });
            })
            .catch((error) => {
              if (API_LOGGING) {
                console.log(
                  '[' + identifier + '] ==================== GET RESPONSE ====================\n',
                  error,
                );
              }

              reject(error);
            });
        }
      })
      .catch((error) => {
        if (API_LOGGING) {
          console.log(
            '[' + identifier + '] ==================== GET RESPONSE ====================\n',
            error,
          );
        }

        reject({
          code: 500,
          message: error,
        });
      });
  });
};

export const POST = (
  identifier: string,
  url: string,
  header?: PropTypes.object.isRequired,
  query?: PropTypes.object.isRequired,
  body?: PropTypes.object.isRequired,
  options?: PropTypes.object.isRequired,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    header = {
      'Cache-Control': 'no-cache',
      ...header,
    };

    if (query) {
      url = appendQueryToUrl(url, query);
    }

    const fields = {
      ...getBasicInfo(),
      ...body,
    };

    let formData = [];

    Object.keys(fields).forEach((key, index) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(fields[key] ? fields[key].toString() : '');

      formData.push(encodedKey + "=" + encodedValue);
    });

    formData = formData.join("&");

    if (API_LOGGING) {
      console.log(
        '[' + identifier + '] ==================== POST REQUEST ====================\n[URL] ' + url,
      );

      console.log('[Header]', header);
      console.log('[Body]', formData);
    }

    const useFetch = options && options.useFetch;

    const fetchImpl = useFetch ? fetch : sslFetch;

    return fetchImpl(url, {
      method: 'POST',
      timeoutInterval: API_TIMEOUT,
      headers: header,
      body: formData,
      disableAllSecurity: !options || !options.certs || !options.certs.length,
      sslPinning: {
        certs: options && options.certs,
      },
    })
      .then((response) => {
        const contentType = useFetch
          ? response.headers.get('Content-Type')
          : response.headers['Content-Type'];

        if (contentType && contentType.indexOf('application/json') !== -1) {
          response
            .json()
            .then((json) => {
              if (API_LOGGING) {
                console.log(
                  '[' + identifier + '] ==================== POST RESPONSE ====================\n',
                  {
                    status: response.status,
                    body: json,
                  },
                );
              }

              resolve({
                response: response,
                data: json,
              });
            })
            .catch((error) => {
              if (API_LOGGING) {
                console.log(
                  '[' + identifier + '] ==================== POST RESPONSE ====================\n',
                  error,
                );
              }

              reject(error);
            });
        } else {
          response
            .blob()
            .then((blob) => {
              if (API_LOGGING) {
                console.log(
                  '[' + identifier + '] ==================== POST RESPONSE ====================\n',
                  blob,
                );
              }

              resolve({
                response: response,
                data: blob,
              });
            })
            .catch((error) => {
              if (API_LOGGING) {
                console.log(
                  '[' + identifier + '] ==================== POST RESPONSE ====================\n',
                  error,
                );
              }

              reject(error);
            });
        }
      })
      .catch((error) => {
        if (API_LOGGING) {
          console.log(
            '[' + identifier + '] ==================== POST RESPONSE ====================\n',
            error,
          );
        }

        reject({
          code: 500,
          message: error,
        });
      });
  });
};

// TODO: To be implemented.
export const PUT = (
  identifier: string,
  url: string,
  header?: PropTypes.object.isRequired,
  query?: PropTypes.object.isRequired,
  body?: PropTypes.object.isRequired,
  options?: PropTypes.object.isRequired,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

// TODO: To be implemented.
export const DELETE = (
  identifier: string,
  url: string,
  header?: PropTypes.object.isRequired,
  query?: PropTypes.object.isRequired,
  options?: PropTypes.object.isRequired,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};
