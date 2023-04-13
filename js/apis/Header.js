/**
 * @format
 * @flow strict-local
 */

import { AuthStorage } from '../storages';

import i18n from '../../i18n';

export const getHeader = (type) => {
  let contentType = 'application/x-www-form-urlencoded;charset=UTF-8';

  if (type && type.toLowerCase() === 'json'.toLowerCase()) {
    contentType = 'application/json';
  } else if (type && type.toLowerCase() === 'file'.toLowerCase()) {
    contentType = 'multipart/form-data';
  }

  return {
    'Content-Type': contentType,
    'Accept-Language': `${i18n.language.toLowerCase().substring(0, 2)}`,
  };
};

export const getAuthHeader = async (type) => {
  let header = getHeader(type);

  const token = await AuthStorage.getToken().catch((error) => {
    console.error(error);
  });

  return {
    ...header,
    Authorization: `Bearer ${token}`,
  };
};
