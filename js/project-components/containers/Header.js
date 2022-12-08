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
      <View style={[styles.leftContainer, props.leftContainerStyle]}>
        <SingleTouch
          style={styles.left}
          onPress={() => props.onPressLeft(props.info)}
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

    if (props.hiddenRight || !props.renderRightView) {
      return;
    }

    let children = props.renderRightView();

    return (
      <Translation>
        {(t) => (
          <View style={[styles.rightContainer, props.rightContainerStyle]}>
            {children}
          </View>
        )}
      </Translation>
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
    paddingHorizontal: 16,
  },
  leftContainer: {
    // backgroundColor: '#00f',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 16,
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
    // backgroundColor: '#f00',
    flex: 8,
    justifyContent: 'flex-end',
    paddingBottom: 16,
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
    // backgroundColor: '#0f0',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  right: {},
});

Header.propTypes = {
  info: PropTypes.object,
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  headerStyle: ViewPropTypes.style,
  leftContainerStyle: ViewPropTypes.style,
  rightContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  hiddenLeft: PropTypes.bool,
  hiddenRight: PropTypes.bool,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  title: PropTypes.string,
  renderRightView: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
};

Header.defaultProps = {
  info: undefined,
  onLayout: undefined,
  style: undefined,
  headerStyle: undefined,
  leftContainerStyle: undefined,
  rightContainerStyle: undefined,
  hidden: false,
  hiddenLeft: true,
  hiddenRight: true,
  source: undefined,
  title: undefined,
  renderRightView: undefined,
  onPressLeft: (info) => {
    if (!info) {
      return;
    }

    const { navigation } = info;

    navigation.goBack();
  },
  onPressRight: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
