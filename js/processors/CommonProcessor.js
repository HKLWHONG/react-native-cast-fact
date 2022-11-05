/**
 * @format
 * @flow strict-local
 */

import _ from 'lodash';

export const deepCopy = (object) => {
  return _.cloneDeep(object);
};
