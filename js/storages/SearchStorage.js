/**
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGGING = false;

const IDENTIFIER = '@search';

export const identifiers = {
  recentSearches: `${IDENTIFIER}_recent_searches`,
};

export const setRecentSearches = (value) => {
  return new Promise((resolve, reject) => {
    let identifier = identifiers.recentSearches;
    let expectedDataType = 'object';

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
          JSON.stringify(value),
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

export const getRecentSearches = () => {
  return new Promise((resolve, reject) => {
    let identifier = identifiers.recentSearches;

    try {
      AsyncStorage.getItem(identifier, (error, value) => {
        if (value) {
          if (LOGGING) {
            console.log(`[${identifier}] <${value}> read.`);
          }

          resolve(JSON.parse(value));
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
