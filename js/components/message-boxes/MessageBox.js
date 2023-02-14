/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Dimensions,
  Modal,
  View,
  Text,
} from 'react-native';

import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';

import { Root, Header, Body, Footer } from '../../components';

export default class MessageBox extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      scrollable: false,
    };
  }

  componentDidMount() {}

  renderHeader = () => {
    const { props } = this;

    let titleStyle = {};

    if (props.titleAlign && props.titleAlign.toLowerCase() === 'left') {
      titleStyle = {
        ...titleStyle,
        alignSelf: 'flex-start',
      };
    } else if (props.titleAlign && props.titleAlign.toLowerCase() === 'right') {
      titleStyle = {
        ...titleStyle,
        alignSelf: 'flex-end',
      };
    } else {
      titleStyle = {
        ...titleStyle,
        alignSelf: 'center',
      };
    }

    return (
      <Header style={styles.header}>
        <Text style={[styles.title, titleStyle, props.titleStyle]}>
          {props.title}
        </Text>
      </Header>
    );
  };

  renderBody = () => {
    const { props, state } = this;

    let bodyStyle = {};

    let backgroundContainerStyle = {};

    if (!state.scrollable) {
      bodyStyle = {
        flex: 0,
      };

      backgroundContainerStyle = {
        flex: 0,
      };
    }

    let contentStyle = {};

    if (props.contentAlign && props.contentAlign.toLowerCase() === 'left') {
      contentStyle = {
        ...contentStyle,
        alignSelf: 'flex-start',
      };
    } else if (
      props.contentAlign &&
      props.contentAlign.toLowerCase() === 'right'
    ) {
      contentStyle = {
        ...contentStyle,
        alignSelf: 'flex-end',
      };
    } else {
      contentStyle = {
        ...contentStyle,
        alignSelf: 'center',
      };
    }

    return (
      <Body
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          const maxHeight = Dimensions.get('window').height / 2;

          if (height > maxHeight) {
            this.setState({
              scrollable: true,
            });
          }
        }}
        style={[styles.body, bodyStyle]}
        backgroundContainerStyle={backgroundContainerStyle}
        scrollable={state.scrollable}
      >
        <Text style={[styles.content, contentStyle, props.contentStyle]}>
          {props.content}
        </Text>
      </Body>
    );
  };

  renderFooter = () => {
    const { props } = this;

    return <Footer style={styles.footer}>{props.children}</Footer>;
  };

  render() {
    const { props, state } = this;

    if (props.hidden) {
      return null;
    }

    let boxStyle = {};

    if (state.scrollable) {
      boxStyle = {
        flex: 1,
      };
    }

    return (
      <Modal transparent animationType="fade">
        <Root
          onLayout={props.onLayout}
          style={[styles.container, props.style]}
          backgroundContainerStyle={styles.backgroundContainerStyle}
        >
          <View style={[styles.box, boxStyle]}>
            {props.title ? this.renderHeader() : undefined}
            {this.renderBody()}
            {props.children ? this.renderFooter() : undefined}
          </View>
        </Root>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
  },
  backgroundContainerStyle: {
    backgroundColor: 'transparent',
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    margin: 32,
  },
  header: {
    // backgroundColor: 'red',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    // backgroundColor: 'yellow',
    color: '#000000',
    fontSize: 24,
    padding: 8,
  },
  body: {
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  content: {
    // backgroundColor: 'cyan',
    color: '#000000',
    fontSize: 17,
    padding: 8,
  },
  footer: {
    // backgroundColor: 'orange',
  },
});

MessageBox.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  titleStyle: TextPropTypes.style,
  contentStyle: TextPropTypes.style,
  hidden: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  titleAlign: PropTypes.string,
  contentAlign: PropTypes.string,
};

MessageBox.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  titleStyle: undefined,
  contentStyle: undefined,
  hidden: false,
  title: undefined,
  content: undefined,
  titleAlign: undefined,
  contentAlign: undefined,
};
