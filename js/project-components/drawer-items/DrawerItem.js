/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { DrawerItem as CommonDrawerItem } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

class DrawerItem extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <Translation>
        {(t) => (
          <CommonDrawerItem
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            label={props.label}
            focused={props.focused}
            onPress={props.onPress}
          />
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
  },
  label: {
    color: Theme.colors.general.white,
    fontSize: 19,
  },
});

DrawerItem.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  focused: PropTypes.bool,
  onPress: PropTypes.func,
};

DrawerItem.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  label: undefined,
  focused: false,
  onPress: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerItem);
