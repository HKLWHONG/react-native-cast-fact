/**
 * @format
 * @flow strict-local
 */

import { PropTypes } from 'react';
import {
  Alert,
} from 'react-native';

import { Environment } from '../config';

import * as Api from '../utils/Api';

import { store } from '../redux';

import { AuthProvider } from '../providers';

import i18n from '../../i18n';

export const request = (
  props: PropTypes.object.isRequired,
  identifier: string,
  url: string,
  method: string,
  header?: PropTypes.object.isRequired,
  query?: PropTypes.object.isRequired,
  body?: PropTypes.object.isRequired,
  options?: PropTypes.object.isRequired,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    console.log(`[${identifier}] Api calling...`);

    Api.request(identifier, url, method, header, query, body, {
      ...options,
      certs: Environment.CERTS,
    })
      .then((result) => {
        console.log(`[${identifier}] Api called successfully.`);

        const block = async () => {
          const { response, data } = result;

          const useFetch = options && options.useFetch;

          const contentType = useFetch
            ? response.headers.get('Content-Type')
            : response.headers['Content-Type'];

          if (contentType && contentType.indexOf('application/json') !== -1) {
            const json = data;

            if (response.status === 403) {
              let message = 'The http status is 403.';

              if (json.messages && json.messages.length > 0 && json.messages[0].message) {
                message = json.messages[0].message;
              }

              Alert.alert(
                i18n.t('app.system_error'),
                i18n.t(message),
                [{
                  text: i18n.t('app.ok').toUpperCase(),
                  onPress: () => {
                    AuthProvider.logout()
                      .then(() => {
                        Router.jumpTo(props, 'SearchStackNavigator');
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  },
                }],

              );

              reject(message);
            } else if (json) {
              resolve({ response: response, json: json });
            } else {
              reject('The json is empty.');
            }
          } else {
            const blob = data;

            if (blob && blob.size) {
              resolve({ response: response, data: blob, type: contentType });
            } else {
              reject('The blob is empty.');
            }
          }
        };

        block();
      })
      .catch((error) => {
        const { code, message } = error;

        console.error(`[${identifier}] Api called failed.`);
        console.error('[error]', error);

        const block = () => {
          reject(message);
        };

        block();
      });
  });
};
