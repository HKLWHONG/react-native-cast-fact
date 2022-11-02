/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Modal, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { MaterialIndicator } from 'react-native-indicators';

export default class ActivityIndicator extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  renderMessageView = () => {
    const { props } = this;

    if (!props.message) {
      return;
    }

    return <Text style={styles.text}>{props.message}</Text>;
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <Modal transparent animationType="fade">
        <View onLayout={props.onLayout} style={[styles.container, props.style]}>
          <View style={[styles.box, props.boxStyle]}>
            <MaterialIndicator
              style={styles.indicator}
              color={props.color}
              size={30}
              trackWidth={2}
            />
            {this.renderMessageView()}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  indicator: {
    flex: 0,
    padding: 8,
  },
  text: {
    fontFamily: 'CenturyGothic',
    color: '#000000',
    fontSize: 15,
    padding: 8,
  },
});

ActivityIndicator.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  boxStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  message: PropTypes.string,
  color: PropTypes.string,
};

ActivityIndicator.defaultProps = {
  onLayout: undefined,
  style: undefined,
  boxStyle: undefined,
  hidden: false,
  message: undefined,
  color: '#FFFFFF',
};
