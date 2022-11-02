/**
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGGING = false;

const IDENTIFIER = '@auth';

export const identifiers = {
  token: `${IDENTIFIER}_token`,
};

export const setToken = (value) => {
  return new Promise((resolve, reject) => {
    let identifier = identifiers.token;
    let expectedDataType = 'string';

    try {
      if (value === undefined || value === null) {
        AsyncStorage.removeItem(identifier, (error) => {
          if (!error) {
            resolve();
          } else {
            reject(error);
          }
        });
      } else if (typeof value === expectedDataType) {
        AsyncStorage.setItem(
          identifier,
          value,
          (error) => {
            if (!error) {
              if (LOGGING) {
                console.log(`[${identifier}] <${value}> saved.`);
              }

              resolve();
            } else {
              reject(error);
            }
          },
        );
      } else {
        reject(`[${identifier}] Unexpected data type. (Expected <${expectedDataType}> but got <${typeof value}>)`);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getToken = () => {
  return new Promise((resolve, reject) => {
    let identifier = identifiers.token;

    try {
      AsyncStorage.getItem(identifier, (error, value) => {
        if (value) {
          if (LOGGING) {
            console.log(`[${identifier}] <${value}> read.`);
          }

          resolve(value);
        } else {
          reject(
            `Key '<${identifier}> not found. (error: ${error})'`,
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
