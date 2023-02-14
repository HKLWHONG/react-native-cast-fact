/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import {
  ProfileNameDisplaySelectionViewAction,
  SignUpStackNavigatorAction,
  ProfileInfoSetupSectionAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  SingleTouch,
  Image,
} from '../../components';

import {
  ProfileInfoSetupSection,
  TextInput,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class ProfileNameDisplaySelectionView extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();

    const { props } = this;

    this.initialize();
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.clearData();
  }

  initialize = () => {
    const { props } = this;

    props.addSignUpStackNavigatorOnRightButtonPress(this.constructor.name, () => {
      Router.push(props, 'ProfileCastSheetEditionView');
    });
  };

  clearData = () => {
    const { props } = this;
  };

  renderHeader = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Header style={styles.header} />
        )}
      </Translation>
    );
  };

  renderProfileContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <ProfileInfoSetupSection
            index={1}
            text={t('views.profile_name_display_selection.title')}
          />
        )}
      </Translation>
    );
  };

  renderOptionsContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.optionsContainer}>
          </View>
        )}
      </Translation>
    );
  };

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body style={styles.body}>
            {this.renderProfileContainer()}
            {this.renderOptionsContainer()}
          </Body>
        )}
      </Translation>
    );
  };

  renderFooter = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Footer style={styles.footer} />
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Root
            style={styles.root}
            safeArea={false}
            resizeMode="stretch"
            keyboardDismissing
          >
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          </Root>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.colors.background.primary,
  },
  header: {
    // backgroundColor: "#f00",
  },
  body: {
    // backgroundColor: '#0f0',
    // justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 16,
  },
  optionsContainer: {
    // backgroundColor: '#0f0',
    marginVertical: 32,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    profileInfoSetupSectionAccount: state.profileInfoSetupSectionReducer.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNameDisplaySelectionView);
