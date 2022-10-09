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

    this.state = {
      width: undefined,
      height: undefined,
    };
  }

  componentDidMount() {
    const { props, state } = this;

    if (
      props.refSize && (props.refSize.width || props.refSize.height)
      &&
      props.source && props.source.uri && props.source.uri.length
    ) {
      Image.getSize(props.source.uri, (width, height) => {
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
  refSize: PropTypes.object,
};

FastImage.defaultProps = {
  refSize: undefined,
};
