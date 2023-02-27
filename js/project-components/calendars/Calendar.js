/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import {
  SingleTouch,
  FontConstants,
  SimpleList,
} from '../../components';

import { Theme } from '../../utils';

import { CalendarProcessor } from '../../processors';

import { Translation } from 'react-i18next';

import {
  Calendar as RNCalendar,
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

class Calendar extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      date: props.initialDate,
      mode: undefined,
    };
  }

  renderItem = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    // console.log('[item]', item);

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            style={{
              // backgroundColor: '#f00',
              flex: 1,
              alignItems: 'center',
              padding: 16,
            }}
            onPress={() => {
              console.log('[item.title]', item.title);
              console.log('[item.date]', item.date);
              console.log('[this.state.date]', this.state.date);

              let date = this.state.date ? new Date(this.state.date) : new Date();

              // props.setCalendarModalViewInitialDate(CalendarProcessor.toDateString(props.data.durationTo));
              //
              // props.setCalendarModalViewOnDayPress((date) => {
              //   props.setDurationTo(CalendarProcessor.formatDate(new Date(date.dateString)));
              // });

              console.log('[test-date]', date);

              const isYearMode = this.state.mode === 'year';

              if (isYearMode) {
                date.setYear(item.date.getFullYear());

                console.log(`[year] ${date}`);
              } else {
                date.setMonth(item.date.getMonth());

                console.log(`[month] ${date}`);
              }

              this.setState({
                date: CalendarProcessor.toDateString(date),
                mode: undefined,
              });
            }}
          >
            <Text style={styles.yearMonthText}>
              {item.title}
            </Text>
          </SingleTouch>
        )}
      </Translation>
    );
  };

  renderYearMonthList = () => {
    const { props, state } = this;

    const isYearMode = state.mode === 'year';
    const isMonthMode = state.mode === 'month';

    if (!isYearMode && !isMonthMode) {
      return;
    }

    // console.log('[initYear]', initYear);
    // console.log('[currentYear]', currentYear);
    // console.log('[years]', years);

    let data = [];

    if (isYearMode) {
      const currentYear = Number((new Date()).getFullYear());
      const initYear = currentYear - 100;
      const years = Array(currentYear - initYear).fill().map((v, i) => i + initYear + 1).reverse();

      data = years.map((year) => {
        const date = new Date();
        date.setFullYear(year);

        return {
          title: CalendarProcessor.getYear(date),
          date: date,
        };
      });
    } else {
      const months = Array(12).fill().map((v, i) => i).reverse();

      data = months.map((month) => {
        const date = new Date();
        date.setMonth(month);

        return {
          title: CalendarProcessor.getMonth(date),
          date: date,
        };
      });
    }

    return (
      <Translation>
        {(t) => (
          <View style={[styles.container, props.style, { marginVertical: '25%', paddingVertical: 64 }]}>
            <SimpleList
              data={data}
              renderItem={this.renderItem}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderHeader = (date) => {
    const { props, state } = this;

    // console.log('[date]', date);
    //
    // console.log('[year]', CalendarProcessor.getYear(new Date(date)));
    // console.log('[month]', CalendarProcessor.getMonth(new Date(date)));
    // console.log('[day]', CalendarProcessor.getDay(new Date(date)));

    return (
      <Translation>
        {(t) => (
          <View style={{ flexDirection: 'row' }}>
            <SingleTouch
              style={{ marginRight: 4 }}
              onPress={() => {
                this.setState({
                  mode: 'month',
                })
              }}
            >
              <Text style={styles.headerText}>
                {CalendarProcessor.getMonth(new Date(date))}
              </Text>
            </SingleTouch>
            <SingleTouch
              style={{ marginLeft: 4 }}
              onPress={() => {
                this.setState({
                  mode: 'year',
                })
              }}
            >
              <Text style={styles.headerText}>
                {CalendarProcessor.getYear(new Date(date))}
              </Text>
            </SingleTouch>
          </View>
        )}
      </Translation>
    );
  }

  renderDayComponent = (params) => {
    const { props } = this;
    const { date, state, theme, marking } = params;

    // if (marking) {
    //   console.log('[params]', params);
    //   console.log('[date]', date);
    //   console.log('[state]', state);
    //   console.log('[marking]', marking);
    // }

    let todayDate = new Date();
    let todayYear = todayDate.getFullYear();
    let todayMonth = todayDate.getMonth() + 1;
    let todayDay = todayDate.getDate();

    let isToday = (
      date.year === todayYear
      &&
      date.month === todayMonth
      &&
      date.day === todayDay
    );

    // console.log('[todayDate]', todayDate);
    // console.log('[todayYear]', todayYear);
    // console.log('[todayMonth]', todayMonth);
    // console.log('[todayDay]', todayDay);
    // console.log('[date]', date);
    // console.log('[isToday]', isToday);

    let dayTextContainerStyle = {};

    if (isToday) {
      dayTextContainerStyle = {
        ...dayTextContainerStyle,
        borderColor: theme.todayTextColor,
        borderWidth: 2,
        borderRadius: 8,
      };
    }

    let textStyle = {
      color: theme.dayTextColor,
      fontSize: theme.textDayFontSize,
      fontWeight: theme.textDayFontWeight,
    };

    if (state === 'disabled') {
      textStyle = {
        ...textStyle,
        color: theme.textDisabledColor,
      };
    }

    if (!props.disableSelection) {
      if (date.dateString === this.state.date) {
        dayTextContainerStyle = {
          ...dayTextContainerStyle,
          backgroundColor: theme.selectedDayBackgroundColor,
          borderRadius: 8,
        };
      }
    }

    let numberOfPeriods = 0;

    if (marking && marking.periods) {
      numberOfPeriods = marking.periods.length;
    }

    let periods = (
      Array(numberOfPeriods)
        .fill()
        .map((_, i) => i)
        .map((i) => {
          let period = marking.periods[i];

          // console.log('[date]', date);
          // console.log('[period]', period);

          let periodStyle = {};

          periodStyle = {
            ...periodStyle,
            backgroundColor: period.color,
          };

          if (period.startingDay) {
            periodStyle = {
              ...periodStyle,
              borderTopLeftRadius: 999,
              borderBottomLeftRadius: 999,
              marginLeft: 4,
            };
          }

          if (period.endingDay) {
            periodStyle = {
              ...periodStyle,
              borderTopRightRadius: 999,
              borderBottomRightRadius: 999,
              marginRight: 4,
            };
          }

          return (
            <View
              key={i.toString()}
              style={{ flexDirection: 'row' }}
            >
              <View style={[styles.period, periodStyle]} />
            </View>
          );
        })
    );

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            style={styles.dayComponentContainer}
            disabled={props.disableSelection}
            onPress={() => {
              console.log('[calendar-selected-date]', date);

              this.setState({
                date: date.dateString,
              });

              if (!props.onDayPress) {
                return;
              }

              props.onDayPress(date);
            }}
          >
            <View style={[styles.dayTextContainer, dayTextContainerStyle]}>
              <Text style={textStyle}>
                {date.day}
              </Text>
            </View>
            <View style={styles.dayPeriodContainer}>
              {periods}
            </View>
          </SingleTouch>
        )}
      </Translation>
    );
  };

  renderCalendar = () => {
    const { props, state } = this;

    return (
      <Translation>
        {(t) => (
          <RNCalendar
            {...props}
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            theme={props.theme}
            renderHeader={this.renderHeader}
            dayComponent={this.renderDayComponent}
            markingType="multi-period"
            // markedDates={{
            //   '2022-12-13': {
            //     periods: [
            //       {startingDay: true, endingDay: false, color: 'cyan'},
            //       {color: 'transparent'},
            //       {color: 'transparent'},
            //     ]
            //   },
            //   '2022-12-14': {
            //     periods: [
            //       {startingDay: false, endingDay: false, color: 'cyan'},
            //       {startingDay: true, endingDay: true, color: '#ffa500'},
            //       {startingDay: true, endingDay: false, color: '#f0e68c'}
            //     ]
            //   },
            //   '2022-12-15': {
            //     periods: [
            //       {startingDay: false, endingDay: false, color: 'cyan'},
            //       {color: 'transparent'},
            //       {startingDay: false, endingDay: false, color: '#f0e68c'}
            //     ]
            //   },
            //   '2022-12-16': {
            //     periods: [
            //       {startingDay: false, endingDay: false, color: 'cyan'},
            //       {color: 'transparent'},
            //       {startingDay: false, endingDay: false, color: '#f0e68c'}
            //     ]
            //   },
            //   '2022-12-17': {
            //     periods: [
            //       {startingDay: false, endingDay: false, color: 'cyan'},
            //       {color: 'transparent'},
            //       {startingDay: false, endingDay: false, color: '#f0e68c'}
            //     ]
            //   },
            //   '2022-12-18': {
            //     periods: [
            //       {startingDay: false, endingDay: false, color: 'cyan'},
            //       {color: 'transparent'},
            //       {startingDay: false, endingDay: false, color: '#f0e68c'}
            //     ]
            //   },
            //   '2022-12-19': {
            //     periods: [
            //       {startingDay: false, endingDay: true, color: 'cyan'},
            //       {color: 'transparent'},
            //       {startingDay: false, endingDay: true, color: '#f0e68c'}
            //     ]
            //   },
            // }}
            // Initially visible month. Default = now
            initialDate={state.date}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // minDate={'2012-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // maxDate={'2023-05-30'}
            // Handler which gets executed on day press. Default = undefined
            // onDayPress={day => {
            //   console.log('selected day', day);
            //
            //   this.setState({
            //     date: day.dateString,
            //   });
            // }}
            // Handler which gets executed on day long press. Default = undefined
            // onDayLongPress={day => {
            //   console.log('selected day', day);
            // }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            // monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            // onMonthChange={month => {
            //   console.log('month changed', month);
            // }}
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
        )}
      </Translation>
    );
  };

  render() {
    const { props, state } = this;

    if (props.hidden) {
      return null;
    }

    let children = this.renderCalendar();

    const isYearMonthMode = state.mode === 'year' || state.mode === 'month';

    if (isYearMonthMode) {
      children = this.renderYearMonthList();
    }

    return (
      <Translation>
        {(t) => (
          <TouchableWithoutFeedback>
            <View>
              {children}
            </View>
          </TouchableWithoutFeedback>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.general.black,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.colors.text.subtitle,
  },
  yearMonthText: {
    // backgroundColor: '#0ff',
    color: Theme.colors.general.white,
    fontSize: 15,
    letterSpacing: 1,
  },
  headerText: {
    // backgroundColor: '#0ff',
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    letterSpacing: 1,
  },
  dayComponentContainer: {
    // backgroundColor: '#0f0',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  dayTextContainer: {
    // backgroundColor: '#f0f',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayPeriodContainer: {
    // backgroundColor: '#f0f',
    alignSelf: 'stretch',
  },
  period: {
    flex: 1,
    height: 2,
    marginVertical: 4,
  },
});

Calendar.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  theme: PropTypes.object,
  hidden: PropTypes.bool,
  disableSelection: PropTypes.bool,
  onDayPress: PropTypes.func,
};

Calendar.defaultProps = {
  onLayout: undefined,
  style: undefined,
  theme: {
    backgroundColor: Theme.colors.general.black,
    calendarBackground: Theme.colors.general.black,
    textSectionTitleColor: Theme.colors.text.subtitle,
    // textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: Theme.colors.text.subtitle,
    selectedDayTextColor: Theme.colors.general.white,
    todayTextColor: Theme.colors.background.secondary,
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
    textDayFontSize: 14,
    textMonthFontSize: 14,
    textDayHeaderFontSize: 12,
  },
  hidden: false,
  disableSelection: false,
  onDayPress: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
