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
  ProfilePictureSelectionViewAction,
} from '../../redux';

import {
  Camera,
} from 'react-native-vision-camera';

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

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

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

    // ImagePicker.clean().then(() => {
    //   console.log('removed all tmp images from tmp directory');
    // })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // const cameraPermission = await Camera.getCameraPermissionStatus();
    // const microphonePermission = await Camera.getMicrophonePermissionStatus();

    const cameraPermission = await Camera.requestCameraPermission();
    // let newMicrophonePermission = await Camera.requestMicrophonePermission();;

    console.log('[cameraPermission]', cameraPermission);

    // console.log('[newCameraPermission]', newCameraPermission);

    // console.log('[microphonePermission]', microphonePermission);

    if (cameraPermission !== 'authorized') {
      Alert.alert(
        'Camera Permission',
        'Please grant the camera permission.',
        [{
          text: 'OK',
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

    const filteredDevices = devices.filter((device) => {
      return (
        device.position === 'front'
        &&
        device.devices.length === 1
      );
    });

    const device = filteredDevices.length > 0 ? filteredDevices[0] : undefined;

    console.log('[device]', device);

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
    props.setDevice(device);
    // props.setFormat(format);
  };

  clearData = () => {
    const { props } = this;
  };

  renderHeader = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Header style={styles.header} />
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
        <Camera
          ref={(ref) => {
            props.addRef('Camera', ref);
          }}
          style={styles.cameraContainer}
          device={props.device}
          format={props.format}
          preset="medium"
          zoom={1.3}
          enableZoomGesture
          photo
          isActive
        />
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

  renderToolsBarView = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.toolsBar} />
        )}
      </Translation>
    );
  };

  renderBottomView = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.bottomContainer}>
            <SingleTouch
              onPress={async () => {
                // console.log('[test-camera]', store.getState().cameraViewReducer.refs['Camera'].takePhoto());

                if (!store.getState().cameraViewReducer.refs['Camera'].takePhoto) {
                  return;
                }

                const photo = await store.getState().cameraViewReducer.refs['Camera'].takePhoto();

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

                if (croppedPhoto) {
                  props.setProfilePictureSelectionViewPhoto(croppedPhoto);

                  Router.goBack(props);
                }
              }}
            >
              <View style={styles.button} />
            </SingleTouch>
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
            {this.renderToolsBarView()}
            {this.renderBottomView()}
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
  },
  body: {
    // backgroundColor: '#0f0',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  cameraContainer: {
    // backgroundColor: '#f00',
    // flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    borderRadius:  Dimensions.get('window').width / 2.0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.borders.gray,
  },
  footer: {
    // backgroundColor: '#f00',
    // paddingBottom: 32,
  },
  toolsBar: {
    backgroundColor: Theme.colors.background.secondary,
    height: 60,
  },
  bottomContainer: {
    // backgroundColor: '#f0f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Theme.colors.general.white,
  },
});

function mapStateToProps(state) {
  return {
    devices: state.cameraViewReducer.devices,
    device: state.cameraViewReducer.device,
    format: state.cameraViewReducer.format,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addRef: (...args) => dispatch(CameraViewAction.addRef(...args)),
    setDevices: (...args) => dispatch(CameraViewAction.setDevices(...args)),
    setDevice: (...args) => dispatch(CameraViewAction.setDevice(...args)),
    setFormat: (...args) => dispatch(CameraViewAction.setFormat(...args)),
    setProfilePictureSelectionViewPhoto: (...args) => dispatch(ProfilePictureSelectionViewAction.setPhoto(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);
