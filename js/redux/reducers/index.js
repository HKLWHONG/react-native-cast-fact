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
  slideSheetReducer,
  // feedListReducer,
  profileCastingSheetListReducer,
  searchBarReducer,
  criteriaSectionReducer,
  findTalentSectionReducer,
  recentSearchesSectionReducer,
  segmentedControlReducer,
  profileInfoSetupViewReducer,
  profileInfoViewReducer,
  searchStackNavigatorRightViewReducer,
} from './components';

import {
  drawerNavigatorReducer,
  mainTabNavigatorReducer,
  searchStackNavigatorReducer,
  settingsStackNavigatorReducer,
  signUpStackNavigatorReducer,
} from './navigators';

import {
  accountChangePasswordStep1ViewReducer,
  accountChangePasswordStep2ViewReducer,
  // feedViewReducer,
  launchViewReducer,
  loginViewReducer,
  cameraViewReducer,
  calendarModalViewReducer,
  profileCastSheetEditionViewReducer,
  profileNameDisplaySelectionViewReducer,
  profileNameEditionViewReducer,
  profilePictureSelectionViewReducer,
  profileViewReducer,
  // createProjectStep1ViewReducer,
  // createProjectStep2ViewReducer,
  searchResultProfileViewReducer,
  searchResultViewReducer,
  searchViewReducer,
  settingsViewReducer,
  signUpViewReducer,
} from './views';

const reducers = combineReducers({
  // app
  appReducer,
  dataReducer,

  // components
  slideSheetReducer,
  // feedListReducer,
  profileCastingSheetListReducer,
  searchBarReducer,
  criteriaSectionReducer,
  findTalentSectionReducer,
  recentSearchesSectionReducer,
  segmentedControlReducer,
  profileInfoSetupViewReducer,
  profileInfoViewReducer,
  searchStackNavigatorRightViewReducer,

  // navigators
  drawerNavigatorReducer,
  mainTabNavigatorReducer,
  searchStackNavigatorReducer,
  settingsStackNavigatorReducer,
  signUpStackNavigatorReducer,

  // views
  accountChangePasswordStep1ViewReducer,
  accountChangePasswordStep2ViewReducer,
  // feedViewReducer,
  launchViewReducer,
  loginViewReducer,
  cameraViewReducer,
  calendarModalViewReducer,
  profileCastSheetEditionViewReducer,
  profileNameDisplaySelectionViewReducer,
  profileNameEditionViewReducer,
  profilePictureSelectionViewReducer,
  profileViewReducer,
  // createProjectStep1ViewReducer,
  // createProjectStep2ViewReducer,
  searchResultProfileViewReducer,
  searchResultViewReducer,
  searchViewReducer,
  settingsViewReducer,
  signUpViewReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
