/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  View,
} from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { HeaderHeightContext } from '@react-navigation/elements';

export default class Root extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderKeyboardAvoidingViewIfNeeded = (children) => {
    const { props } = this;

    if (props.keyboardAvoiding) {
      if (Platform.OS === 'ios') {
        return (
          <HeaderHeightContext.Consumer>
            {(headerHeight) => (
              <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={headerHeight}
                behavior="padding">
                {this.renderScrollView(children)}
              </KeyboardAvoidingView>
            )}
          </HeaderHeightContext.Consumer>
        );
      }

      return this.renderScrollView(children);
    }

    return (
      <View onLayout={props.onLayout} style={styles.fullscreen}>
        {children}
      </View>
    );
  };

  renderScrollView = (children) => {
    const { props } = this;

    return (
      <ScrollView
        onLayout={props.onLayout}
        contentContainerStyle={styles.contentContainerStyle}
        bounces={false}
      >
        <TouchableWithoutFeedback>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  };

  renderViewWithKeyboardDismissingIfNeeded = (children) => {
    const { props } = this;

    if (props.keyboardDismissing) {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {this.renderSafeAreaViewIfNeeded(children)}
        </TouchableWithoutFeedback>
      );
    }

    return this.renderSafeAreaViewIfNeeded(children);
  };

  renderSafeAreaViewIfNeeded = (children) => {
    const { props } = this;

    if (props.safeArea) {
      return (
        <SafeAreaView style={[styles.container, props.style]}>
          {children}
        </SafeAreaView>
      );
    }

    return <View style={[styles.container, props.style]}>{children}</View>;
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    const children = (
      <ImageBackground
        style={[styles.background, props.backgroundContainerStyle]}
        source={props.source}
        resizeMode={props.resizeMode}
      >
        <StatusBar barStyle="light-content" />
        {this.renderViewWithKeyboardDismissingIfNeeded(props.children)}
      </ImageBackground>
    );

    return (
      <TouchableWithoutFeedback>
        <View style={{ flex: 1}}>
          {this.renderKeyboardAvoidingViewIfNeeded(children)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    // backgroundColor: '#f00',
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});

Root.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  backgroundContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  keyboardAvoiding: PropTypes.bool,
  keyboardDismissing: PropTypes.bool,
  safeArea: PropTypes.bool,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  resizeMode: PropTypes.string,
};

Root.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  backgroundContainerStyle: undefined,
  hidden: false,
  keyboardAvoiding: false,
  keyboardDismissing: false,
  safeArea: true,
  source: undefined,
  resizeMode: undefined,
};
