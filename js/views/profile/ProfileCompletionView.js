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
  ProfileCompletionViewAction,
  SignUpStackNavigatorAction,
  SignUpViewAction,
  ProfileInfoSetupSectionAction,
  ProfileCastSheetEditionViewAction,
} from '../../redux';

import ImagePicker from 'react-native-image-crop-picker';

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
  Button,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_check_gold = require('../../../assets/images/ic_check_gold/ic_check_gold.png');

class ProfileCompletionView extends BaseComponent {
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
  };

  clearData = () => {
    const { props } = this;

    ImagePicker.clean().then(() => {
      console.log('[image-picker] Removed all tmp images from tmp directory.');
    })
      .catch((error) => {
        console.error(error);
      });

      props.resetSignUpView();
      props.resetProfileInfoSetupSection();
      props.resetProfileCastSheetEditionView();
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
          <ProfileInfoSetupSection hiddenViewIndicator />
        )}
      </Translation>
    );
  };

  renderResultContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.resultContainer}>
            <Image
              style={styles.resultImage}
              source={ic_check_gold}
              resizeMode="center"
            />
            <Text style={styles.resultText}>
              {t('Complete')}
            </Text>
            <Text style={styles.description}>
              {t('Your profile is now ready.')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderDoneButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Button
            style={styles.doneButton}
            text={t('app.done')}
            onPress={() => {
              Router.dismiss(props);

              if (!props.slideSheetRefs['WelcomeSlideSheetContainerView']) {
                return;
              }

              props.slideSheetRefs['WelcomeSlideSheetContainerView'].close();

              Router.jumpTo(props, 'AccountStackNavigator');
            }}
          />
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
            {this.renderResultContainer()}
            {this.renderDoneButton()}
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
  resultContainer: {
    // backgroundColor: '#0f0',
    flex: 1,
    alignItems: 'center',
    marginVertical: 32,
  },
  resultImage: {
    width: 80,
    height: 80,
    marginTop: 32,
  },
  resultText: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 26,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 8,
    textTransform: 'uppercase',
    marginVertical: 16,
  },
  description: {
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
  },
  doneButton: {
    marginBottom: 64,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    slideSheetRefs: state.slideSheetReducer.refs,
    profileInfoSetupSectionAccount: state.profileInfoSetupSectionReducer.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
    resetSignUpView: (...args) => dispatch(SignUpViewAction.reset(...args)),
    resetProfileInfoSetupSection: (...args) => dispatch(ProfileInfoSetupSectionAction.reset(...args)),
    resetProfileCastSheetEditionView: (...args) => dispatch(ProfileCastSheetEditionViewAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompletionView);
