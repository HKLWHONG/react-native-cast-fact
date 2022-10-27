/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Header as CommonHeader, Image, SingleTouch } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const ic_back = require('../../../assets/images/ic_back/ic_back.png');

class Header extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderLeftContainerIfNeeded = () => {
    const { props } = this;

    if (props.hiddenLeft) {
      return;
    }

    return (
      <View style={styles.leftContainer}>
        <SingleTouch
          style={styles.left}
          onPress={() => props.onPressLeft(props.navigation)}
        >
          <Image
            style={styles.leftImage}
            source={ic_back}
            resizeMode="center"
          />
        </SingleTouch>
      </View>
    );
  };

  renderCenterContainer = () => {
    const { props } = this;

    let centerContainerStyle = {};

    if (!props.hiddenLeft) {
      centerContainerStyle = {
        ...centerContainerStyle,
        alignItems: 'center',
      }
    }

    return (
      <View style={[styles.centerContainer, centerContainerStyle]}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    );
  };

  renderRightContainerIfNeeded = () => {
    const { props } = this;

    return (
      <View
       style={styles.rightContainer}
       hidden={props.hiddenRight}
      />
    );
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <Translation>
        {(t) => (
          <View
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
          >
            <CommonHeader
              style={[
                styles.headerContainer,
                props.headerStyle,
              ]}
              source={props.source}
            >
              {this.renderLeftContainerIfNeeded()}
              {this.renderCenterContainer()}
              {this.renderRightContainerIfNeeded()}
            </CommonHeader>
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.secondary,
  },
  headerContainer: {
    // backgroundColor: '#0f0',
    aspectRatio: 3.52,
    flexDirection: 'row',
    padding: 16,
  },
  leftContainer: {
    // backgroundColor: '#00f',
    flex: 1,
    justifyContent: 'flex-end',
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
    flex: 8,
    justifyContent: 'flex-end',
  },
  title: {
    // backgroundColor: '#f00',
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  right: {},
});

Header.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  headerStyle: ViewPropTypes.style,
  barStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  hiddenLeft: PropTypes.bool,
  hiddenRight: PropTypes.bool,
  navigation: PropTypes.object,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  title: PropTypes.string,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
};

Header.defaultProps = {
  onLayout: undefined,
  style: undefined,
  headerStyle: undefined,
  barStyle: undefined,
  hidden: false,
  hiddenLeft: true,
  hiddenRight: true,
  navigation: undefined,
  source: undefined,
  title: undefined,
  onPressLeft: (navigation) => navigation.goBack(),
  onPressRight: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
