/**
 * @format
 * @flow strict-local
 */

import { combineReducers } from 'redux';

import {
  appReducer,
  dataReducer,
} from './app';

import {
  feedListReducer,
  recentSearchesReducer,
} from './components';

import {
  drawerReducer,
  mainTabReducer,
} from './navigators';

import {
  feedReducer,
  launchReducer,
  loginReducer,
  signUpReducer,
} from './views';

const reducers = combineReducers({
  appReducer,
  dataReducer,
  feedListReducer,
  recentSearchesReducer,
  drawerReducer,
  feedReducer,
  launchReducer,
  loginReducer,
  mainTabReducer,
  signUpReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
