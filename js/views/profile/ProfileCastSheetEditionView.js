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
  store,
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

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

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

    const key = 'gender';

    const info = props.account.info[key];

    let text = undefined;
    let visible = undefined;

    if (info) {
      text = info.text;
      visible = info.visible;
    }

    return (
      <Translation>
        {(t) => (
          <CastSheetItem
            text={t('app.gender')}
            visible={visible}
            onPressVisibilityButton={(event) => {
              const { visible } = event;

              props.addAccountInfo(key, {
                ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                visible: !visible,
              });
            }}
          >
            <Tag
              style={styles.tag}
              type="input"
              text={text}
              rightAccessoryType="delete"
              fill
              onChangeText={(params) => {
                const { text } = params;

                props.addAccountInfo(key, {
                  ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                  text: text,
                });
              }}
              onPressRightAccessory={() => {
                props.deleteAccountInfo(key);
              }}
            />
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderCastSheetBirthdayItem = () => {
    const { props } = this;

    const key = 'birthday';

    const info = props.account.info[key];

    let text = undefined;
    let visible = undefined;

    if (info) {
      text = info.text;
      visible = info.visible;
    }

    return (
      <Translation>
        {(t) => (
          <CastSheetItem
            text={t('app.birthday')}
            visible={visible}
            onPressVisibilityButton={(event) => {
              const { visible } = event;

              props.addAccountInfo(key, {
                ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                visible: !visible,
              });
            }}
          >
            <Tag
              style={styles.tag}
              type="input"
              text={text}
              rightAccessoryType="delete"
              fill
              onChangeText={(params) => {
                const { text } = params;

                props.addAccountInfo(key, {
                  ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                  text: text,
                });
              }}
              onPressRightAccessory={() => {
                props.deleteAccountInfo(key);
              }}
            />
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderCastSheetPlaceOfBirthItem = () => {
    const { props } = this;

    const key = 'place_of_birth';

    const info = props.account.info[key];

    let text = undefined;
    let visible = undefined;

    if (info) {
      text = info.text;
      visible = info.visible;
    }

    return (
      <Translation>
        {(t) => (
          <CastSheetItem
            text={t('app.place_of_birth')}
            visible={visible}
            onPressVisibilityButton={(event) => {
              const { visible } = event;

              props.addAccountInfo(key, {
                ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                visible: !visible,
              });
            }}
          >
            <Tag
              style={styles.tag}
              type="input"
              text={text}
              rightAccessoryType="delete"
              fill
              onChangeText={(params) => {
                const { text } = params;

                props.addAccountInfo(key, {
                  ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                  visible: !visible,
                });
              }}
              onPressRightAccessory={() => {
                props.deleteAccountInfo(key);
              }}
            />
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderCastSheetOccupationItem = () => {
    const { props } = this;

    const key = 'occupation';

    const info = props.account.info[key];

    let text = undefined;
    let visible = undefined;

    if (info) {
      text = info.text;
      visible = info.visible;
    }

    return (
      <Translation>
        {(t) => (
          <CastSheetItem
            text={t('app.occupation')}
            visible={visible}
            onPressVisibilityButton={(event) => {
              const { visible } = event;

              props.addAccountInfo(key, {
                ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                visible: !visible,
              });
            }}
          >
            <Tag
              style={styles.tag}
              type="input"
              text={text}
              rightAccessoryType="delete"
              fill
              onChangeText={(params) => {
                const { text } = params;

                props.addAccountInfo(key, {
                  ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                  visible: !visible,
                });
              }}
              onPressRightAccessory={() => {
                props.deleteAccountInfo(key);
              }}
            />
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderCastSheetNationalityItem = () => {
    const { props } = this;

    const key = 'nationality';

    const info = props.account.info[key];

    let text = undefined;
    let visible = undefined;

    if (info) {
      text = info.text;
      visible = info.visible;
    }

    return (
      <Translation>
        {(t) => (
          <CastSheetItem
            text={t('app.nationality')}
            visible={visible}
            onPressVisibilityButton={(event) => {
              const { visible } = event;

              props.addAccountInfo(key, {
                ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                visible: !visible,
              });
            }}
          >
            <Tag
              style={styles.tag}
              type="input"
              text={text}
              rightAccessoryType="delete"
              fill
              onChangeText={(params) => {
                const { text } = params;

                props.addAccountInfo(key, {
                  ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                  visible: !visible,
                });
              }}
              onPressRightAccessory={() => {
                props.deleteAccountInfo(key);
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
