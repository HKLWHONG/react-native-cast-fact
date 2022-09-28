/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { SingleTouch } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class Section extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderLeftContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.leftContainer}>
            <Image
              style={[styles.icon, props.iconStyle]}
              source={props.iconSource}
              resizeMode="contain"
            />
          </View>
        )}
      </Translation>
    );
  }

  renderCenterContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.centerContainer}>
            <Text style={[styles.label, props.labelStyle]}>
              {props.label}
            </Text>
          </View>
        )}
      </Translation>
    );
  }

  renderDeleteButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            style={styles.rightAccessoryButton}>
            <Image
              style={styles.rightAccessoryButtonImage}
              source={preview}
              resizeMode="contain"
            />
          </SingleTouch>
        )}
      </Translation>
    );
  };

  renderRightContainerIfNeeded = () => {
    const { props } = this;

    if (
      !props.rightAccessoryType
      ||
      props.rightAccessoryType.toLowerCase() !== 'delete'.toLowerCase()
    ) {
      return
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.rightContainer}>
            {this.renderDeleteButton()}
          </View>
        )}
      </Translation>
    );
  };

  renderHeaderContainer = () => {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <Translation>
        {(t) => (
          <View style={[styles.headerContainer, props.headerContainerStyle]}>
            {this.renderLeftContainer()}
            {this.renderCenterContainer()}
            {this.renderRightContainerIfNeeded()}
          </View>
        )}
      </Translation>
    );
  }

  renderContentContainer = () => {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <Translation>
        {(t) => (
          <View style={[styles.contentContainer, props.contentContainerStyle]}>
            {props.children}
          </View>
        )}
      </Translation>
    );
  }

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
    // backgroundColor: '#0f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  leftContainer: {
    // backgroundColor: '#f0f',
    marginRight: 8,
    marginTop: 16,
    marginBottom: 4,
  },
  icon: {
    // backgroundColor: '#ff0',
    width: 14,
    height: 13,
  },
  centerContainer: {
    // backgroundColor: '#f0f',
    flex: 1,
    paddingTop: 16,
    paddingBottom: 4,
  },
  label: {
    // backgroundColor: '0f0',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  rightContainer: {
    // backgroundColor: '#0ff',
  },
  rightAccessoryButton: {
    // backgroundColor: '#00f',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 11,
    paddingTop: 16,
    paddingBottom: 4,
  },
  rightAccessoryButtonImage: {
    width: 14,
    height: 13,
  },
  contentContainer: {
    // backgroundColor: '#00f',
    padding: 16,
    paddingTop: 4,
  },
});

Section.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  headerContainerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  iconStyle: ViewPropTypes.style,
  labelStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  iconSource: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  rightAccessoryType: PropTypes.string,
};

Section.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  headerContainerStyle: undefined,
  contentContainerStyle: undefined,
  iconStyle: undefined,
  labelStyle: undefined,
  hidden: false,
  iconSource: undefined,
  label: undefined,
  rightAccessoryType: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Section);
