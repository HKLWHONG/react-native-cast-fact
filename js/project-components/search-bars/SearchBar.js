/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';
import {
  SearchBarAction,
} from '../../redux';

import LinearGradient from 'react-native-linear-gradient';

import { SingleTouch } from '../../components';

import { TextInput } from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const ic_xmark = require('../../../assets/images/ic_xmark/ic_xmark.png');
const ic_search = require('../../../assets/images/ic_search/ic_search.png');

class SearchBar extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderLeftContainer = () => {
    const { props, state } = this;

    let children = (
      <View style={styles.leftAccessoryButton}>
        <View style={styles.leftAccessoryButtonImage} />
      </View>
    );

    if (props.text && props.text.length) {
      children = (
        <SingleTouch
          style={styles.leftAccessoryButton}
          disabled={props.disabled}
          onPress={() => props.setText(undefined)}>
          <Image
            style={styles.leftAccessoryButtonImage}
            source={ic_xmark}
            resizeMode="center"
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
    const { props, state } = this;

    let children = (
      <TextInput
        textInputStyle={styles.textInput}
        value={props.text}
        onChangeText={props.setText}
        disableBottomLine
        disableMessageView
      />
    );

    if (props.disabled) {
      children = undefined;
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.centerContainer}>
            {children}
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
              disabled={props.disabled}
              onPress={() => {
                if (!props.onPress) {
                  return;
                }

                props.onPress(props.text)

                props.setText(undefined);
              }}>
              <Image
                style={styles.rightAccessoryButtonImage}
                source={ic_search}
                resizeMode="center"
              />
            </SingleTouch>
          </View>
        )}
      </Translation>
    );
  };

  renderLinearGradientContainer = (children) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <LinearGradient
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            locations={[0,0.31,0.69,1.0]}
            colors={['#4F2F1A', '#3D290B', '#0E363B', '#024E58']}
            style={[styles.subContainer, styles.linearGradient]}>
            {children}
          </LinearGradient>
        )}
      </Translation>
    );
  };

  renderWithoutLinearGradientContainer = (children) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View
            style={styles.subContainer}>
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

    let children = (
      <View style={styles.contentContainer}>
        {this.renderLeftContainer()}
        {this.renderCenterContainer()}
        {this.renderRightContainer()}
      </View>
    );

    if (props.enableLinearGradientBorder) {
      children = this.renderLinearGradientContainer(children);
    } else {
      children = this.renderWithoutLinearGradientContainer(children);
    }

    return (
      <Translation>
        {(t) => (
          <View
            onLayout={props.onLayout}
            style={[styles.container, props.style]}>
            {children}
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
    height: 42,
    borderRadius: 21,
  },
  subContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    borderRadius: 21,
  },
  linearGradient: {
    padding: 1,
  },
  contentContainer: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.general.black,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 21,
  },
  leftContainer: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
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
    width: 17,
    height: 17,
  },
  centerContainer: {
    // backgroundColor: '#00f',
    justifyContent: 'center',
    flex: 1,
  },
  textInput: {
    // backgroundColor: '#ff0',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    padding: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  rightContainer: {
    // backgroundColor: '#f00',
    marginLeft: 8,
  },
  rightAccessoryButton: {
    // backgroundColor: '#ff0',
    justifyContent: 'center',
    paddingRight: 16,
    paddingVertical: 5,
    borderTopRightRadius: 21,
    borderBottomRightRadius: 21,
  },
  rightAccessoryButtonImage: {
    // backgroundColor: '#0f0',
    width: 32,
    height: 32,
  },
});

SearchBar.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  enableLinearGradientBorder: PropTypes.bool,
};

SearchBar.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  disabled: false,
  onPress: undefined,
  enableLinearGradientBorder: false,
};

function mapStateToProps(state) {
  return {
    text: state.searchBarReducer.text,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setText: (...args) => dispatch(SearchBarAction.setText(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
