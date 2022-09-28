/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { SingleTouch, TextInput } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class SearchBar extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      text: props.text || '',
    };
  }

  onChangeText = (text) => {
    this.setState({text: text});
  };

  renderLeftContainer = () => {
    const { state } = this;

    let children = (
      <View style={styles.leftAccessoryButton}>
        <View style={styles.leftAccessoryButtonImage} />
      </View>
    );

    if (state.text && state.text.length) {
      children = (
        <SingleTouch
          style={styles.leftAccessoryButton}
          onPress={() => this.onChangeText('')}>
          <Image
            style={styles.leftAccessoryButtonImage}
            source={preview}
            resizeMode="contain"
          />
        </SingleTouch>
      );
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.leftContainer}>
            {children}
          </View>
        )}
      </Translation>
    );
  };

  renderCenterContainer = () => {
    const { state } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.centerContainer}>
            <TextInput
              textInputStyle={styles.textInput}
              value={state.text}
              onChangeText={this.onChangeText}
              disableMessageView
            />
          </View>
        )}
      </Translation>
    );
  };

  renderRightContainer = () => {
    const { props, state } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.rightContainer}>
            <SingleTouch
              style={styles.rightAccessoryButton}
              type={'TouchableOpacity'}
              onPress={() => {
                if (props.onPress) {
                  props.onPress(state.text)
                }
              }}>
              <Image
                style={styles.rightAccessoryButtonImage}
                source={preview}
                resizeMode="contain"
              />
            </SingleTouch>
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
            {this.renderLeftContainer()}
            {this.renderCenterContainer()}
            {this.renderRightContainer()}
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.general.black,
    flexDirection: 'row',
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
  },
  leftContainer: {
    // backgroundColor: '#f00',
    marginRight: 8,
  },
  leftAccessoryButton: {
    // backgroundColor: '#ff0',
    justifyContent: 'center',
    paddingLeft: 16,
    borderTopLeftRadius: 21,
    borderBottomLeftRadius: 21,
  },
  leftAccessoryButtonImage: {
    // backgroundColor: '#0f0',
    width: 16,
    height: 15,
  },
  centerContainer: {
    // backgroundColor: '#00f',
    flex: 1,
  },
  textInput: {
    // backgroundColor: '#ff0',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
  },
  rightContainer: {
    // backgroundColor: '#f00',
    marginLeft: 8,
  },
  rightAccessoryButton: {
    // backgroundColor: '#ff0',
    justifyContent: 'center',
    paddingRight: 16,
    borderTopRightRadius: 21,
    borderBottomRightRadius: 21,
  },
  rightAccessoryButtonImage: {
    // backgroundColor: '#0f0',
    width: 30,
    height: 26,
  },
});

SearchBar.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  onPress: PropTypes.func,
};

SearchBar.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  onPress: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
