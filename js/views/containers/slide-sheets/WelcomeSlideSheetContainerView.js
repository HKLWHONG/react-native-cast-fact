/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import {
  MainTabNavigatorAction,
  SlideSheetAction,
} from '../../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  List,
  FontConstants,
  SingleTouch,
} from '../../../components';

import {
  SlideSheet,
  // MyProjectsSection,
  // MyEventsSection,
  // Section,
  // ProjectEventList,
} from '../../../project-components';

import {
  // LoginView,
  WelcomeView,
  // SignUpView,
  // SignUpAccountTypeSelectionView,
  // ProfilePictureSelectionView,
  // ProfileNameEditionView,
  // ProfileNameDisplaySelectionView,
  // ProfileCastSheetEditionView,
  // ProfileCompletionView,
} from '../../../views';

import i18n from '../../../../i18n';
import { Translation } from 'react-i18next';

import { AppRegex } from '../../../regex';

import { Theme, Router } from '../../../utils';

import BottomSheet from '@gorhom/bottom-sheet';

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class WelcomeSlideSheetContainerView extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    super.componentDidMount();

    const { props } = this;

    this.initialize();

    // console.log('[test-component]', typeof TestView2);
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.clearData();
  }

  initialize = () => {
    const { props } = this;

    props.addSlideSheetProps(this.constructor.name, props);
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

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}
            scrollable={false}
          >
          <SingleTouch
            type="TouchableWithoutFeedback"
            onPress={() => {
              console.log('[onPress]');

              if (!props.slideSheetRefs[this.constructor.name]) {
                return;
              }

              props.slideSheetRefs[this.constructor.name].close();
            }}
          >
            <View style={styles.slideSheetContainer}>
              <SlideSheet
                title={t('')}
                components={[
                  {
                    name: 'WelcomeView',
                    object: WelcomeView,
                  },
                  // {
                  //   name: 'LoginView',
                  //   object: LoginView,
                  // },
                  // {
                  //   name: 'SignUpView',
                  //   object: SignUpView,
                  // },
                  // {
                  //   name: 'SignUpAccountTypeSelectionView',
                  //   object: SignUpAccountTypeSelectionView,
                  // },
                  // {
                  //   name: 'ProfilePictureSelectionView',
                  //   object: ProfilePictureSelectionView,
                  // },
                  // {
                  //   name: 'ProfileNameEditionView',
                  //   object: ProfileNameEditionView,
                  // },
                  // {
                  //   name: 'ProfileNameDisplaySelectionView',
                  //   object: ProfileNameDisplaySelectionView,
                  // },
                  // {
                  //   name: 'ProfileCastSheetEditionView',
                  //   object: ProfileCastSheetEditionView,
                  // },
                  // {
                  //   name: 'ProfileCompletionView',
                  //   object: ProfileCompletionView,
                  // },
                ]}
                didMount={(ref) => {
                  if (!ref) {
                    return;
                  }

                  props.addSlideSheetRef(this.constructor.name, ref);
                }}
                onDismiss={() => {
                  Router.goBack(props);
                }}
                // animationEnabled
              >
              </SlideSheet>
            </View>
          </SingleTouch>
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
            backgroundContainerStyle={{ backgroundColor: Theme.colors.background.modal }}
            safeArea={false}
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
    // backgroundColor: Theme.colors.background.primary,
  },
  header: {
    // backgroundColor: "#f00",
  },
  body: {
    // backgroundColor: '#0f0',
  },
  slideSheetContainer: {
    flex: 1,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    slideSheetRefs: state.slideSheetReducer.refs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSlideSheetRef: (...args) => dispatch(SlideSheetAction.addRef(...args)),
    addSlideSheetProps: (...args) => dispatch(SlideSheetAction.addProps(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeSlideSheetContainerView);
