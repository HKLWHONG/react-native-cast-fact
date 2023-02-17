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

    props.setProfileInfoSetupSectionDisplayFormat(0);
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

  renderOption1Container = () => {
    const { props } = this;

    let style = {};

    if (props.profileInfoSetupSectionAccount.info.displayFormat === 0) {
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
              props.setProfileInfoSetupSectionDisplayFormat(0);
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

    if (props.profileInfoSetupSectionAccount.info.displayFormat === 1) {
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
              props.setProfileInfoSetupSectionDisplayFormat(1);
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

    if (props.profileInfoSetupSectionAccount.info.displayFormat === 2) {
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
              props.setProfileInfoSetupSectionDisplayFormat(2);
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

    if (props.profileInfoSetupSectionAccount.info.displayFormat === 3) {
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
              props.setProfileInfoSetupSectionDisplayFormat(3);
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
    marginTop: 16,
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
    profileInfoSetupSectionAccount: state.profileInfoSetupSectionReducer.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
    setProfileInfoSetupSectionDisplayFormat: (...args) => dispatch(ProfileInfoSetupSectionAction.setDisplayFormat(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNameDisplaySelectionView);
