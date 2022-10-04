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
  searchBarReducer,
  criteriaSectionReducer,
  recentSearchesSectionReducer,
} from './components';

import {
  drawerReducer,
  mainTabReducer,
} from './navigators';

import {
  feedReducer,
  launchReducer,
  loginReducer,
  searchReducer,
  searchResultReducer,
  signUpReducer,
} from './views';

const reducers = combineReducers({
  appReducer,
  dataReducer,
  feedListReducer,
  searchBarReducer,
  criteriaSectionReducer,
  recentSearchesSectionReducer,
  drawerReducer,
  feedReducer,
  launchReducer,
  loginReducer,
  searchReducer,
  searchResultReducer,
  mainTabReducer,
  signUpReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
