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
import { ProfileNameEditionViewAction, MainTabNavigatorAction } from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  SingleTouch,
  Image,
} from '../../components';

import {
  Button,
  Separator,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class ProfileNameEditionView extends BaseComponent {
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

  // renderProfileCastingSheetList = (params) => {
  //   const { props } = this;
  //   const { item, index, section, separators } = params;
  //
  //   return (
  //     <Translation>
  //       {(t) => (
  //         <ProfileCastingSheetList
  //           data={[
  //             {
  //               title: 'Basic Information',
  //               data: [
  //                 {
  //                   title: 'Gender',
  //                   data: [
  //                     'Male',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Age',
  //                   data: [
  //                     '34, 21.10.1987',
  //                     'born in Hong Kong',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Occupation',
  //                   data: [
  //                     'Screenwriter',
  //                     'Director',
  //                     'Editor',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Skills',
  //                   data: [
  //                     'Cooking',
  //                     'Swimming',
  //                     'Photography',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Year Active',
  //                   data: [
  //                     '2012-present (10 years)',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Working Base',
  //                   data: [
  //                     'Hong Kong',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Awards',
  //                   data: [
  //                     '-',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Nationality',
  //                   data: [
  //                     'Hong Kong',
  //                   ],
  //                 },
  //               ],
  //             },
  //             {
  //               title: 'Appearance',
  //               data: [
  //                 {
  //                   title: 'Height',
  //                   data: [
  //                     '5’5 (166cm)',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Weight',
  //                   data: [
  //                     '123 lbs (56kg)',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Hair',
  //                   data: [
  //                     'Black',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Eyes',
  //                   data: [
  //                     'Brown',
  //                   ],
  //                 },
  //               ],
  //             },
  //             {
  //               title: 'Experience',
  //               data: [
  //                 {
  //                   title: 'Movies',
  //                   data: [
  //                     '5',
  //                   ],
  //                 },
  //                 {
  //                   title: 'TV Shows',
  //                   data: [
  //                     '6',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Commercials',
  //                   data: [
  //                     '2',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Music Videos',
  //                   data: [
  //                     '6',
  //                   ],
  //                 },
  //               ],
  //             },
  //             {
  //               title: 'Contacts',
  //               data: [
  //                 {
  //                   title: 'Address',
  //                   data: [
  //                     '-',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Email',
  //                   data: [
  //                     '-',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Phone',
  //                   data: [
  //                     '-',
  //                   ],
  //                 },
  //                 {
  //                   title: 'Agent/MGR',
  //                   data: [
  //                     '-',
  //                   ],
  //                 },
  //               ],
  //             },
  //           ]}
  //           onPressCalendar={this.onPressCalendar}
  //           onPressFollow={this.onPressFollow}
  //           onPressLike={this.onPressLike}
  //           onPressBookmark={this.onPressBookmark}
  //           onPressViewMoreText={this.onPressViewMoreText}
  //           onEndReached={this.onEndReached}
  //         />
  //       )}
  //     </Translation>
  //   );
  // };
  //
  // renderItem = (params) => {
  //   const { props } = this;
  //   const { item, index, section, separators } = params;
  //
  //   switch (section.index) {
  //     case 0:
  //       return this.renderProfileInfoCard(params);
  //
  //     case 1:
  //       return this.renderSegmentedControl(params);
  //
  //     case 2:
  //       return this.renderProfileCastingSheetList(params);
  //
  //     default:
  //       break;
  //   }
  // };

  renderSelectionButtons = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Button
              style={styles.selectionButton}
              source={preview}
              text={t('Camera')}
              onPress={() => {
                Router.push(props, 'ProfileNameDisplaySelectionView');
              }}
            />
            <Button
              style={styles.selectionButton}
              source={preview}
              text={t('Photos')}
              onPress={() => {
                Router.push(props, 'ProfileNameDisplaySelectionView');
              }}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderBody = () => {
    const { props } = this;

    // let sections = [
    //   {
    //     title: i18n.t(''),
    //     data: [''],
    //   },
    //   {
    //     title: i18n.t(''),
    //     data: [''],
    //   },
    //   {
    //     title: i18n.t(''),
    //     data: [''],
    //   },
    // ];

    return (
      <Translation>
        {(t) => (
          <Body style={styles.body}>
            <View
              style={{
                backgroundColor: '#f00',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  backgroundColor: '#00f',
                  color: '#fff',
                  fontSize: 36,
                }}
              >
                {t('Hello 3!')}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#ff0',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  backgroundColor: '#00f',
                  color: '#fff',
                  fontSize: 17,
                  textTransform: 'uppercase',
                }}
              >
                {t('Select Your Role.')}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#ff0',
                alignItems: 'center',
                marginTop: 64,
              }}
            >
              <Text
                style={{
                  backgroundColor: '#00f',
                  color: '#fff',
                  fontSize: 17,
                  textTransform: 'uppercase',
                }}
              >
                {t('Choose From')}
              </Text>
            </View>

          {this.renderSelectionButtons()}

          {
            /*
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
            */
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
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Root
            style={styles.root}
            safeArea={false}
            resizeMode="stretch"
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
    // justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 16,
  },
  image: {
    // backgroundColor: '#0f0',
    width: 40,
    height: 40,
  },
  selectionButton: {
    marginTop: 16,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNameEditionView);
