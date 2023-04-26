/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  ImageBackground,
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  ProfileNameDisplaySelectionViewAction,
  SignUpStackNavigatorAction,
  SettingsStackNavigatorAction,
  ProfileInfoSetupViewAction,
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
  ProfileInfoSetupView,
  TextInput,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import { ProfileProcessor } from '../../processors';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_light_background = require('../../../assets/images/ic_light_background/ic_light_background.png');

const preview = require('../../../assets/images/preview/preview.png');

export const IDENTIFIER = 'ProfileNameDisplaySelectionView';

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

    if (props.userProfile) {
      props.addSettingsStackNavigatorOnScreenAppearList(IDENTIFIER, () => {
        this.validateAll();
      });

      props.addSettingsStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
        console.log('call api...');
        // Router.push(props, 'ProfileCastSheetEditionView');
      });

      props.setProfileInfoSetupViewFirstnameEn(props.userProfile.firstname_en);
      props.setProfileInfoSetupViewLastnameEn(props.userProfile.lastname_en);
      props.setProfileInfoSetupViewFirstnameZh(props.userProfile.firstname_zh);
      props.setProfileInfoSetupViewLastnameZh(props.userProfile.lastname_zh);
      props.setProfileInfoSetupViewNickname(props.userProfile.nickname);

      let nameDisplayFormat = 0;

      if (props.userProfile.name_display_format && props.userProfile.name_display_format.length > 0) {
        nameDisplayFormat = parseInt(profile.name_display_format);
      }

      props.setProfileInfoSetupViewDisplayFormat(nameDisplayFormat) ;
    } else {
      props.addSignUpStackNavigatorOnScreenAppearList(IDENTIFIER, () => {
        this.validateAll();
      });

      props.addSignUpStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
        Router.push(props, 'ProfileCastSheetEditionView');
      });

      props.setProfileInfoSetupViewDisplayFormat(0);
    }
  };

  clearData = () => {
    const { props } = this;
  };

  validateAll = () => {
    const { props } = this;

    const { account } = store.getState().profileInfoSetupViewReducer;

    const setStackNavigatorEnabledRight = props.userProfile
      ?
      props.setSettingsStackNavigatorEnabledRight
      :
      props.setSignUpStackNavigatorEnabledRight;

    if (account.info.displayFormat === 0) {
      setStackNavigatorEnabledRight(ProfileProcessor.validateNameDisplayFormat_0());
    } else if (account.info.displayFormat === 1) {
      setStackNavigatorEnabledRight(ProfileProcessor.validateNameDisplayFormat_1());
    } else if (account.info.displayFormat === 2) {
      setStackNavigatorEnabledRight(ProfileProcessor.validateNameDisplayFormat_2());
    } else if (account.info.displayFormat === 3) {
      setStackNavigatorEnabledRight(ProfileProcessor.validateNameDisplayFormat_3());
    }
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

  renderImageBackground = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <ImageBackground
            style={styles.imageBackground}
            source={ic_light_background}
          />
        )}
      </Translation>
    );
  };

  renderProfileContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <ProfileInfoSetupView
            hiddenViewIndicator={props.userProfile !== undefined}
            index={1}
            text={t('views.profile_name_display_selection.title')}
          />
        )}
      </Translation>
    );
  };

  renderOption1Container = () => {
    const { props } = this;

    let style = {};

    if (props.profileInfoSetupViewAccount.info.displayFormat === 0) {
      style = {
        ...style,
        ...styles.selectedOptionContainer,
      };
    }

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            style={[styles.optionContainer, style]}
            onPress={() => {
              props.setProfileInfoSetupViewDisplayFormat(0);

              this.validateAll();
            }}
          >
            <View
              style={[
                styles.optionTextContainer,
                {
                  flex: 1,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.nickname')}
              </Text>
            </View>
            <View
              style={[
                styles.optionTextContainer,
                {
                  flex: 1,
                  marginLeft: 8,
                  marginRight: 4,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.lastname_en')}
              </Text>
            </View>
            <View
              style={[
                styles.optionTextContainer,
                {
                  marginLeft: 4,
                  marginRight: 8,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.lastname_zh')}
              </Text>
            </View>
            <View
              style={[
                styles.optionTextContainer,
                {
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.firstname_zh')}
              </Text>
            </View>
          </SingleTouch>
        )}
      </Translation>
    );
  };

  renderOption2Container = () => {
    const { props } = this;

    let style = {};

    if (props.profileInfoSetupViewAccount.info.displayFormat === 1) {
      style = {
        ...style,
        ...styles.selectedOptionContainer,
      };
    }

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            style={[styles.optionContainer, style]}
            onPress={() => {
              props.setProfileInfoSetupViewDisplayFormat(1);

              this.validateAll();
            }}
          >
            <View
              style={[
                styles.optionTextContainer,
                {
                  flex: 1,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.firstname_en')}
              </Text>
            </View>
            <View
              style={[
                styles.optionTextContainer,
                {
                  flex: 1,
                  marginLeft: 8,
                  marginRight: 4,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.lastname_en')}
              </Text>
            </View>
            <View
              style={[
                styles.optionTextContainer,
                {
                  marginLeft: 4,
                  marginRight: 8,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.lastname_zh')}
              </Text>
            </View>
            <View
              style={[
                styles.optionTextContainer,
                {
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.firstname_zh')}
              </Text>
            </View>
          </SingleTouch>
        )}
      </Translation>
    );
  };

  renderOption3Container = () => {
    const { props } = this;

    let style = {};

    if (props.profileInfoSetupViewAccount.info.displayFormat === 2) {
      style = {
        ...style,
        ...styles.selectedOptionContainer,
      };
    }

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            style={[styles.optionContainer, style]}
            onPress={() => {
              props.setProfileInfoSetupViewDisplayFormat(2);

              this.validateAll();
            }}
          >
            <View
              style={[
                styles.optionTextContainer,
                {
                  flex: 1,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.nickname')}
              </Text>
            </View>
            <View
              style={[
                styles.optionTextContainer,
                {
                  marginHorizontal: 8,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.lastname_zh')}
              </Text>
            </View>
            <View
              style={[
                styles.optionTextContainer,
                {
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.firstname_zh')}
              </Text>
            </View>
          </SingleTouch>
        )}
      </Translation>
    );
  };

  renderOption4Container = () => {
    const { props } = this;

    let style = {};

    if (props.profileInfoSetupViewAccount.info.displayFormat === 3) {
      style = {
        ...style,
        ...styles.selectedOptionContainer,
      };
    }

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            style={[styles.optionContainer, style]}
            onPress={() => {
              props.setProfileInfoSetupViewDisplayFormat(3);

              this.validateAll();
            }}
          >
            <View
              style={[
                styles.optionTextContainer,
                {
                  flex: 1,
                  borderRadius: 8,
                },
              ]}
            >
              <Text style={styles.optionText}>
                {t('app.nickname')}
              </Text>
            </View>
          </SingleTouch>
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
            {this.renderOption1Container()}
            {this.renderOption2Container()}
            {this.renderOption3Container()}
            {this.renderOption4Container()}
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
            {this.renderImageBackground()}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  imageBackground: {
    // backgroundColor: '#f00',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 230 / 393,
  },
  optionsContainer: {
    // backgroundColor: '#0f0',
    marginVertical: 32,
  },
  optionContainer: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.background.gray,
    padding: 8,
    marginVertical: 8,
  },
  selectedOptionContainer: {
    borderColor: Theme.colors.general.white,
  },
  optionTextContainer: {
    backgroundColor: Theme.colors.background.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  optionText: {
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.regular,
    letterSpacing: 1,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    profileInfoSetupViewAccount: state.profileInfoSetupViewReducer.account,
    userProfile: state.dataReducer.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSignUpStackNavigatorOnScreenAppearList: (...args) => dispatch(SignUpStackNavigatorAction.addOnScreenAppear(...args)),
    setSignUpStackNavigatorEnabledRight: (...args) => dispatch(SignUpStackNavigatorAction.setEnabledRight(...args)),
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
    addSettingsStackNavigatorOnScreenAppearList: (...args) => dispatch(SettingsStackNavigatorAction.addOnScreenAppear(...args)),
    setSettingsStackNavigatorEnabledRight: (...args) => dispatch(SettingsStackNavigatorAction.setEnabledRight(...args)),
    addSettingsStackNavigatorOnRightButtonPress: (...args) => dispatch(SettingsStackNavigatorAction.addOnRightButtonPress(...args)),
    setProfileInfoSetupViewFirstnameEn: (...args) => dispatch(ProfileInfoSetupViewAction.setFirstnameEn(...args)),
    setProfileInfoSetupViewLastnameEn: (...args) => dispatch(ProfileInfoSetupViewAction.setLastnameEn(...args)),
    setProfileInfoSetupViewFirstnameZh: (...args) => dispatch(ProfileInfoSetupViewAction.setFirstnameZh(...args)),
    setProfileInfoSetupViewLastnameZh: (...args) => dispatch(ProfileInfoSetupViewAction.setLastnameZh(...args)),
    setProfileInfoSetupViewNickname: (...args) => dispatch(ProfileInfoSetupViewAction.setNickname(...args)),
    setProfileInfoSetupViewDisplayFormat: (...args) => dispatch(ProfileInfoSetupViewAction.setDisplayFormat(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNameDisplaySelectionView);
