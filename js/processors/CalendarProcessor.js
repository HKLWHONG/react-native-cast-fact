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

export const toApiDateString = (date) => {
  return Moment(Moment(date, 'D MMM yyyy').toDate()).format('yyyy-M-DD');
};

export const getYear = (date) => {
  return Moment(date).format('yyyy');
};

export const getMonth = (date) => {
  return Moment(date).format('MMMM');
};

export const getDay = (date) => {
  return Moment(date).format('D');
};
