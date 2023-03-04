/**
 * @format
 * @flow strict-local
 */

import { AuthStorage } from '../storages';

import i18n from '../../i18n';

export const getHeader = () => {
  return {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Accept-Language': `${i18n.language.toLowerCase().substring(0, 2)}`,
  };
};

export const getAuthHeader = async () => {
  let header = getHeader();

  const token = await AuthStorage.getToken().catch((error) => {
    console.error(error);
  });

  return {
    ...header,
    Authorization: `Bearer ${token}`,
  };
};
