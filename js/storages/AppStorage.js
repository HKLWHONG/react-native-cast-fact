/**
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGGING = false;

const IDENTIFIER = '@app';

export const identifiers = {
  language: `${IDENTIFIER}_language`,
};

export const setLanguage = (value) => {
  return new Promise((resolve, reject) => {
    try {
      if (value === undefined || value === null) {
        AsyncStorage.removeItem(identifiers.language, (error) => {
          if (!error) {
            resolve();
          } else {
            reject(error);
          }
        });
      } else if (typeof value === 'string') {
        AsyncStorage.setItem(identifiers.language, value, (error) => {
          if (!error) {
            resolve();
          } else {
            reject(error);
          }
        });
      } else {
        reject(`Unexpected data type. (typeof ${typeof value})`);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getLanguage = () => {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(identifiers.language, (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(`Key '${identifiers.language} not found. (error: ${error})'`);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const removeAll = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getAllKeys()
      .then((keys) => {
        const filteredKeys = keys.filter((key) => {
          return key.startsWith(IDENTIFIER);
        });

        AsyncStorage.multiRemove(filteredKeys, (error) => {
          if (!error) {
            resolve();
          } else {
            reject(error);
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
