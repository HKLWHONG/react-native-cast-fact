/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './js/redux';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';

import './i18n';
import { Translation } from 'react-i18next';

export default class App extends Component {

  render() {
    return (
      <Translation>
        {(t) => (
          <Provider store={store}>
            <Main />
          </Provider>
        )}
      </Translation>
    );
  }
}
