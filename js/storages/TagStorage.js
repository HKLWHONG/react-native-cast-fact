/**
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const IDENTIFIER = '@tag';

export const identifiers = {
  tags: `${IDENTIFIER}_tags`,
};

export const setTags = (value) => {
  return new Promise((resolve, reject) => {
    let identifier = identifiers.tags;
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
              console.log(`[${identifier}] <${value}> saved.`);

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

export const getTags = () => {
  return new Promise((resolve, reject) => {
    let identifier = identifiers.tags;

    try {
      AsyncStorage.getItem(identifier, (error, value) => {
        if (value) {
          console.log(`[${identifier}] <${value}> read.`);

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
