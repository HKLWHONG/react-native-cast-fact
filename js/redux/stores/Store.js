/**
 * @format
 * @flow strict-local
 */

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const configureStore = (initialState) => {
  return createStoreWithMiddleware(reducer, initialState);
};

const store = configureStore();

export default store;
