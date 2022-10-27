/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import Collapsible from 'react-native-collapsible';

import { Image, SingleTouch } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const ic_expand = require('../../../assets/images/ic_expand/ic_expand.png');
const ic_expanded = require('../../../assets/images/ic_expanded/ic_expanded.png');

class CollapsibleSection extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  renderLeftHeaderContainerIfNeeded = () => {
    const { props, state } = this;

    let children = (
      <View style={styles.image} />
    );

    if (props.source) {
      children = (
        <Image
          style={styles.image}
          source={props.source}
          resizeMode="contain"
        />
      );
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.leftHeaderContainer}>
            {children}
          </View>
        )}
      </Translation>
    );
  };

  renderCenterHeaderContainer = () => {
    const { props, state } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.centerHeaderContainer}>
            <Text style={styles.text}>
              {props.text}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderRightHeaderContainer = () => {
    const { props, state } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.rightHeaderContainer}>
            <Image
              style={styles.image}
              source={state.collapsed ? ic_expand : ic_expanded}
              resizeMode="contain"
            />
          </View>
        )}
      </Translation>
    );
  };

  renderHeaderContainer = () => {
    const { props, state } = this;

    return (
      <Translation>
        {(t) => (
          <View style={[styles.headerContainer, props.headerContainerStyle]}>
            <SingleTouch
              onPress={() => {
                this.setState({
                  collapsed: !state.collapsed,
                })
              }}>
              <View style={styles.button}>
                {this.renderLeftHeaderContainerIfNeeded()}
                {this.renderCenterHeaderContainer()}
                {this.renderRightHeaderContainer()}
              </View>
            </SingleTouch>
          </View>
        )}
      </Translation>
    );
  };

  renderContentContainer = () => {
    const { props, state } = this;

    return (
      <Translation>
        {(t) => (
          <Collapsible
            style={[styles.contentContainer, props.contentContainerStyle]}
            collapsed={state.collapsed}>
            {props.children}
          </Collapsible>
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
            style={[styles.container, props.style]}>
            {this.renderHeaderContainer()}
            {this.renderContentContainer()}
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
  },
  headerContainer: {
    // backgroundColor: '#f0f',
  },
  button: {
    // backgroundColor: '#0f0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
  },
  leftHeaderContainer: {
    // backgroundColor: '#f00',
  },
  centerHeaderContainer: {
    // backgroundColor: '#0f0',
  },
  rightHeaderContainer: {
    // backgroundColor: '#00f',
  },
  text: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  image: {
    // backgroundColor: '#ff0',
    width: 14,
    height: 13,
    marginHorizontal: 4,
  },
  contentContainer: {
    // backgroundColor: '#00f',
  },
});

CollapsibleSection.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  headerContainerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
};

CollapsibleSection.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  headerContainerStyle: undefined,
  contentContainerStyle: undefined,
  hidden: false,
  source: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleSection);
