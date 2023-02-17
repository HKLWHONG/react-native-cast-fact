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
  profileInfoSetupSectionReducer,
  recentSearchesSectionReducer,
} from './components';

import {
  drawerNavigatorReducer,
  mainTabNavigatorReducer,
  signUpStackNavigatorReducer,
} from './navigators';

import {
  accountChangePasswordStep1ViewReducer,
  accountChangePasswordStep2ViewReducer,
  feedViewReducer,
  launchViewReducer,
  loginViewReducer,
  cameraViewReducer,
  calendarModalViewReducer,
  profileCastSheetEditionViewReducer,
  profileNameDisplaySelectionViewReducer,
  profileNameEditionViewReducer,
  profilePictureSelectionViewReducer,
  createProjectStep1ViewReducer,
  createProjectStep2ViewReducer,
  searchViewReducer,
  searchResultViewReducer,
  signUpViewReducer,
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
  profileInfoSetupSectionReducer,
  recentSearchesSectionReducer,

  // navigators
  drawerNavigatorReducer,
  mainTabNavigatorReducer,
  signUpStackNavigatorReducer,

  // views
  accountChangePasswordStep1ViewReducer,
  accountChangePasswordStep2ViewReducer,
  feedViewReducer,
  launchViewReducer,
  loginViewReducer,
  cameraViewReducer,
  calendarModalViewReducer,
  profileCastSheetEditionViewReducer,
  profileNameDisplaySelectionViewReducer,
  profileNameEditionViewReducer,
  profilePictureSelectionViewReducer,
  createProjectStep1ViewReducer,
  createProjectStep2ViewReducer,
  searchViewReducer,
  searchResultViewReducer,
  signUpViewReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
