/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Dimensions,
  Text,
  Animated,
  Easing,
} from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import {
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';

import { Root, Header, Body, Footer } from '../containers';

let timeout;

export default class PullDownMessageBox extends Component {
  constructor(props: any) {
    super(props);

    this.initState();
  }

  initState = (isRender) => {
    const state = {
      isTriggered: false,
      height: 0,
      safeAreaInsets: undefined,
      animatedTop: new Animated.Value(-Dimensions.get('window').height),
    };

    if (isRender) {
      this.setState(state);
    } else {
      this.state = state;
    }
  };

  resetTimeout = () => {
    clearTimeout(timeout);
    timeout = undefined;
  };

  show = () => {
    const { props, state } = this;

    if (state.height === 0) {
      return;
    }

    this.resetTimeout();

    if (props.willShow) {
      props.willShow();
    }

    Animated.timing(this.state.animatedTop, {
      duration: props.animationDuration,
      toValue: StyleSheet.flatten(styles).box.marginTop,
      easing: Easing.easeInEaseOut,
      useNativeDriver: false,
    }).start(() => {
      if (props.didShow) {
        props.didShow();
      }

      timeout = setTimeout(() => {
        this.resetTimeout();

        this.hide();
      }, props.duration);
    });
  };

  hide = () => {
    const { props, state } = this;

    if (!state.safeAreaInsets) {
      return;
    }

    if (props.willHide) {
      props.willHide();
    }

    Animated.timing(this.state.animatedTop, {
      duration: props.animationDuration,
      toValue: -(
        state.height +
        state.safeAreaInsets.top +
        StyleSheet.flatten(styles).box.marginTop
      ),
      easing: Easing.easeInEaseOut,
      useNativeDriver: false,
    }).start(() => {
      if (props.didHide) {
        props.didHide();
      }
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { props } = this;

    if (
      props.title !== nextProps.title ||
      props.content !== nextProps.content
    ) {
      this.initState(true);

      return false;
    }

    return true;
  }

  renderHeader = () => {
    const { props } = this;

    return (
      <Header style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
      </Header>
    );
  };

  renderBody = () => {
    const { props } = this;

    return (
      <Body
        style={styles.body}
        backgroundContainerStyle={styles.bodyBackgroundContainerStyle}
        scrollable={false}>
        <Text style={styles.content} numberOfLines={0}>
          {props.content}
        </Text>
      </Body>
    );
  };

  renderFooter = () => {
    const { props } = this;

    return <Footer style={styles.footer}>{props.children}</Footer>;
  };

  render() {
    const { props, state } = this;

    if (props.hidden) {
      return null;
    }

    let safeAreaProviderStyle = {};

    let boxStyle = {};

    if (state.safeAreaInsets && state.height > 0) {
      safeAreaProviderStyle = {
        ...safeAreaProviderStyle,
        height:
          state.safeAreaInsets.top +
          state.height +
          StyleSheet.flatten(styles).box.marginTop,
      };
    }

    return (
      <SafeAreaProvider
        style={[styles.safeAreaProvider, safeAreaProviderStyle]}>
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <Root
              onLayout={props.onLayout}
              style={[styles.container, props.style]}
              backgroundContainerStyle={styles.rootBackgroundContainerStyle}>
              <Animated.View
                onLayout={(e) => {
                  const height = e.nativeEvent.layout.height;

                  const safeAreaInsets = insets;

                  const animatedTop = new Animated.Value(
                    -(
                      height +
                      insets.top +
                      StyleSheet.flatten(styles).box.marginTop
                    ),
                  );

                  if (
                    state.height === height &&
                    (state.safeAreaInsets && state.safeAreaInsets.top) ===
                      (safeAreaInsets && safeAreaInsets.top)
                  ) {
                    return;
                  }

                  if (!state.isTriggered) {
                    this.setState(
                      {
                        isTriggered: true,
                        height: height,
                        safeAreaInsets: safeAreaInsets,
                        animatedTop: animatedTop,
                      },
                      () => {
                        if (props.title || props.content) {
                          this.show();
                        } else {
                          this.hide();
                        }
                      },
                    );
                  }
                }}
                style={[
                  styles.box,
                  boxStyle,
                  { marginTop: state.animatedTop },
                ]}>
                {props.title ? this.renderHeader() : undefined}
                {this.renderBody()}
                {props.children ? this.renderFooter() : undefined}
              </Animated.View>
            </Root>
          )}
        </SafeAreaInsetsContext.Consumer>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaProvider: {
    // backgroundColor: 'red',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    // backgroundColor: 'transparent',
    flex: 1,
  },
  rootBackgroundContainerStyle: {
    backgroundColor: 'transparent',
  },
  box: {
    backgroundColor: '#333333',
    padding: 8,
    marginTop: 16,
  },
  header: {
    // backgroundColor: '#0ff',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    // backgroundColor: '#f00',
    fontFamily: 'CenturyGothic',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    // backgroundColor: '#0f0',
    flex: 0,
    justifyContent: 'center',
    padding: 8,
  },
  bodyBackgroundContainerStyle: {
    flex: 0,
  },
  content: {
    // backgroundColor: '#ff0',
    fontFamily: 'CenturyGothic',
    color: '#FFFFFF',
    fontSize: 15,
  },
  footer: {
    // backgroundColor: '#00f',
    alignItems: 'center',
    padding: 8,
  },
});

PullDownMessageBox.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  duration: PropTypes.number,
  animationDuration: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  willShow: PropTypes.func,
  didShow: PropTypes.func,
  willHide: PropTypes.func,
  didHide: PropTypes.func,
};

PullDownMessageBox.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  hidden: false,
  duration: 3000,
  animationDuration: 500,
  title: undefined,
  content: undefined,
  willShow: undefined,
  didShow: undefined,
  willHide: undefined,
  didHide: undefined,
};
