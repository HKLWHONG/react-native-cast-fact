/**
 * @format
 * @flow strict-local
 */

 if (!__DEV__) {
  console.log = () => {};
  console.error = () => {};
}

const Environment = {
  API_URL: 'https://www.kcplace.com/minomeHOME/public/api',

  CERTS: [],
};

export default Environment;
