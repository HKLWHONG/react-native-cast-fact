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
  SettingsViewAction,
  DataAction,
  MainTabNavigatorAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  List,
  Image,
} from '../../components';

import {
  Button,
} from '../../project-components';

import { AppRegex } from '../../regex';

import {
  AuthProvider,
} from '../../providers';

import { Theme, Router } from '../../utils';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

export const IDENTIFIER = 'SettingsView';

class SettingsView extends BaseComponent {
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

  renderItem = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.itemContainer}>
            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              text={item.text}
              alignment="left"
              leftAccessorySource={item.source}
              leftAccessoryResizeMode="center"
              onPress={(event) => {
                console.log(`[on-press] ${item.text}`)

                if (!item.onPress) {
                  return;
                }

                item.onPress(event);
              }}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderBody = () => {
    const { props } = this;

    let sections = [
      {
        title: i18n.t(''),
        data: [],
      },
    ];

    if (props.isLoggedIn) {
      if (props.hasProfile) {
        sections[0] = {
          ...sections[0],
          data: [
            ...sections[0].data,
            {
              source: preview,
              text: i18n.t('Edit Display Name'),
              onPress: () => {
                Router.push(props, 'ProfileNameDisplaySelectionView');
              },
            },
            {
              source: {},
              text: i18n.t('Edit Profile'),
              onPress: () => {
                Router.push(props, 'ProfileCastSheetEditionView');
              },
            },
            {
              source: {},
              text: i18n.t('Change Profile Picture'),
              onPress: () => {
                Router.push(props, 'ProfilePictureSelectionView');
              },
            },
          ],
        };
      }

      sections[0] = {
        ...sections[0],
        data: [
          ...sections[0].data,
          {
            source: {},
            text: i18n.t('Change Password'),
            onPress: () => {
              Router.push(props, 'AccountChangePasswordStep1View');
            },
          },
          {
            source: {},
            text: i18n.t('Logout'),
            onPress: () => {
              AuthProvider.logout()
                .then(() => {
                  props.resetData();

                  Router.jumpTo(props, 'SearchStackNavigator');
                })
                .catch((error) => {
                  console.error(error);
                });
            },
          },
        ],
      };
    }

    /*
    {
      source: preview,
      text: i18n.t('Edit Display Name'),
      onPress: () => {
        Router.push(props, 'ProfileNameDisplaySelectionView');
      },
    },
    {
      source: {},
      text: i18n.t('Edit Profile'),
      onPress: () => {
        Router.push(props, 'ProfileCastSheetEditionView');
      },
    },
    {
      source: {},
      text: i18n.t('Change Profile Picture'),
      onPress: () => {
        Router.push(props, 'ProfilePictureSelectionView');
      },
    },
    {
      source: {},
      text: i18n.t('Change Password'),
      onPress: () => {
        Router.push(props, 'AccountChangePasswordStep1View');
      },
    },
    {
      source: {},
      text: i18n.t('Logout'),
      onPress: () => {
        AuthProvider.logout()
          .then(() => {
            props.resetData();

            Router.jumpTo(props, 'SearchStackNavigator');
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
    */

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}
            scrollable={false}
          >
          {
            <List
              contentContainerStyle={styles.listContentContainer}
              sections={sections}
              renderItem={this.renderItem}
            />
          }
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
          <Footer style={styles.footer}>
            <Text style={styles.footerText}>
              {t('system.app_name')}
            </Text>
            <Text style={styles.footerDescription}>
              {t('system.version_name')}
            </Text>
            <Text style={styles.footerDescription}>
              {t('v1.0.0')}
            </Text>
          </Footer>
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
  },
  listContentContainer: {
    padding: 16,
  },
  itemContainer: {
    // backgroundColor: '#0f0',
  },
  button: {
    // backgroundColor: "#f00",
    backgroundColor: Theme.colors.general.transparent,
  },
  buttonText: {
    // color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
    // letterSpacing: 2.22,
    // textTransform: 'uppercase',
  },
  image: {
    // backgroundColor: '#0f0',
    width: 40,
    height: 40,
  },
  footer: {
    // backgroundColor: '#f00',
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  footerDescription: {
    color: Theme.colors.background.gray,
    fontSize: 15,
    fontFamily: Theme.fonts.regular,
    letterSpacing: 1,
  },
});

function mapStateToProps(state) {
  return {
    isLoggedIn: state.dataReducer.isLoggedIn,
    hasProfile: state.dataReducer.hasProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SettingsViewAction.reset(...args)),
    resetData: (...args) => dispatch(DataAction.reset(...args)),
    setListRef: (...args) => dispatch(MainTabNavigatorAction.setListRef(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
