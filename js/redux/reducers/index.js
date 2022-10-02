/**
 * @format
 * @flow strict-local
 */

import { combineReducers } from 'redux';

import appReducer from './AppReducer';
import dataReducer from './DataReducer';
import drawerReducer from './DrawerReducer';
import feedReducer from './FeedReducer';
import launchReducer from './LaunchReducer';
import loginReducer from './LoginReducer';
import mainTabReducer from './MainTabReducer';
import signUpReducer from './SignUpReducer';

const reducers = combineReducers({
  appReducer,
  dataReducer,
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
