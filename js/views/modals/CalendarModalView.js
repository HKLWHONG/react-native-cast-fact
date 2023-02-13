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
  store,
  CalendarModalViewAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  SingleTouch,
} from '../../components';

import {
  Calendar,
} from '../../project-components';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

class CalendarModalView extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {};
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

  renderCalendarModal = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Calendar
            style={styles.calendar}
            initialDate={props.initialDate}
            onDayPress={(date) => {
              console.log('[calendar-modal-view-selected-date]', date);

              if (store.getState().calendarModalViewReducer.callbacks.onDayPress) {
                store.getState().calendarModalViewReducer.callbacks.onDayPress(date);
              }

              props.setOnDayPress(undefined);

              Router.goBack(props);
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
            <SingleTouch
              type="TouchableWithoutFeedback"
              onPress={() => {
                props.setOnDayPress(undefined);

                Router.goBack(props);
              }}
            >
              <View style={styles.calendarContainer}>
                {this.renderCalendarModal()}
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
          <Root style={styles.root} backgroundContainerStyle={{ backgroundColor: Theme.colors.background.modal }}>
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
    // backgroundColor: "#f0f",
  },
  header: {
    // backgroundColor: "#f00",
  },
  body: {
    // backgroundColor: '#0f0',
  },
  calendarContainer: {
    // backgroundColor: '#f00',
    flex: 1,
    justifyContent: 'center',
  },
  calendar: {
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 5,
    borderColor: Theme.colors.text.subtitle,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    initialDate: state.calendarModalViewReducer.initialDate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setOnDayPress: (...args) => dispatch(CalendarModalViewAction.setOnDayPress(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModalView);
