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
  profileInfoCardReducer,
  slideSheetReducer,
  feedListReducer,
  profileCastingSheetListReducer,
  searchBarReducer,
  criteriaSectionReducer,
  findTalentSectionReducer,
  recentSearchesSectionReducer,
} from './components';

import {
  feedReducer,
  launchReducer,
  loginReducer,
  calendarModalReducer,
  createProjectStep1Reducer,
  searchReducer,
  searchResultReducer,
  signUpReducer,
} from './views';

const reducers = combineReducers({
  // app
  appReducer,
  dataReducer,
  drawerReducer,
  mainTabReducer,

  // components
  profileInfoCardReducer,
  slideSheetReducer,
  feedListReducer,
  profileCastingSheetListReducer,
  searchBarReducer,
  criteriaSectionReducer,
  findTalentSectionReducer,
  recentSearchesSectionReducer,

  // views
  feedReducer,
  launchReducer,
  loginReducer,
  calendarModalReducer,
  createProjectStep1Reducer,
  searchReducer,
  searchResultReducer,
  signUpReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
