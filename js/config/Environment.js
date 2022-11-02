/**
 * @format
 * @flow strict-local
 */

 if (!__DEV__) {
  console.log = () => {};
  console.error = () => {};
}

const Environment = {
  API_URL: 'https://www.kcplace.com/castfact/public/api/fn',

  USE_DUMMY_DATA: false,

  CERTS: [],

  MAX_RECENT_SEARCHES_NUM: 2,
};

export default Environment;
