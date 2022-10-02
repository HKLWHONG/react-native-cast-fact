/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import Collapsible from 'react-native-collapsible';

import { SingleTouch } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class CollapsibleSection extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

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
                <Text style={styles.text}>
                  {props.text}
                </Text>
                <Image
                  style={styles.image}
                  source={preview}
                  resizeMode="contain"
                />
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
    marginLeft: 4,
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
};

CollapsibleSection.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  headerContainerStyle: undefined,
  contentContainerStyle: undefined,
  hidden: false,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleSection);
