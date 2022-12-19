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
import { ProfileAction, MainTabAction } from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  List,
} from '../../components';

import {
  ViewIndicator,
  Section,
  Button,
  TextInput,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class CreateProjectStep1View extends BaseComponent {
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

  renderViewIndicator = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <ViewIndicator
            index={0}
            numberOfIndicators={2}
            text={t('views.create_project.project_information')}
          />
        )}
      </Translation>
    );
  };

  renderNameSection = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            source={preview}
            label={section.title}
          >
            <TextInput
              style={styles.textInput}
              disableBottomLine
              disableMessageView
            />
          </Section>
        )}
      </Translation>
    );
  };

  renderDurationSection = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            source={preview}
            label={section.title}
          >
            <Text style={{ backgroundColor: 'red', flex: 1, height: 80 }} />
          </Section>
        )}
      </Translation>
    );
  };

  renderItem = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    switch (section.index) {
      case 0:
        return this.renderNameSection(params);

      case 1:
        return this.renderDurationSection(params);

      default:
        return this.renderDurationSection(params);
        break;
    }
  };

  renderBottomButton = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Button
            style={styles.bottomButton}
            text={t('app.next')}
            onPress={() => {
              Router.push(props, 'CreateProjectStep2');
            }}
          />
        )}
      </Translation>
    );
  };

  renderBody = () => {
    const { props } = this;

    let sections = [
      {
        title: i18n.t('app.name'),
        data: [''],
      },
      {
        title: i18n.t('app.duration'),
        data: [''],
      },
      {
        title: i18n.t('app.duration'),
        data: [''],
      },
      {
        title: i18n.t('app.duration'),
        data: [''],
      },
      {
        title: i18n.t('app.duration'),
        data: [''],
      },
      {
        title: i18n.t('app.duration'),
        data: [''],
      },
      {
        title: i18n.t('app.duration'),
        data: [''],
      },
      {
        title: i18n.t('app.duration'),
        data: [''],
      },
    ];

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}
            scrollable={false}
          >
            {this.renderViewIndicator()}
            <List
              contentContainerStyle={styles.listContentContainer}
              sections={sections}
              renderItem={this.renderItem}
            />
            {this.renderBottomButton()}
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
          <Root
            style={styles.root}
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
  },
  listContentContainer: {
    paddingHorizontal: 0,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Theme.colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  bottomButton: {
    margin: 16,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectStep1View);
