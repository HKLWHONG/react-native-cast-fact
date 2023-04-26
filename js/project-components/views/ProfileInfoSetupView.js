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

import { UserProcessor, ProfileProcessor } from '../../processors';

import {
  Constants,
} from '../../constants';

import { Translation } from 'react-i18next';

const ic_profile_placeholder = require('../../../assets/images/ic_profile_placeholder/ic_profile_placeholder.png');

class ProfileInfoSetupView extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderViewIndicator = () => {
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
  };

  renderInfoContainer = () => {
    const { props } = this;

    if (props.hiddenInfoContainer) {
      return;
    }

    let source = ic_profile_placeholder;
    let name = undefined;
    let occupation = undefined;

    let nameTextContainerStyle = {};
    let occupationTextContainerStyle = {};

    if (props.photo && props.photo.path) {
      source = { uri: 'file://' + (props.photo && props.photo.path) };
    }

    const firstnameEn = props.account.info.firstnameEn || '';
    const lastnameEn = props.account.info.lastnameEn || '';
    const firstnameZh = props.account.info.firstnameZh || '';
    const lastnameZh = props.account.info.lastnameZh || '';
    const nickname = props.account.info.nickname || '';

    if (props.account.info.displayFormat === 0) {
      name = `${nickname} ${lastnameEn} ${lastnameZh}${firstnameZh}`.trim();
    } else if (props.account.info.displayFormat === 1) {
      name = `${firstnameEn} ${lastnameEn} ${lastnameZh}${firstnameZh}`.trim();
    } else if (props.account.info.displayFormat === 2) {
      name = `${nickname} ${lastnameZh}${firstnameZh}`.trim();
    } else if (props.account.info.displayFormat === 3) {
      name = `${nickname}`.trim();
    }

    if (name && name.length === 0) {
      name = undefined;
    }

    occupation = ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_OCCUPATIONS);

    if (occupation && occupation.length > 0) {
      occupation = occupation[0].text;
    } else {
      occupation = undefined;
    }

    if (name) {
      nameTextContainerStyle = {
        ...nameTextContainerStyle,
        backgroundColor: Theme.colors.general.transparent,
      }
    }

    if (occupation) {
      occupationTextContainerStyle = {
        ...occupationTextContainerStyle,
        backgroundColor: Theme.colors.general.transparent,
      }
    }

    console.log('[profile-info-setup-section-name]', name);
    console.log('[profile-info-setup-section-occupation]', occupation);

    return (
      <Translation>
        {(t) => (
          <View style={styles.infoContainer}>
            <Image
              style={styles.photo}
              source={source}
              resizeMode="contain"
            />
            <View style={[styles.textContainer, { minWidth: 150 }, nameTextContainerStyle]}>
              <Text style={styles.name}>
                {` ${name || ' '} `}
              </Text>
            </View>
            <View style={[styles.textContainer, { minWidth: 200 }, occupationTextContainerStyle]}>
              <Text style={styles.occupation}>
                {` ${occupation || ' '} `}
              </Text>
            </View>
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

    // console.log('[props.account.info.displayFormat]', props.account.info.displayFormat);
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
  name: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  occupation: {
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    textTransform: 'uppercase',
  },
});

ProfileInfoSetupView.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
  hiddenViewIndicator: PropTypes.bool,
  hiddenInfoContainer: PropTypes.bool,
  index: PropTypes.number,
};

ProfileInfoSetupView.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
  hiddenViewIndicator: false,
  hiddenInfoContainer: false,
  index: 0,
};

function mapStateToProps(state) {
  return {
    numberOfIndicators: state.profileInfoSetupViewReducer.numberOfIndicators,
    photo: state.profileInfoSetupViewReducer.photo,
    account: state.profileInfoSetupViewReducer.account,
    profileCastSheetEditionViewAccount: state.profileCastSheetEditionViewReducer.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoSetupView);
