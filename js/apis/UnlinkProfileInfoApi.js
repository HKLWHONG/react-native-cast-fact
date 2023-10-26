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

const IDENTIFIER = 'UnlinkProfileInfoApi';
const URL = Environment.API_URL + '/profile/{id}/unlink/';

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
            await Header.getAuthHeader('json'),
            {},
            body,
            {
                ...options,
                useJson: true,
                useFetch: true,
            },
        )
            .then((params) => {
                const { json } = params;
                console.log(params)
                if (json) {
                    resolve(params);
                } else {
                    reject(`[${IDENTIFIER}] Profile ID not found.`);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};
