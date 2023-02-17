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

    props.reset();
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
          <CastSheetItem text={t('app.gender')}>
            <Tag
              style={styles.tag}
              type="input"
              text={props.account.info.gender}
              rightAccessoryType="delete"
              fill
              onChangeText={(params) => {
                const { text } = params;

                props.addAccountInfo('gender', text);
              }}
              onPressRightAccessory={() => {
                props.deleteAccountInfo('gender');
              }}
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
          <CastSheetItem text={t('app.birthday')}>
            <Tag
              style={styles.tag}
              type="input"
              text={props.account.info.birthday}
              rightAccessoryType="delete"
              fill
              onChangeText={(params) => {
                const { text } = params;

                props.addAccountInfo('birthday', text);
              }}
              onPressRightAccessory={() => {
                props.deleteAccountInfo('birthday');
              }}
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
          <CastSheetItem text={t('app.place_of_birth')}>
            <Tag
              style={styles.tag}
              type="input"
              text={props.account.info.placeOfBirth}
              rightAccessoryType="delete"
              fill
              onChangeText={(params) => {
                const { text } = params;

                props.addAccountInfo('place_of_birth', text);
              }}
              onPressRightAccessory={() => {
                props.deleteAccountInfo('place_of_birth');
              }}
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
          <CastSheetItem text={t('app.occupation')}>
            <Tag
              style={styles.tag}
              type="input"
              text={props.account.info.occupation}
              rightAccessoryType="delete"
              fill
              onChangeText={(params) => {
                const { text } = params;

                props.addAccountInfo('occupation', text);
              }}
              onPressRightAccessory={() => {
                props.deleteAccountInfo('occupation');
              }}
            />
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderCastSheetNationalityItem = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <CastSheetItem text={t('app.nationality')}>
            <Tag
              style={styles.tag}
              type="input"
              text={props.account.info.nationality}
              rightAccessoryType="delete"
              fill
              onChangeText={(params) => {
                const { text } = params;

                props.addAccountInfo('nationality', text);
              }}
              onPressRightAccessory={() => {
                props.deleteAccountInfo('nationality');
              }}
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
            {this.renderCastSheetNationalityItem()}
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
          {/* this.renderKeyboardAccessoryView() */}
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
    marginVertical: 16,
  },
  castSheetContainer: {
    // backgroundColor: '#0f0',
    marginVertical: 16,
  },
  tag: {
    backgroundColor: Theme.colors.background.secondary,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    account: state.profileCastSheetEditionViewReducer.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(ProfileCastSheetEditionViewAction.reset(...args)),
    addAccountInfo: (...args) => dispatch(ProfileCastSheetEditionViewAction.addAccountInfo(...args)),
    deleteAccountInfo: (...args) => dispatch(ProfileCastSheetEditionViewAction.deleteAccountInfo(...args)),
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCastSheetEditionView);
