/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image as RNImage } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

export default class Image extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      fetched: false,
      width: props.preSize && props.preSize.width,
      height: props.preSize && props.preSize.height,
    };
  }

  render() {
    const { props, state } = this;

    let style = {
      width: state.width,
      height: state.height,
    };

    if (
      props.source
      &&
      props.source.uri
      &&
      props.source.uri.length
      &&
      !state.fetched
    ) {
      RNImage.getSize(props.source.uri, (width, height) => {
        let screenWidth = Dimensions.get('window').width;

        let imageWidth = screenWidth;
        let imageHeight = screenWidth * height / width;

        this.setState({
          fetched: true,
          width: imageWidth,
          height: imageHeight,
        });
      });
    }

    return (
      <RNImage {...props} style={[style, props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ff0',
  },
});

Image.propTypes = {
  preSize: PropTypes.object,
};

Image.defaultProps = {
  preSize: undefined,
};
