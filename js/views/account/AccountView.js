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
import { AccountViewAction, MainTabNavigatorAction } from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  List,
} from '../../components';

import {
  ProfileInfoCard,
  SegmentedControl,
  ProfileCastingSheetList,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

// const background = require('../../../assets/images/project_background.png');

class AccountView extends BaseComponent {
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

  renderProfileInfoCard = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <ProfileInfoCard />
        )}
      </Translation>
    );
  };

  renderSegmentedControl = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <SegmentedControl />
        )}
      </Translation>
    );
  };

  renderProfileCastingSheetList = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <ProfileCastingSheetList
            data={[
              {
                title: 'Basic Information',
                data: [
                  {
                    title: 'Gender',
                    data: [
                      'Male',
                    ],
                  },
                  {
                    title: 'Age',
                    data: [
                      '34, 21.10.1987',
                      'born in Hong Kong',
                    ],
                  },
                  {
                    title: 'Occupation',
                    data: [
                      'Screenwriter',
                      'Director',
                      'Editor',
                    ],
                  },
                  {
                    title: 'Skills',
                    data: [
                      'Cooking',
                      'Swimming',
                      'Photography',
                    ],
                  },
                  {
                    title: 'Year Active',
                    data: [
                      '2012-present (10 years)',
                    ],
                  },
                  {
                    title: 'Working Base',
                    data: [
                      'Hong Kong',
                    ],
                  },
                  {
                    title: 'Awards',
                    data: [
                      '-',
                    ],
                  },
                  {
                    title: 'Nationality',
                    data: [
                      'Hong Kong',
                    ],
                  },
                ],
              },
              {
                title: 'Appearance',
                data: [
                  {
                    title: 'Height',
                    data: [
                      '5’5 (166cm)',
                    ],
                  },
                  {
                    title: 'Weight',
                    data: [
                      '123 lbs (56kg)',
                    ],
                  },
                  {
                    title: 'Hair',
                    data: [
                      'Black',
                    ],
                  },
                  {
                    title: 'Eyes',
                    data: [
                      'Brown',
                    ],
                  },
                ],
              },
              {
                title: 'Experience',
                data: [
                  {
                    title: 'Movies',
                    data: [
                      '5',
                    ],
                  },
                  {
                    title: 'TV Shows',
                    data: [
                      '6',
                    ],
                  },
                  {
                    title: 'Commercials',
                    data: [
                      '2',
                    ],
                  },
                  {
                    title: 'Music Videos',
                    data: [
                      '6',
                    ],
                  },
                ],
              },
              {
                title: 'Contacts',
                data: [
                  {
                    title: 'Address',
                    data: [
                      '-',
                    ],
                  },
                  {
                    title: 'Email',
                    data: [
                      '-',
                    ],
                  },
                  {
                    title: 'Phone',
                    data: [
                      '-',
                    ],
                  },
                  {
                    title: 'Agent/MGR',
                    data: [
                      '-',
                    ],
                  },
                ],
              },
            ]}
            onPressCalendar={this.onPressCalendar}
            onPressFollow={this.onPressFollow}
            onPressLike={this.onPressLike}
            onPressBookmark={this.onPressBookmark}
            onPressViewMoreText={this.onPressViewMoreText}
            onEndReached={this.onEndReached}
          />
        )}
      </Translation>
    );
  };

  renderItem = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    switch (section.index) {
      case 0:
        return this.renderProfileInfoCard(params);

      case 1:
        return this.renderSegmentedControl(params);

      case 2:
        return this.renderProfileCastingSheetList(params);

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
        title: i18n.t(''),
        data: [''],
      },
      {
        title: i18n.t(''),
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
                props.setListRef(3, props.navigation.getState().index, ref);
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
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setListRef: (...args) => dispatch(MainTabNavigatorAction.setListRef(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountView);
