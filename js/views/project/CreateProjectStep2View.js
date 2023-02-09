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
  CreateProjectStep2ViewAction,
  CalendarModalViewAction,
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
            index={1}
            numberOfIndicators={2}
            text={t('views.create_project.my_availability')}
          />
        )}
      </Translation>
    );
  };

  renderOverviewSection = (params) => {
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

  renderAvailabilitySection = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    let children = (
      Array(props.data.availabilities.length)
        .fill()
        .map((_, i) => i)
        .map((i) => {
          let availability = props.data.availabilities[i];

          return (
            <View
              key={i.toString()}
              style={{
                // backgroundColor: 'cyan',
                flexDirection: 'row',
                marginVertical: 8,
              }}
            >
              <SingleTouch
                onPress={() => {
                  props.setCalendarModalViewInitialDate(CalendarProcessor.toDateString(availability.durationFrom));

                  props.setCalendarModalViewOnDayPress((date) => {
                    props.updateAvailability(
                      availability.availabilityId,
                      {
                        durationFrom: CalendarProcessor.formatDate(new Date(date.dateString)),
                      },
                    );
                  });

                  Router.push(props, 'CalendarModal');
                }}
              >
                <View style={styles.container}>
                  <Text style={styles.text}>
                    {availability.durationFrom}
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
                  props.setCalendarModalViewInitialDate(CalendarProcessor.toDateString(availability.durationTo));

                  props.setCalendarModalViewOnDayPress((date) => {
                    props.updateAvailability(
                      availability.availabilityId,
                      {
                        durationTo: CalendarProcessor.formatDate(new Date(date.dateString)),
                      },
                    );
                  });

                  Router.push(props, 'CalendarModal');
                }}
              >
                <View style={styles.container}>
                  <Text style={styles.text}>
                    {availability.durationTo}
                  </Text>
                </View>
              </SingleTouch>
            </View>
          );
        })
    );

    return (
      <Translation>
        {(t) => (
          <Section
            source={preview}
            label={section.title}
          >
            <View>
              {children}
              <Button
                style={{
                  backgroundColor: 'red',
                  marginVertical: 8,
                  padding: 8,
                }}
                type="small"
                text={'+'}
                onPress={() => {
                  props.addAvailability({
                    durationFrom: CalendarProcessor.formatDate(new Date()),
                    durationTo: CalendarProcessor.formatDate(new Date()),
                  })
                }}
              />
            </View>
          </Section>
        )}
      </Translation>
    );
  };

  renderAisibilityOnProfileSection = (params) => {
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

  renderItem = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    switch (section.index) {
      // case 0:
      //   return this.renderOverviewSection(params);

      case 0:
        return this.renderAvailabilitySection(params);

      case 1:
        return this.renderAisibilityOnProfileSection(params);

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
            text={t('app.create')}
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
      // {
      //   title: i18n.t('app.overview'),
      //   data: [''],
      // },
      {
        title: i18n.t('app.availability'),
        data: [''],
      },
      {
        title: i18n.t('views.create_project.visibility_on_profile'),
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
    data: state.createProjectStep2ViewReducer.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(CreateProjectStep2ViewAction.reset(...args)),
    addAvailability: (...args) => dispatch(CreateProjectStep2ViewAction.addAvailability(...args)),
    updateAvailability: (...args) => dispatch(CreateProjectStep2ViewAction.updateAvailability(...args)),
    deleteAvailability: (...args) => dispatch(CreateProjectStep2ViewAction.deleteAvailability(...args)),
    setCalendarModalViewInitialDate: (...args) => dispatch(CalendarModalViewAction.setInitialDate(...args)),
    setCalendarModalViewOnDayPress: (...args) => dispatch(CalendarModalViewAction.setOnDayPress(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectStep2View);
