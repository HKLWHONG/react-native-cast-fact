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
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

// const background = require('../../../assets/images/project_background.png');

class CreateProjectStep2View extends BaseComponent {
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
            index={1}
            numberOfIndicators={2}
            text={t('views.create_project.my_availability')}
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
            label={section.title}
          >
            <View style={{ backgroundColor: 'red', flex: 1, height: 80 }} />
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
            label={section.title}
          >
            <View style={{ backgroundColor: 'red', flex: 1, height: 80 }} />
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
            text={t('app.create')}
            onPress={() => {
              if (!props.slideSheetRefs.CreateProjectSlideSheet) {
                return;
              }

              props.slideSheetRefs.CreateProjectSlideSheet.close();
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
    paddingHorizontal: 0,
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
    slideSheetRefs: state.slideSheetReducer.refs,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectStep2View);
