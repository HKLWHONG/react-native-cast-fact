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

import { Dot } from '../dots';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class Tag extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderDot = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.dotView}>
            <Dot style={[styles.dot, props.dotStyle]}/>
          </View>
        )}
      </Translation>
    );
  };

  renderLeftContainer = () => {
    const { props } = this;

    let children = (
      <View style={styles.emptyLeftAccessoryContainer} />
    );

    if (
      props.leftAccessoryType
      &&
      props.leftAccessoryType.toLowerCase() === 'dot'.toLowerCase()
    ) {
      children = this.renderDot();
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

  renderImageView = () => {
    const { props } = this;

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

  renderTextView = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Text
            style={styles.text}>
            {props.text}
          </Text>
        )}
      </Translation>
    );
  };

  renderInputView = () => {
    const { props, state } = this;

    return (
      <Translation>
        {(t) => (
          <TextInput
            style={styles.input}
            textInputStyle={styles.text}
            value={props.text}
            disableMessageView
           />
        )}
      </Translation>
    );
  };

  renderCenterContainer = () => {
    const { props } = this;

    let children = this.renderTextView();

    if (
      props.type
      &&
      props.type.toLowerCase() === 'input'.toLowerCase()
    ) {
      children = this.renderInputView();
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
      <View style={styles.emptyRightAccessoryContainer} />
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

    let disabled = false;

    if (
      (
        props.type
        &&
        props.type.toLowerCase() === 'input'.toLowerCase()
      )
      ||
      (
        props.rightAccessoryType
        &&
        props.rightAccessoryType.toLowerCase() === 'delete'.toLowerCase()
      )
    ) {
      disabled = true;
    }

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            disabled={disabled}>
            {this.renderLeftContainer()}
            {this.renderCenterContainer()}
            {this.renderRightContainer()}
          </SingleTouch>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0f0',
    backgroundColor: Theme.colors.background.secondary,
    flexDirection: 'row',
    alignSelf: 'center',
    height: 30,
    borderRadius: 8,
    margin: 4,
  },
  leftContainer: {
    // backgroundColor: '#ff0',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  emptyLeftAccessoryContainer: {
    // backgroundColor: '#f00',
    flex: 1,
    paddingLeft: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  dotView: {
    // backgroundColor: '#f0f',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 6,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  dot: {},
  centerContainer: {
    // backgroundColor: '#0f0',
    paddingVertical: 6,
  },
  input: {
    // backgroundColor: '#0f0',
  },
  text: {
    // backgroundColor: '#0f0',
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    padding: 0,
    margin: 0,
  },
  rightContainer: {
    // backgroundColor: '#00f',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  emptyRightAccessoryContainer: {
    // backgroundColor: '#f00',
    flex: 1,
    paddingRight: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rightAccessoryButton: {
    // backgroundColor: '#ff0',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 6,
    paddingRight: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rightAccessoryButtonImage: {
    // backgroundColor: '#0f0',
    width: 14,
    height: 13,
  },
});

Tag.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  dotStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string,
  leftAccessoryType: PropTypes.string,
  rightAccessoryType: PropTypes.string,
};

Tag.defaultProps = {
  onLayout: undefined,
  style: undefined,
  dotStyle: undefined,
  hidden: false,
  type: undefined,
  text: undefined,
  leftAccessoryType: undefined,
  rightAccessoryType: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
