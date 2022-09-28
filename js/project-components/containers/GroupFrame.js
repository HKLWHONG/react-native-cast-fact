/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { SingleTouch } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class GroupFrame extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
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

  renderRightContainer = () => {
    const { props } = this;

    let children = (
      <View style={styles.emptyRightAccessoryContainer}>
        <View style={styles.emptyRightAccessoryView} />
      </View>
    );

    if (
      props.rightAccessoryType
      &&
      props.rightAccessoryType.toLowerCase() === 'delete'.toLowerCase()
    ) {
      children = this.renderDeleteButton();
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.rightContainer}>
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
            style={[styles.container, props.style]}>
            <View
              style={styles.contentContainer}>
              {props.children}
            </View>
            {this.renderRightContainer()}
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0f0',
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.colors.background.secondary,
  },
  contentContainer: {
    // backgroundColor: '#ff0',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    padding: 4,
  },
  rightContainer: {
    // backgroundColor: '#0ff',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  emptyRightAccessoryContainer: {
    // backgroundColor: '#f0f',
    flex: 1,
    justifyContent: 'center',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  emptyRightAccessoryView: {
    width: 14,
    height: 13,
  },
  rightAccessoryButton: {
    // backgroundColor: '#00f',
    flex: 1,
    justifyContent: 'center',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  rightAccessoryButtonImage: {
    width: 14,
    height: 13,
  },
});

GroupFrame.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  rightAccessoryType: PropTypes.string,
};

GroupFrame.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  hidden: false,
  rightAccessoryType: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupFrame);
