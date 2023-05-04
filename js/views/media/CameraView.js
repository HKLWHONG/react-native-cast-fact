/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  View,
  Text,
  Alert,
} from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  CameraViewAction,
  ProfileInfoSetupViewAction,
} from '../../redux';

import {
  Camera,
} from 'react-native-vision-camera';

import { TapGestureHandler, State } from 'react-native-gesture-handler';

import ImagePicker from 'react-native-image-crop-picker';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  SingleTouch,
  Image,
} from '../../components';

import {
  Button,
  Separator,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_flash_auto = require('../../../assets/images/ic_flash_auto/ic_flash_auto.png');
const ic_flash_on = require('../../../assets/images/ic_flash_on/ic_flash_on.png');
const ic_flash_off = require('../../../assets/images/ic_flash_off/ic_flash_off.png');
const ic_camera_switch = require('../../../assets/images/ic_camera_switch/ic_camera_switch.png');

export const IDENTIFIER = 'CameraView';

class CameraView extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();

    const { props } = this;

    this.initialize();
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.clearData();
  }

  initialize = async () => {
    const { props } = this;

    // const cameraPermission = await Camera.getCameraPermissionStatus();
    // const microphonePermission = await Camera.getMicrophonePermissionStatus();

    const cameraPermission = await Camera.requestCameraPermission();
    // let newMicrophonePermission = await Camera.requestMicrophonePermission();;

    console.log('[camera-permission]', cameraPermission);

    // console.log('[newCameraPermission]', newCameraPermission);

    // console.log('[microphonePermission]', microphonePermission);

    if (cameraPermission !== 'authorized') {
      Alert.alert(
        'Camera Permission',
        'Please grant the camera permission.',
        [{
          text: i18n.t('app.ok').toUpperCase(),
          onPress: () => Router.goBack(props),
        }],
      );
    }

    // if (microphonePermission !== 'authorized') {
    //
    // }

    const devices = await Camera.getAvailableCameraDevices();
    // const device = devices.back;

    // console.log('[newCameraPermission]', newCameraPermission);
    // console.log('[newMicrophonePermission]', newMicrophonePermission);
    //
    // console.log('[devices]', devices);

    // const backDevices = devices.filter((device) => {
    //   return (
    //     device.position === 'back'
    //     &&
    //     device.devices.length === 1
    //   );
    // });

    const backDevices = devices.filter((device) => {
      return (
        device.position.toLowerCase() === 'back'.toLowerCase()
        &&
        device.devices.length === 1
        &&
        device.devices[0].toLowerCase() === 'wide-angle-camera'.toLowerCase()
      );
    });

    const backDevice = backDevices.length > 0 ? backDevices[0] : undefined;

    // console.log('[backDevice]', backDevice);

    const frontDevices = devices.filter((device) => {
      return (
        device.position.toLowerCase() === 'front'.toLowerCase()
        &&
        device.devices.length === 1
        &&
        device.devices[0].toLowerCase() === 'wide-angle-camera'.toLowerCase()
      );
    });

    const frontDevice = frontDevices.length > 0 ? frontDevices[0] : undefined;

    // console.log('[frontDevice]', frontDevice);

    const device = frontDevice ? frontDevice : backDevice;

    // console.log('[device]', device);

    // let format = undefined;
    //
    // if (device) {
    //   const filteredFormats = device.formats.filter((format) => {
    //     return format.isHighestPhotoQualitySupported;
    //   });
    //
    //   format = filteredFormats.length > 0 ? filteredFormats[0] : undefined;
    // }

    props.setDevices(devices);
    props.setBackDevice(backDevice);
    props.setFrontDevice(frontDevice);
    props.setDevice(device);
    // props.setFormat(format);
    props.setFlash(undefined);
  };

  clearData = () => {
    const { props } = this;
  };

  renderHeader = () => {
    const { props } = this;

    let source = ic_flash_off;

    if (props.flash === 'on') {
      source = ic_flash_on;
    } else if (props.flash === 'auto') {
      source = ic_flash_auto;
    }

    return (
      <Translation>
        {(t) => (
          <Header style={styles.header}>
            <Button
              style={styles.flashButton}
              type="small"
              source={source}
              resizeMode="center"
              onPress={() => {
                if (!store.getState().cameraViewReducer.flash) {
                  props.setFlash('on');
                } else if (store.getState().cameraViewReducer.flash === 'on') {
                  props.setFlash('auto');
                } else {
                  props.setFlash(undefined);
                }
              }}
            />
          </Header>
        )}
      </Translation>
    );
  };

  renderCameraView = () => {
    const { props } = this;

    let children = (
      <View style={styles.cameraContainer} />
    );

    if (props.device) {
      children = (
        <TapGestureHandler
          onHandlerStateChange={async (event) => {
            // console.log(`[tap-event] (x, y) = (${event.nativeEvent.x}, ${event.nativeEvent.y})`)
            // console.log(`[tap-event] (absoluteX, absoluteY) = (${event.nativeEvent.absoluteX}, ${event.nativeEvent.absoluteY})`)

            if (event.nativeEvent.state === State.ACTIVE) {
              const camera = store.getState().cameraViewReducer.refs['Camera'];

              if (!camera) {
                return;
              }

              if (!props.device) {
                return;
              }

              if (!props.device.supportsFocus) {
                console.error('The current camera focus is not supported.');

                return;
              }

              console.log('[camera-event-focus] starting...');

              await camera.focus({ x: event.nativeEvent.x, y: event.nativeEvent.y })
                .catch((error) => {
                  console.error(error);
                });

              console.log('[camera-event-focus] finished.');
            }
          }}
        >
          <Camera
            ref={(ref) => {
              props.addRef('Camera', ref);
            }}
            style={[styles.cameraContainer, StyleSheet.absoluteFill]}
            device={props.device}
            format={props.format}
            preset="medium"
            zoom={1.3}
            enableZoomGesture
            photo
            isActive
          />
        </TapGestureHandler>
      );
    }

    return (
      <Translation>
        {(t) => (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {children}
          </View>
        )}
      </Translation>
    );
  };

  renderBody = () => {
    const { props, state } = this;

    return (
      <Translation>
        {(t) => (
          <Body style={styles.body}>
            {this.renderCameraView()}
          </Body>
        )}
      </Translation>
    );
  };

  renderToolBarContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.toolBar}>
            <Text style={styles.toolBarText}>
              {t('Photo')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderBottomLeftContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.bottomLeftContainer}>
            <Button
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
              text={t('app.cancel')}
              onPress={() => {
                Router.goBack(props);
              }}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderBottomCenterContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.bottomCenterContainer}>
            <SingleTouch
              onPress={async () => {
                // console.log('[test-camera]', store.getState().cameraViewReducer.refs['Camera'].takePhoto());

                if (!store.getState().cameraViewReducer.refs['Camera'].takePhoto) {
                  return;
                }

                const photo = await store.getState().cameraViewReducer.refs['Camera'].takePhoto({
                  flash: store.getState().cameraViewReducer.flash,
                });

                // console.log('[take-photo]', photo);
                //
                // console.log('[take-photo-width]', photo.width);
                // console.log('[take-photo-height]', photo.height);

                let size = photo.width > photo.height ? photo.height : photo.width;


                const croppedPhoto = await ImagePicker.openCropper({
                  path: 'file://' + photo.path,
                  width: size,
                  height: size,
                })
                  .catch((error) => {
                    console.error(error);
                  });

                console.log('[croppedPhoto]', croppedPhoto);

                if (croppedPhoto && croppedPhoto.path) {
                  props.setProfileInfoSetupViewSource({
                    uri: 'file://' + croppedPhoto.path,
                    photo: croppedPhoto,
                  });
                }

                Router.goBack(props);
              }}
            >
              <View style={styles.takePhotoButtonContainer}>
                <View style={styles.takePhotoButton}>
                </View>
              </View>
            </SingleTouch>
          </View>
        )}
      </Translation>
    );
  };

  renderBottomRightContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.bottomRightContainer}>
            <Button
              style={styles.switchCameraButton}
              type="small"
              source={ic_camera_switch}
              resizeMode="center"
              onPress={() => {
                if (store.getState().cameraViewReducer.frontDevice === props.device) {
                  if (!store.getState().cameraViewReducer.backDevice) {
                    return;
                  }

                  props.setDevice(store.getState().cameraViewReducer.backDevice);
                } else {
                  if (!store.getState().cameraViewReducer.frontDevice) {
                    return;
                  }

                  props.setDevice(store.getState().cameraViewReducer.frontDevice);
                }
              }}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderBottomContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.bottomContainer}>
            {this.renderBottomLeftContainer()}
            {this.renderBottomCenterContainer()}
            {this.renderBottomRightContainer()}
          </View>
        )}
      </Translation>
    );
  };

  renderFooter = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Footer style={styles.footer}>
            {this.renderToolBarContainer()}
            {this.renderBottomContainer()}
          </Footer>
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Root style={styles.root}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          </Root>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.colors.background.primary,
  },
  header: {
    // backgroundColor: "#f00",
    aspectRatio: 3.52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
  },
  flashButton: {
    // backgroundColor: "#0ff",
    backgroundColor: Theme.colors.background.primary,
    aspectRatio: 1,
    borderRadius: 999,
  },
  body: {
    // backgroundColor: '#0f0',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.borders.gray,
  },
  cameraContainer: {
    // backgroundColor: '#f00',
  },
  footer: {
    // backgroundColor: '#f00',
    // paddingBottom: 32,
  },
  toolBar: {
    // backgroundColor: "#f00",
    // backgroundColor: Theme.colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  toolBarText: {
    color: Theme.colors.text.camera_tool_bar,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  bottomContainer: {
    // backgroundColor: '#f0f',
    flexDirection: 'row',
    paddingBottom: 32,
  },
  bottomLeftContainer: {
    // backgroundColor: '#f00',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cancelButton: {
    backgroundColor: Theme.colors.background.primary,
  },
  cancelButtonText: {
    fontSize: 15,
  },
  bottomCenterContainer: {
    // backgroundColor: '#0f0',
  },
  takePhotoButtonContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 5,
    borderColor: Theme.colors.general.white,
  },
  takePhotoButton: {
    backgroundColor: Theme.colors.general.white,
    width: 60,
    height: 60,
    borderRadius: 999,
  },
  bottomRightContainer: {
    // backgroundColor: '#00f',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  switchCameraButton: {
    backgroundColor: Theme.colors.background.secondary,
    aspectRatio: 1,
    borderRadius: 999,
    padding: 8,
    marginHorizontal: 16,
  },
});

function mapStateToProps(state) {
  return {
    device: state.cameraViewReducer.device,
    format: state.cameraViewReducer.format,
    flash: state.cameraViewReducer.flash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addRef: (...args) => dispatch(CameraViewAction.addRef(...args)),
    setDevices: (...args) => dispatch(CameraViewAction.setDevices(...args)),
    setBackDevice: (...args) => dispatch(CameraViewAction.setBackDevice(...args)),
    setFrontDevice: (...args) => dispatch(CameraViewAction.setFrontDevice(...args)),
    setDevice: (...args) => dispatch(CameraViewAction.setDevice(...args)),
    setFormat: (...args) => dispatch(CameraViewAction.setFormat(...args)),
    setFlash: (...args) => dispatch(CameraViewAction.setFlash(...args)),
    setProfileInfoSetupViewSource: (...args) => dispatch(ProfileInfoSetupViewAction.setSource(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);
