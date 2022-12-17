/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Image } from '../../components';

import { Dot } from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const ic_calendar = require('../../../assets/images/ic_calendar/ic_calendar.png');

class ProjectEventItem extends Component {
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
          <View
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
          >
            <View
              style={{
                backgroundColor: '#f00',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  backgroundColor: 'cyan',
                  width: 5,
                }}
              />

              <View
                style={{
                  backgroundColor: '#0f0',
                  flex: 1,
                }}
              >
                <View>
                  <Text>{'Project 1'}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View style={styles.scheduleContainer}>
                    <Image
                      style={styles.scheduleImage}
                      source={ic_calendar}
                      resizeMode="center"
                    />
                    <Text style={styles.scheduleText}>
                      {'14 Apr 2022 - 8 June 2022'}
                    </Text>
                  </View>

                  <View style={styles.scheduleContainer}>
                    <Image
                      style={styles.scheduleImage}
                      source={ic_calendar}
                      resizeMode="center"
                    />
                    <Text style={styles.scheduleText}>
                      {'30'}
                    </Text>
                  </View>

                  <View style={styles.scheduleContainer}>
                    <Image
                      style={styles.scheduleImage}
                      source={ic_calendar}
                      resizeMode="center"
                    />
                    <Text style={styles.scheduleText}>
                      {'Film'}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Dot
                  style={{
                    backgroundColor: 'purple',
                    width: 30,
                    height: 30,
                    borderWidth: 5,
                  }}
                />

                <Image
                  style={styles.scheduleImage}
                  source={ic_calendar}
                  resizeMode="center"
                />
              </View>
            </View>
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0',
  },
  scheduleContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleImage: {
    width: 15,
    height: 15,
    marginRight: 4,
  },
  scheduleText: {
    // backgroundColor: '#f00',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
  },
});

ProjectEventItem.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
};

ProjectEventItem.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEventItem);
