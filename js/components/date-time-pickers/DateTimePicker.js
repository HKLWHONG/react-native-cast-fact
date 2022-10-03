/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Modal,
  View,
  Text,
} from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import RNDateTimePicker from '@react-native-community/datetimepicker';

import { SingleTouch } from '../touches';

export default class DateTimePicker extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      value: undefined,
    };
  }

  componentDidMount() {}

  renderBackgroundView = () => {
    if (Platform.OS === 'ios') {
      return <View style={styles.background} />;
    }
  };

  renderButtonContainer = () => {
    const { props, state } = this;

    if (Platform.OS === 'ios') {
      return (
        <View>
          <View style={styles.buttonContainer}>
            <SingleTouch
              style={styles.button}
              onPress={() => {
                if (!props.onPress) {
                  return;
                }

                props.onPress(state.value);
              }}>
              <Text style={styles.buttonText}>{props.buttonText}</Text>
            </SingleTouch>
          </View>
          <View style={styles.line} />
        </View>
      );
    }
  };

  renderContainer = () => {
    const { props, state } = this;

    let containerStyle = {};

    if (Platform.OS === 'ios' && Platform.Version.startsWith('14')) {
      containerStyle = {
        ...containerStyle,
        flex: 1,
      };
    }

    return (
      <View
        onLayout={props.onLayout}
        style={[styles.container, containerStyle, props.style]}>
        {this.renderButtonContainer()}
        <RNDateTimePicker
          testID="dateTimePicker"
          value={state.value || props.value}
          minimumDate={props.minimumDate}
          maximumDate={props.maximumDate}
          mode={'date'}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, value) => {
            if (Platform.OS === 'ios') {
              this.setState({
                value: value,
              });
            } else {
              if (!props.onPress) {
                return;
              }

              props.onPress(value);
            }
          }}
        />
      </View>
    );
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    if (Platform.OS === 'ios') {
      return (
        <Modal transparent animationType="fade">
          {this.renderBackgroundView()}
          {this.renderContainer()}
        </Modal>
      );
    } else {
      return this.renderContainer();
    }
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
  },
  container: {
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    backgroundColor: '#757575',
    height: StyleSheet.hairlineWidth,
  },
});

DateTimePicker.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  buttonText: PropTypes.string,
  value: PropTypes.object,
  minimumDate: PropTypes.object,
  maximumDate: PropTypes.object,
  onPress: PropTypes.func,
};

DateTimePicker.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  buttonText: 'Done',
  value: undefined,
  minimumDate: undefined,
  maximumDate: undefined,
  onPress: undefined,
};
