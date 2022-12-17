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
  ProjectAction,
  MainTabAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  List,
  FontConstants,
} from '../../components';

import {
  // MyProjectsSection,
  // MyEventsSection,
  Section,
  ProjectEventList,
} from '../../project-components';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today',
};

LocaleConfig.defaultLocale = 'en';

const ic_stack = require('../../../assets/images/ic_stack/ic_stack.png');

class ProjectView extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      date: undefined,
    };
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

  renderCalendar = (params) => {
    const { props, state } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View>
            <Calendar
              theme={{
                backgroundColor: Theme.colors.general.black,
                calendarBackground: Theme.colors.general.black,
                textSectionTitleColor: Theme.colors.text.subtitle,
                // textSectionTitleDisabledColor: '#d9e1e8',
                // selectedDayBackgroundColor: Theme.colors.text.subtitle,
                // selectedDayTextColor: Theme.colors.general.white,
                todayTextColor: 'cyan',
                dayTextColor: Theme.colors.general.white,
                textDisabledColor: Theme.colors.text.subtitle,
                // dotColor: '#00f',
                // selectedDotColor: '#00ff00',
                arrowColor: Theme.colors.text.subtitle,
                // disabledArrowColor: '#d9e1e8',
                monthTextColor: Theme.colors.text.subtitle,
                // indicatorColor: 'blue',
                // textDayFontFamily: Theme.fonts.regular,
                // textMonthFontFamily: Theme.fonts.regular,
                // textDayHeaderFontFamily: Theme.fonts.regular,
                textDayFontWeight: FontConstants.WEIGHT_MEDIUM,
                textMonthFontWeight: FontConstants.WEIGHT_REGULAR,
                textDayHeaderFontWeight: FontConstants.WEIGHT_MEDIUM,
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12,
              }}
              markingType="multi-period"
              markedDates={{
                '2022-12-14': {
                  periods: [
                    {startingDay: true, endingDay: false, color: 'cyan'},
                    // {startingDay: false, endingDay: true, color: '#ffa500'},
                    // {startingDay: true, endingDay: false, color: '#f0e68c'}
                  ]
                },
                '2022-12-15': {
                  periods: [
                    {startingDay: false, endingDay: false, color: 'cyan'},
                    // {color: 'transparent'},
                    // {startingDay: false, endingDay: false, color: '#f0e68c'}
                  ]
                },
                '2022-12-16': {
                  periods: [
                    {startingDay: false, endingDay: true, color: 'cyan'},
                    // {color: 'transparent'},
                    // {startingDay: false, endingDay: false, color: '#f0e68c'}
                  ]
                }
              }}
              // Initially visible month. Default = now
              initialDate={state.date}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              // minDate={'2012-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              // maxDate={'2023-05-30'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={day => {
                console.log('selected day', day);

                this.setState({
                  date: day.dateString,
                });
              }}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={day => {
                console.log('selected day', day);
              }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'yyyy MM'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={month => {
                console.log('month changed', month);
              }}
              // Hide month navigation arrows. Default = false
              // hideArrows={true}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              // renderArrow={direction => <Arrow />}
              // Do not show days of other months in month page. Default = false
              // hideExtraDays={true}
              // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              // disableMonthChange={true}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
              firstDay={0}
              // Hide day names. Default = false
              // hideDayNames={true}
              // Show week numbers to the left. Default = false
              // showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              // onPressArrowLeft={subtractMonth => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              // onPressArrowRight={addMonth => addMonth()}
              // Disable left arrow. Default = false
              // disableArrowLeft={true}
              // Disable right arrow. Default = false
              // disableArrowRight={true}
              // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
              // disableAllTouchEventsForDisabledDays={true}
              // Replace default month and year title with custom one. the function receive a date as parameter
              // renderHeader={date => {
              //   /*Return JSX*/
              // }}
              // Enable the option to swipe between months. Default = false
              // enableSwipeMonths={true}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderMyProjectsSection = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            contentContainerStyle={styles.sectionContentContainer}
            source={ic_stack}
            label={section.title}
          >
            <ProjectEventList
              data={[
                {
                  title: '',
                },
                {
                  title: '',
                }
              ]}
              // onEndReached={this.onEndReached}
            />
          </Section>
        )}
      </Translation>
    );
  };

  renderMyEventsSection = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <Section
            contentContainerStyle={styles.sectionContentContainer}
            source={ic_stack}
            label={section.title}
          >
            <ProjectEventList
              data={[
                {
                  title: '',
                },
                {
                  title: '',
                }
              ]}
              // onEndReached={this.onEndReached}
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
        return this.renderCalendar(params);

      case 1:
        return this.renderMyProjectsSection(params);

      case 2:
        return this.renderMyEventsSection(params);

      default:
        break;
    }
  };

  renderBody = () => {
    const { props } = this;

    let sections = [
      {
        title: i18n.t(''),
        data: [''],
      },
      {
        title: i18n.t('app.my_projects'),
        data: [''],
      },
      {
        title: i18n.t('app.my_events'),
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
            <List
              innerRef={(ref) => {
                props.setListRef(2, 0, ref);
              }}
              contentContainerStyle={styles.listContentContainer}
              sections={sections}
              renderItem={this.renderItem}
              androidRefreshControlColor={Theme.colors.general.black}
              iosRefreshControlColor={Theme.colors.general.white}
              refreshing={props.refreshing}
              onRefresh={async (refreshing) => {
                // props.setRefreshing(true);

                // props.setFeedsPagingPage(0);
                //
                // this.loadFeeds([]);

                // await FeedProvider.prefetchFeeds(props);
                //
                // props.setRefreshing(false);
              }}
            />
          </Body>
        )}
      </Translation>
    );
  };

  // renderBody = () => {
  //   const { props } = this;
  //
  //   return (
  //     <Translation>
  //       {(t) => (
  //         <Body style={styles.body}>
  //           <View>
  //             <Calendar
  //               // Initially visible month. Default = now
  //               initialDate={'2012-03-01'}
  //               // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  //               minDate={'2012-05-10'}
  //               // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  //               maxDate={'2012-05-30'}
  //               // Handler which gets executed on day press. Default = undefined
  //               onDayPress={day => {
  //                 console.log('selected day', day);
  //               }}
  //               // Handler which gets executed on day long press. Default = undefined
  //               onDayLongPress={day => {
  //                 console.log('selected day', day);
  //               }}
  //               // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  //               monthFormat={'yyyy MM'}
  //               // Handler which gets executed when visible month changes in calendar. Default = undefined
  //               onMonthChange={month => {
  //                 console.log('month changed', month);
  //               }}
  //               // Hide month navigation arrows. Default = false
  //               // hideArrows={true}
  //               // Replace default arrows with custom ones (direction can be 'left' or 'right')
  //               // renderArrow={direction => <Arrow />}
  //               // Do not show days of other months in month page. Default = false
  //               // hideExtraDays={true}
  //               // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
  //               // day from another month that is visible in calendar page. Default = false
  //               // disableMonthChange={true}
  //               // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
  //               firstDay={1}
  //               // Hide day names. Default = false
  //               // hideDayNames={true}
  //               // Show week numbers to the left. Default = false
  //               showWeekNumbers={true}
  //               // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  //               onPressArrowLeft={subtractMonth => subtractMonth()}
  //               // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  //               onPressArrowRight={addMonth => addMonth()}
  //               // Disable left arrow. Default = false
  //               // disableArrowLeft={true}
  //               // Disable right arrow. Default = false
  //               // disableArrowRight={true}
  //               // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
  //               // disableAllTouchEventsForDisabledDays={true}
  //               // Replace default month and year title with custom one. the function receive a date as parameter
  //               // renderHeader={date => {
  //               //   /*Return JSX*/
  //               // }}
  //               // Enable the option to swipe between months. Default = false
  //               enableSwipeMonths={true}
  //             />
  //           </View>
  //         </Body>
  //       )}
  //     </Translation>
  //   );
  // };

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
  sectionContentContainer: {
    padding: 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
