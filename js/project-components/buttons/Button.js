/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Image, SingleTouch } from '../../components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

class Button extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderImageIfNeeded = () => {
    const { props } = this;

    let style = {};

    if (
      props.type
      &&
      props.type.toLowerCase() === 'small'.toLowerCase()
    ) {
      style = {
        ...style,
        width: 21,
        height: 21,
      };
    } else if (
      props.type
      &&
      props.type.toLowerCase() === 'circle'.toLowerCase()
    ) {
      style = {
        ...style,
        width: 35,
        height: 18,
      };
    }

    let children = (
      <Image
        style={[styles.image, style, props.imageStyle]}
        source={props.source}
        resizeMode={props.resizeMode}
      />
    );

    if (!props.source) {
      if (!props.text) {
        children = (
          <View style={[styles.image, style, props.imageStyle]} />
        );
      } else {
        return;
      }
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.imageContainer}>
            {children}
          </View>
        )}
      </Translation>
    );
  };

  renderLeftAccessoryIfNeeded = () => {
    const { props } = this;

    if (!props.leftAccessorySource) {
      return;
    }

    let style = {};

    return (
      <Translation>
        {(t) => (
          <View style={styles.leftAccessoryImageContainer}>
            <Image
              style={[styles.leftAccessoryImage, props.leftAccessoryImageStyle]}
              source={props.leftAccessorySource}
              resizeMode={props.resizeMode}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderTextIfNeeded = () => {
    const { props } = this;

    if (!props.text || !props.text.length) {
      return;
    }

    let style = {};

    if (!props.source) {
      style = {
        ...style,
        marginLeft: 16,
      };
    }

    if (
      props.type &&
      props.type.toLowerCase() === 'small'.toLowerCase()
    ) {
      style = {
        ...style,
        fontSize: 11,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
      };
    }
    else if (
      props.type &&
      props.type.toLowerCase() === 'circle'.toLowerCase()
    ) {
      style = {
        ...style,
        fontSize: 11,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
      };
    }

    return (
      <Translation>
        {(t) => (
          <Text style={[styles.text, style, props.textStyle]}>
            {props.text}
          </Text>
        )}
      </Translation>
    );
  };

  renderDescriptionIfNeeded = () => {
    const { props } = this;

    if (!props.description || !props.description.length) {
      return;
    }

    let style = {};

    if (!props.source) {
      style = {
        ...style,
        marginLeft: 16,
      };
    }

    if (
      props.type &&
      props.type.toLowerCase() === 'small'.toLowerCase()
    ) {
      style = {
        ...style,
        fontSize: 11,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
      };
    }
    else if (
      props.type &&
      props.type.toLowerCase() === 'circle'.toLowerCase()
    ) {
      style = {
        ...style,
        fontSize: 11,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
      };
    }

    return (
      <Translation>
        {(t) => (
          <Text style={[styles.description, style, props.descriptionStyle]}>
            {props.description}
          </Text>
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    let containerStyle = {};
    let style = {};

    if (
      props.type
      &&
      props.type.toLowerCase() === 'small'.toLowerCase()
    ) {
      style = {
        ...style,
        minHeight: 30,
        paddingHorizontal: 8,
        paddingVertical: 5,
      };
    } else if (
      props.type
      &&
      props.type.toLowerCase() === 'circle'.toLowerCase()
    ) {
      containerStyle = {
        backgroundColor: Theme.colors.general.black,
        borderRadius: 999,
      };

      style = {
        ...style,
        minWidth: 35,
        minHeight: 35,
        paddingHorizontal: 0,
        paddingTop: 9,
        paddingBottom: 8,
      };
    }

    if (
      props.alignment
      &&
      props.alignment.toLowerCase() === 'left'.toLowerCase()
    ) {
      style = {
        ...style,
        justifyContent: 'flex-start',
      };
    } else if (
      props.alignment
      &&
      props.alignment.toLowerCase() === 'right'.toLowerCase()
    ) {
      style = {
        ...style,
        justifyContent: 'flex-end',
      };
    }

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            onLayout={props.onLayout}
            style={[styles.container, containerStyle, props.style]}
            disabled={props.disabled}
            onPress={props.onPress}
          >
            <View style={[styles.button, style, props.buttonStyle]}>
              {this.renderLeftAccessoryIfNeeded()}
              <View style={styles.textContainer}>
                {this.renderImageIfNeeded()}
                {this.renderTextIfNeeded()}
                {this.renderDescriptionIfNeeded()}
              </View>
            </View>
          </SingleTouch>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.background.secondary,
    borderRadius: 8,
  },
  button: {
    // backgroundColor: '#00f',
    minHeight: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textContainer: {
    // backgroundColor: '#f00',
  },
  text: {
    color: Theme.colors.general.white,
    fontSize: 17,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  description: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1,
  },
  imageContainer: {
    // backgroundColor: '#f00',
    alignItems: 'center',
  },
  image: {
    width: 44,
    height: 44,
  },
  leftAccessoryImageContainer: {
    // backgroundColor: '#0f0',
    marginRight: 2,
  },
  leftAccessoryImage: {
    width: 21,
    height: 21,
  },
});

Button.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  buttonStyle: ViewPropTypes.style,
  textStyle: TextPropTypes.style,
  imageStyle: ViewPropTypes.style,
  leftAccessoryImageStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string,
  description: PropTypes.string,
  alignment: PropTypes.string,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  leftAccessorySource: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.number,
  ]),
  resizeMode: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  onLayout: undefined,
  style: undefined,
  buttonStyle: undefined,
  textStyle: undefined,
  imageStyle: undefined,
  leftAccessoryImageStyle: undefined,
  hidden: false,
  type: undefined,
  text: undefined,
  description: undefined,
  alignment: undefined,
  source: undefined,
  leftAccessorySource: undefined,
  resizeMode: "contain",
  disabled: false,
  onPress: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);
