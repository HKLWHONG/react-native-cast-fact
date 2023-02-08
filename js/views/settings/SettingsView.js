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
import { SettingsAction, MainTabAction } from '../../redux';

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

import { Theme, Router } from '../../utils';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

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
              onPress={() => {
                console.log(`[on-press] ${item.text}`)
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
        data: [
          {
            source: preview,
            text: i18n.t('Change Profile Picture'),
          },
          {
            source: preview,
            text: i18n.t('Edit Display Name'),
          },
          {
            source: preview,
            text: i18n.t('Edit Profile'),
          },
          {
            source: preview,
            text: i18n.t('Change Password'),
          },
          {
            source: preview,
            text: i18n.t('Logout'),
          },
        ],
      },
    ];

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
          <Footer style={styles.footer} />
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
    // fontSize: 17,
    // fontFamily: Theme.fonts.bold,
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
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setListRef: (...args) => dispatch(MainTabAction.setListRef(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
