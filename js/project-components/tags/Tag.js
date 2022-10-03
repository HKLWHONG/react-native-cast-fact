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
const ic_xmark = require('../../../assets/images/ic_xmark/ic_xmark.png');

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

  renderCheck = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.checkView}>
            <Image
              style={[styles.check, props.checkStyle]}
              source={preview}
              resizeMode="contain"
            />
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

    if (props.leftAccessoryType) {
      if (props.leftAccessoryType.toLowerCase() === 'dot'.toLowerCase()) {
        children = this.renderDot();
      } else if (props.leftAccessoryType.toLowerCase() === 'check'.toLowerCase()) {
        children = this.renderCheck();
      }
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

  renderTextContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.textContainer}>
            <Text
              style={styles.text}>
              {props.text}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderInputContainer = () => {
    const { props, state } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              textInputStyle={styles.text}
              value={props.value}
              disableMessageView
             />
             <Text
               style={styles.text}>
               {props.text}
             </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderCenterContainer = () => {
    const { props } = this;

    let children = this.renderTextContainer();

    if (
      props.type
      &&
      props.type.toLowerCase() === 'input'.toLowerCase()
    ) {
      children = this.renderInputContainer();
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
              source={ic_xmark}
              resizeMode="center"
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
            disabled={disabled}
            onPress={() => {
              if (!props.onPress) {
                return;
              }

              props.onPress(props.info)
            }}>
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
  checkView: {
    // backgroundColor: '#f0f',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 6,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  check: {
    width: 11,
    height: 11,
  },
  centerContainer: {
    // backgroundColor: '#0f0',
    paddingVertical: 6,
  },
  inputContainer: {
    // backgroundColor: '#0ff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    // backgroundColor: '#0f0',
  },
  textContainer: {
    // backgroundColor: '#ff0',
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
    width: 17,
    height: 17,
  },
});

Tag.propTypes = {
  info: PropTypes.object,
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  dotStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  text: PropTypes.string,
  leftAccessoryType: PropTypes.string,
  rightAccessoryType: PropTypes.string,
  onPress: PropTypes.func,
};

Tag.defaultProps = {
  info: undefined,
  onLayout: undefined,
  style: undefined,
  dotStyle: undefined,
  hidden: false,
  type: undefined,
  value: undefined,
  text: undefined,
  leftAccessoryType: undefined,
  rightAccessoryType: undefined,
  onPress: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
