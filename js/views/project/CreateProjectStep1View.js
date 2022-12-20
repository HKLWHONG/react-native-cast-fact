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
  CreateProjectStep1Action,
  CalendarModalAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  List,
  SingleTouch,
  Image,
} from '../../components';

import {
  ViewIndicator,
  Section,
  Button,
  TextInput,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import { CalendarProcessor } from '../../processors';

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import ContextMenu from "react-native-context-menu-view";

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

    props.reset();
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
              style={styles.container}
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
            <View style={{
              // backgroundColor: 'cyan',
              flexDirection: 'row',
            }}>
              <SingleTouch
                onPress={() => {
                  props.setCalendarInitialDate(CalendarProcessor.toDateString(props.data.durationFrom));

                  props.setCalendarModalOnDayPress((date) => {
                    props.updateData({
                      durationFrom: CalendarProcessor.formatDate(new Date(date.dateString)),
                    });
                  });

                  Router.push(props, 'CalendarModal');
                }}
              >
                <View style={styles.container}>
                  <Text style={styles.text}>
                    {props.data.durationFrom}
                  </Text>
                </View>
              </SingleTouch>
              <View style={[styles.container, { borderWidth: 0 }]}>
                <Text style={styles.text}>
                  {'-'}
                </Text>
              </View>
              <SingleTouch
                onPress={() => {
                  props.setCalendarInitialDate(CalendarProcessor.toDateString(props.data.durationTo));

                  props.setCalendarModalOnDayPress((date) => {
                    props.updateData({
                      durationTo: CalendarProcessor.formatDate(new Date(date.dateString)),
                    });
                  });

                  Router.push(props, 'CalendarModal');
                }}
              >
                <View style={styles.container}>
                  <Text style={styles.text}>
                    {props.data.durationTo}
                  </Text>
                </View>
              </SingleTouch>
            </View>
          </Section>
        )}
      </Translation>
    );
  };

  renderLocationSection = (params) => {
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
              style={[styles.container, styles.textInput]}
              disableBottomLine
              disableMessageView
            />
          </Section>
        )}
      </Translation>
    );
  };

  renderTypeSection = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            source={preview}
            label={section.title}
          >
            <ContextMenu
              actions={[{ title: 'MV' }, { title: 'LIFESTYLE' }, { title: 'PHOTOGRAPHY' }]}
              previewBackgroundColor={'transparent'}
              onPress={(e) => {
                console.log(
                  `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`
                );
              }}
              onCancel={(e) => {
                console.log(
                  `Cancelled`
                );
              }}
              dropdownMenuMode
            >
              <SingleTouch>
                <View style={[styles.container, { flexDirection: 'row', alignItems: 'center' }]}>
                  <Image
                    style={styles.image}
                    source={preview}
                    resizeMode="center"
                  />
                  <Text style={[styles.text, { flex: 1, margin: 8 }]}>
                    {'MV'}
                  </Text>
                  <Image
                    style={styles.image}
                    source={preview}
                    resizeMode="center"
                  />
                </View>
              </SingleTouch>
            </ContextMenu>
          </Section>
        )}
      </Translation>
    );
  };

  renderNotesSection = (params) => {
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
              style={[styles.container, { minHeight: 150 }]}
              multiline
              disableBottomLine
              disableMessageView
            />
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

      case 2:
        return this.renderLocationSection(params);

      case 3:
        return this.renderTypeSection(params);

      case 4:
        return this.renderNotesSection(params);

  break;

      default:
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
        title: i18n.t('app.location'),
        data: [''],
      },
      {
        title: i18n.t('app.type'),
        data: [''],
      },
      {
        title: i18n.t('app.notes'),
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
  container: {
    // backgroundColor: '#f00',
    borderWidth: 1,
    borderColor: Theme.colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  text: {
    // backgroundColor: '#0ff',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  image: {
    // backgroundColor: '#f00',
    width: 20,
    height: 20,
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
    data: state.createProjectStep1Reducer.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(CreateProjectStep1Action.reset(...args)),
    updateData: (...args) => dispatch(CreateProjectStep1Action.updateData(...args)),
    setCalendarInitialDate: (...args) => dispatch(CalendarModalAction.setInitialDate(...args)),
    setCalendarModalOnDayPress: (...args) => dispatch(CalendarModalAction.setOnDayPress(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectStep1View);
