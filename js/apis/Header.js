/**
 * @format
 * @flow strict-local
 */

import i18n from '../../i18n';

export const getHeader = () => {
  return {
    'Accept-Language': `${i18n.language.toLowerCase().substring(0, 2)}`,
  };
};
