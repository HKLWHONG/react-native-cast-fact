/**
 * @format
 * @flow strict-local
 */

import { AuthStorage } from '../storages';

import i18n from '../../i18n';

export const getHeader = () => {
  return {
    'Accept-Language': `${i18n.language.toLowerCase().substring(0, 2)}`,
  };
};

export const getAuthHeader = async () => {
  const token = await AuthStorage.getToken().catch((error) => {
    console.error(error);
  });

  return {
    Authorization: `Bearer ${token}`,
    'Accept-Language': `${i18n.language.toLowerCase().substring(0, 2)}`,
  };
};
