/**
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const IDENTIFIER = '@auth';

export const identifiers = {
  token: `${IDENTIFIER}_token`,
};

export const setToken = (value) => {
  return new Promise((resolve, reject) => {
    try {
      if (value === undefined || value === null) {
        AsyncStorage.removeItem(identifiers.token, (error) => {
          if (!error) {
            resolve();
          } else {
            reject(error);
          }
        });
      } else if (typeof value === 'string') {
        AsyncStorage.setItem(
          identifiers.token,
          value,
          (error) => {
            if (!error) {
              console.log(`[${identifiers.token}] token <${value}> saved.`)
              resolve();
            } else {
              reject(error);
            }
          },
        );
      } else {
        reject(`Unexpected data type. (Expected [string] but get [${typeof value}])`);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getToken = () => {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem(identifiers.token, (error, value) => {
        if (value) {
          console.log(`[${identifiers.token}] token <${value}> read.`)
          resolve(value);
        } else {
          reject(
            `Key '${identifiers.token} not found. (error: ${error})'`,
          );
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
