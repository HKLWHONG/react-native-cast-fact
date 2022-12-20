/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Image, SingleTouch } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

import BottomSheet from '@gorhom/bottom-sheet';

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const preview = require('../../../assets/images/preview/preview.png');

const ic_back = require('../../../assets/images/ic_back/ic_back.png');

class SlideSheet extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      ref: undefined,
    };
  }

  renderLeftContainer = (params) => {
    const { props } = this;
    const { navigation, route, options, back } = params;

    let children = (
      <View style={styles.leftImage} />
    );

    let enabled = navigation.getState().index > 0;

    if (enabled) {
      children = (
        <Image
          style={styles.leftImage}
          source={ic_back}
          resizeMode="center"
        />
      );
    }

    return (
      <View style={[styles.leftContainer, props.leftContainerStyle]}>
        <SingleTouch
          style={styles.left}
          onPress={() => {
            if (!enabled) {
              return;
            }

            navigation.goBack();
          }}
        >
          {children}
        </SingleTouch>
      </View>
    );
  };

  renderCenterContainer = (params) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.centerContainer}>
            <Text style={styles.title}>
              {props.title}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderRightContainer = (params) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.rightContainer}>
            <Image
              style={styles.image}
              source={preview}
              resizeMode="center"
            />
          </View>
        )}
      </Translation>
    );
  };

  renderHeader = (params) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <TouchableWithoutFeedback>
            <View style={styles.handleComponentContainer}>
              {this.renderLeftContainer(params)}
              {this.renderCenterContainer(params)}
              {this.renderRightContainer(params)}
            </View>
          </TouchableWithoutFeedback>
        )}
      </Translation>
    );
  };

  renderHandleComponent = (params) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View />
        )}
      </Translation>
    );
  };

  renderBackgroundComponent = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View />
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    let children = props.children;

    if (!props.customMode) {
      let components = (
        Array(props.components.length)
          .fill()
          .map((_, i) => i)
          .map((i) => {
            let component = props.components[i];

            // console.log('[component.name]', component.name);
            // console.log('[component.object]', component.object);

            return (
              <Stack.Screen
                key={i.toString()}
                name={component.name}
                component={component.object}
              />
            );
          })
      );

      children = (
        <NavigationContainer independent>
          <Stack.Navigator
            screenOptions={{
              headerMode: 'screen',
              header: (params) => {
                return this.renderHeader(params);
              },
              animationEnabled: props.animationEnabled,
            }}
          >
            <Stack.Group>
              {components}
            </Stack.Group>
            {children}
          </Stack.Navigator>
          </NavigationContainer>
      );
    }

    let handleComponent = props.handleComponent;

    if (!handleComponent) {
      handleComponent = this.renderHandleComponent;
    }

    return (
      <Translation>
        {(t) => (
          <BottomSheet
            {...props}
            ref={(ref) => {
              this.state.ref = ref;
            }}
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            // handleStyle={{
            //   backgroundColor: 'red',
            // }}
            // handleIndicatorStyle={{
            //   backgroundColor: 'blue',
            // }}
            handleComponent={this.renderHandleComponent}
            // index={1}
            // detach={true}
            backgroundComponent={this.renderBackgroundComponent}
            snapPoints={props.snapPoints}
            enablePanDownToClose
            onChange={(index) => {
              if (index === 0) {
                if (!props.didMount) {
                  return;
                }

                props.didMount(this.state.ref);
              } else if (index === -1) {
                if (!props.onDismiss) {
                  return;
                }

                props.onDismiss();
              }
            }}
          >
            {children}
          </BottomSheet>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
  },
  handleComponentContainer: {
    backgroundColor: Theme.colors.background.secondary,
    flexDirection: 'row',
    padding: 16,
  },
  leftContainer: {
    // backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftImage: {
    // backgroundColor: '#0ff',
    width: 25,
    height: 25,
  },
  centerContainer: {
    // backgroundColor: '#0f0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 17,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 2.22,
    textTransform: 'uppercase',
  },
  rightContainer: {
    // backgroundColor: '#00f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 14,
    height: 13,
    marginHorizontal: 4,
  },
});

SlideSheet.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  components: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
  ]),
  snapPoints: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  title: PropTypes.string,
  animationEnabled: PropTypes.bool,
  customMode: PropTypes.bool,
  didMount: PropTypes.func,
  onDismiss: PropTypes.func,
};

SlideSheet.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  hidden: false,
  components: [],
  snapPoints: ['100%'],
  title: undefined,
  animationEnabled: false,
  customMode: false,
  didMount: undefined,
  onDismiss: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideSheet);
