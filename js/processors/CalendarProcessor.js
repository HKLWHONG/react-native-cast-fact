/**
 * @format
 * @flow strict-local
 */

import Moment from 'moment';

export const formatDate = (date) => {
  return Moment(date).format('D MMM yyyy');
};
