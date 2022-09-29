/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import RNFastImage from 'react-native-fast-image'

export default class FastImage extends Component {
  constructor(props: any) {
    super(props);

    let preSize = props.preSize && (props.preSize.width || props.preSize.height);

    this.state = {
      fetched: false,
      width: preSize,
      height: preSize,
    };
  }

  render() {
    const { props, state } = this;

    let style = {
      width: state.width,
      height: state.height,
    };

    if (
      props.preSize && (props.preSize.width || props.preSize.height)
      &&
      props.source && props.source.uri && props.source.uri.length
      &&
      !state.fetched
    ) {
      Image.getSize(props.source.uri, (width, height) => {
        if (!width || !height) {
          return;
        }

        let preSize = props.preSize && (props.preSize.width || props.preSize.height);

        let imageWidth = preSize;
        let imageHeight = preSize * height / width;

        if (props.preSize && props.preSize.height) {
          imageWidth = preSize * width / height;
          imageHeight = preSize;
        }

        this.setState({
          fetched: true,
          width: imageWidth,
          height: imageHeight,
        });
      });
    }

    return (
      <RNFastImage {...props} style={[style, props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ff0',
  },
});

FastImage.propTypes = {
  preSize: PropTypes.object,
};

FastImage.defaultProps = {
  preSize: undefined,
};
