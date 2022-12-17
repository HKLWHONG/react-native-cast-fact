/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';
import {
  store,
  MyProjectsSectionAction,
} from '../../redux';

import { SingleTouch } from '../../components';

import { Section } from '../../project-components';

import { Theme } from '../../utils';

// import { } from '../../processors';

// import { } from '../../providers';

import { Translation } from 'react-i18next';

const ic_checklist = require('../../../assets/images/ic_checklist/ic_checklist.png');

class MyProjectsSection extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <Translation>
        {(t) => (
          <Section
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            contentContainerStyle={styles.contentContainer}
            source={ic_checklist}
            label={props.label}
          >
            <View
              style={{ backgroundColor: 'red', height: 300, }}
            />
            <View
              style={{ backgroundColor: 'green', height: 300, }}
            />
          </Section>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff0',
  },
  contentContainer: {
    padding: 0,
  },
});

MyProjectsSection.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  label: PropTypes.string,
};

MyProjectsSection.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  label: undefined,
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(MyProjectsSectionAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProjectsSection);
