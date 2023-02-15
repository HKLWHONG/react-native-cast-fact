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
  Image,
} from '../../components';

import {
  ViewIndicator,
} from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

class ProfileInfoSetupSection extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderViewIndicator() {
    const { props } = this;

    if (props.hiddenViewIndicator) {
      return;
    }

    return (
      <Translation>
        {(t) => (
          <ViewIndicator
            hidden={props.hiddenViewIndicator}
            index={props.index}
            numberOfIndicators={props.numberOfIndicators}
            text={props.text}
          />
        )}
      </Translation>
    );
  }

  renderInfoContainer() {
    const { props } = this;

    if (props.hiddenInfoContainer) {
      return;
    }

    let name = undefined;

    const firstnameEn = props.account.info.firstnameEn || '';
    const lastnameEn = props.account.info.lastnameEn || '';
    const firstnameZh = props.account.info.firstnameZh || '';
    const lastnameZh = props.account.info.lastnameZh || '';
    const nickname = props.account.info.nickname || '';

    if (props.displayFormat === 0) {
      name = `${nickname} ${lastnameEn} ${lastnameZh}${firstnameZh}`;
    } else if (props.displayFormat === 1) {
      name = `${firstnameEn} ${lastnameEn} ${lastnameZh}${firstnameZh}`;
    } else if (props.displayFormat === 2) {
      name = `${nickname} ${lastnameZh}${firstnameZh}`;
    } else if (props.displayFormat === 3) {
      name = `${nickname}`;
    }

    let nameTextContainerStyle = {};

    if (name) {
      nameTextContainerStyle = {
        ...nameTextContainerStyle,
        backgroundColor: Theme.colors.general.transparent,
      }
    }

    let titleTextContainerStyle = {};

    if (props.title) {
      titleTextContainerStyle = {
        ...titleTextContainerStyle,
        backgroundColor: Theme.colors.general.transparent,
      }
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.infoContainer}>
            <Image
              style={styles.photo}
              source={{ uri: 'file://' + (props.photo && props.photo.path) }}
              resizeMode="contain"
            />
            <View style={[styles.textContainer, { minWidth: 150 }, nameTextContainerStyle]}>
              <Text style={styles.text}>
                {` ${name || ' '} `}
              </Text>
            </View>
            <View style={[styles.textContainer, { minWidth: 200 }, titleTextContainerStyle]}>
              <Text style={styles.text}>
                {` ${props.title || ' '} `}
              </Text>
            </View>
          </View>
        )}
      </Translation>
    );
  }

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    // console.log('[props.displayFormat]', props.displayFormat);
    // console.log('[props.account.info]', props.account.info);

    return (
      <Translation>
        {(t) => (
          <View
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
          >
            {this.renderViewIndicator()}
            {this.renderInfoContainer()}
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0f0',
  },
  infoContainer: {
    // backgroundColor: '#0f0',
    alignItems: 'center',
  },
  photo: {
    backgroundColor: Theme.colors.background.gray,
    width: 100,
    height: 100,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.borders.gray,
    margin: 16,
  },
  textContainer: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.background.gray,
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 4,
  },
  text: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

ProfileInfoSetupSection.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  hiddenViewIndicator: PropTypes.bool,
  hiddenInfoContainer: PropTypes.bool,
  index: PropTypes.number,
  text: PropTypes.string,
  title: PropTypes.string,
};

ProfileInfoSetupSection.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  hiddenViewIndicator: false,
  hiddenInfoContainer: false,
  index: 0,
  text: undefined,
  title: undefined,
};

function mapStateToProps(state) {
  return {
    numberOfIndicators: state.profileInfoSetupSectionReducer.numberOfIndicators,
    photo: state.profileInfoSetupSectionReducer.photo,
    account: state.profileInfoSetupSectionReducer.account,
    displayFormat: state.profileInfoSetupSectionReducer.displayFormat,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoSetupSection);
