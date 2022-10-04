/**
 * @format
 * @flow strict-local
 */

import { combineReducers } from 'redux';

import {
  appReducer,
  dataReducer,
  drawerReducer,
  mainTabReducer,
} from './app';

import {
  feedListReducer,
  searchBarReducer,
  criteriaSectionReducer,
  findTalentSectionReducer,
  recentSearchesSectionReducer,
} from './components';

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
  findTalentSectionReducer,
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
