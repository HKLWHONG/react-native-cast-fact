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
  ProfileCastSheetEditionViewAction,
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
  CastSheetItem,
  TextInput,
  Tag,
  Button,
} from '../../project-components';

import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class ProfileCastSheetEditionView extends BaseComponent {
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
      Router.push(props, 'ProfileCompletionView');
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

  renderProfileContainer = (params) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.profileContainer}>
            <ProfileInfoSetupSection
              hiddenInfoContainer
              index={2}
              text={t('views.profile_cast_sheet_edition.title')}
            />
            <Text style={styles.subtitle}>
              {t('views.profile_cast_sheet_edition.subtitle')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderCastSheetGenderItem = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <CastSheetItem text={t('Gender')}>
            <Tag
              style={{
                backgroundColor: Theme.colors.background.secondary,
              }}
              type="input"
              // text={t('Male')}
              rightAccessoryType="delete"
              // state={'error'}
              fill
            />
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderCastSheetBirthdayItem = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <CastSheetItem text={t('Birthday')}>
            <Tag
              style={{
                backgroundColor: Theme.colors.background.secondary,
              }}
              type="input"
              // text={t('Male')}
              rightAccessoryType="delete"
              // state={'error'}
              fill
            />
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderCastSheetPlaceOfBirthItem = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <CastSheetItem text={t('Place of Birth')}>
            <Tag
              style={{
                backgroundColor: Theme.colors.background.secondary,
              }}
              type="input"
              // text={t('Male')}
              rightAccessoryType="delete"
              // state={'error'}
              fill
            />
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderCastSheetOccupationItem = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <CastSheetItem text={t('Occupation')}>
            <Tag
              style={{
                backgroundColor: Theme.colors.background.secondary,
              }}
              type="input"
              // text={t('Male')}
              rightAccessoryType="delete"
              // state={'error'}
              fill
            />
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderCastSheetContainer = (params) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.castSheetContainer}>
            {this.renderCastSheetGenderItem()}
            {this.renderCastSheetBirthdayItem()}
            {this.renderCastSheetPlaceOfBirthItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
            {this.renderCastSheetOccupationItem()}
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
            {this.renderCastSheetContainer()}
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

  renderKeyboardAccessoryView = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <KeyboardAccessoryView androidAdjustResize>
            {({ isKeyboardVisible }) => {
              return (
                <>
                  <Text style={{ color: '#f00', padding: 16 }}>Always visible</Text>
                  {!isKeyboardVisible ? (
                    <Text>Hidden when keyboard is visible</Text>
                  ) : null}
                </>
              );
            }}
          </KeyboardAccessoryView>
        )}
      </Translation>
    );
  };

  render() {
    return (
      <Translation>
        {(t) => (
          <Root style={styles.root}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
            {this.renderKeyboardAccessoryView()}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 16,
  },
  listContentContainer: {
    paddingHorizontal: 0,
  },
  profileContainer: {
    // backgroundColor: "#f00",
    alignItems: 'center',
  },
  subtitle: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  castSheetContainer: {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCastSheetEditionView);
