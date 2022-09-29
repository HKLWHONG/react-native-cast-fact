/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { SimpleList, SingleTouch, FastImage } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class ProfileList extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderItem = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            key={index}
            style={styles.itemContainer}
            activeOpacity={0.7}
            onPress={() => {
              if (props.onPressItem) {
                props.onPressItem(params);
              }
            }}>
            <View style={styles.itemSubContainer}>
              <FastImage
                style={styles.image}
                defaultSource={preview}
                source={{ uri: item && item.uri }}
                resizeMode="contain"
              />
              <Text
                style={styles.nameLabel}>
                {item && item.name}
                </Text>
              <Text
                style={styles.titleLabel}>
                {item && item.title}
              </Text>
            </View>
          </SingleTouch>
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
          <SimpleList
            {...props}  
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            contentContainerStyle={[
              styles.contentContainer,
              props.contentContainerStyle,
            ]}
            renderItem={this.renderItem}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            horizontal
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
  contentContainer: {
    // backgroundColor: '#ff0',
  },
  itemContainer: {
    // backgroundColor: '#ff0',
    marginHorizontal: 10,
  },
  itemSubContainer: {
    // backgroundColor: '#00f',
    alignItems: 'center',
  },
  image: {
    // backgroundColor: '#0f0',
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  nameLabel: {
    // backgroundColor: '#0f0',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
  },
  titleLabel: {
      // backgroundColor: '#ff0',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    textTransform: 'uppercase',
  },
});

ProfileList.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  onPressItem: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
};

ProfileList.defaultProps = {
  onLayout: undefined,
  style: undefined,
  contentContainerStyle: undefined,
  hidden: false,
  onPressItem: undefined,
  onRefresh: undefined,
  refreshing: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
