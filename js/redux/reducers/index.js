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
  drawerReducer,
  mainTabReducer,
  signUpStackNavigatorReducer,
} from './navigators';

import {
  feedReducer,
  launchReducer,
  loginReducer,
  calendarModalReducer,
  createProjectStep1Reducer,
  createProjectStep2Reducer,
  searchReducer,
  searchResultReducer,
  signUpReducer,
} from './views';

const reducers = combineReducers({
  // app
  appReducer,
  dataReducer,

  // components
  profileInfoCardReducer,
  slideSheetReducer,
  feedListReducer,
  profileCastingSheetListReducer,
  searchBarReducer,
  criteriaSectionReducer,
  findTalentSectionReducer,
  recentSearchesSectionReducer,

  // navigators
  drawerReducer,
  mainTabReducer,
  signUpStackNavigatorReducer,

  // views
  feedReducer,
  launchReducer,
  loginReducer,
  calendarModalReducer,
  createProjectStep1Reducer,
  createProjectStep2Reducer,
  searchReducer,
  searchResultReducer,
  signUpReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
