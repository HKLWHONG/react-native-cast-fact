/**
 * @format
 * @flow strict-local
 */

import { PropTypes } from 'react';

import { Environment } from '../config';

import * as Api from '../utils/Api';

import { store } from '../redux';

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

            if (json) {
              resolve({ response: response, json: json });
            } else {
              reject(message);
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
