/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  CameraStackNavigatorAction,
} from '../../redux';

import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle } from '@react-navigation/elements';

import { BaseComponent } from '../../components';

import { } from '../../project-components';

import {
  CameraView,
} from '../../views';

import { Theme, Router } from '../../utils';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const Stack = createStackNavigator();

const preview = require('../../../assets/images/preview/preview.png');

class CameraStackNavigator extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();

    this.initialize();
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.clearData();
  }

  initialize = () => {
    const { props } = this;
  };

  clearData = () => {
    const { props } = this;
  };

  render() {
    const { props } = this;

    // console.log(`Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`);
    //
    // const newCameraPermission = await Camera.requestCameraPermission();
    // const newMicrophonePermission = await Camera.requestMicrophonePermission();
    //
    // if (cameraPermission == null || microphonePermission == null) {
    //   return null;
    // }
    //
    // const showPermissionsPage = cameraPermission !== 'authorized' || microphonePermission === 'not-determined';

    return (
      <Translation>
        {(t) => (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              statusBarStyle: 'dark',
              animationTypeForReplace: 'push',
            }}
          >
            <Stack.Screen name="CameraView" component={CameraView} />
          </Stack.Navigator>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({

});

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(CameraStackNavigatorAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraStackNavigator);
