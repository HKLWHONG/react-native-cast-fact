/**
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const IDENTIFIER = '@user';

export const identifiers = {};

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
      })
      .done();
  });
};
