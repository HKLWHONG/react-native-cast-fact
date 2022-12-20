/**
 * @format
 * @flow strict-local
 */

import Moment from 'moment';

export const formatDate = (date) => {
  return Moment(date).format('D MMM yyyy');
};

export const toDateString = (date) => {
  return Moment(Moment(date, 'D MMM yyyy').toDate()).format('yyyy-MM-DD');
};
