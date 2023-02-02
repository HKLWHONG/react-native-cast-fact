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
  MainTabAction,
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
  CalendarModalView,
} from '../../../views';

import i18n from '../../../../i18n';
import { Translation } from 'react-i18next';

import { AppRegex } from '../../../regex';

import { Theme, Router } from '../../../utils';

import BottomSheet from '@gorhom/bottom-sheet';

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import {
  CreateProjectStep1View,
  CreateProjectStep2View,
} from '../../../views';


class CreateProjectSlideSheetContainerView extends BaseComponent {
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

              if (!props.slideSheetRefs.CreateProjectSlideSheet) {
                return;
              }

              props.slideSheetRefs.CreateProjectSlideSheet.close();
            }}
          >
            <View style={styles.slideSheetContainer}>
              <SlideSheet
                title={t('views.create_project.title')}
                components={[
                  {
                    name: 'CreateProjectStep1',
                    object: CreateProjectStep1View,
                  },
                  {
                    name: 'CreateProjectStep2',
                    object: CreateProjectStep2View,
                  },
                ]}
                didMount={(ref) => {
                  props.addSlideSheetRef('CreateProjectSlideSheet', ref);
                }}
                onDismiss={() => {
                  Router.goBack(props);
                }}
              >
                <Stack.Group
                  screenOptions={{
                    presentation: 'transparentModal',
                    headerShown: false,
                    animationEnabled: false,
                  }}
                >
                  <Stack.Screen name="CalendarModal" component={CalendarModalView} />
                </Stack.Group>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectSlideSheetContainerView);
