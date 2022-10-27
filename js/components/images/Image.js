/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image as RNImage } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import FastImage from 'react-native-fast-image';

export default class Image extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    const { props, state } = this;

    if (
      props.refSize && (props.refSize.width || props.refSize.height)
      &&
      props.source && props.source.uri && props.source.uri.length
    ) {
      RNImage.getSize(props.source.uri, (width, height) => {
        if (!width || !height) {
          return;
        }

        let refSize = props.refSize && (props.refSize.width || props.refSize.height);

        let imageWidth = refSize;
        let imageHeight = refSize * height / width;

        if (props.refSize && props.refSize.height) {
          imageWidth = refSize * width / height;
          imageHeight = refSize;
        }

        this.setState({
          width: imageWidth,
          height: imageHeight,
        });
      });
    }
  }

  render() {
    const { props, state } = this;

    let style = {
      width: state.width,
      height: state.height,
    };

    return (
      <FastImage {...props} style={[style, props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ff0',
  },
});

Image.propTypes = {
  refSize: PropTypes.object,
};

Image.defaultProps = {
  refSize: undefined,
};
