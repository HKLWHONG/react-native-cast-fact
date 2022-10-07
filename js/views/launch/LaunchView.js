/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform, Image } from 'react-native';

import { connect } from 'react-redux';
import {
  AppAction,
  DataAction,
  DrawerAction,
  LaunchAction,
  MainTabAction,
  CriteriaSectionAction,
  RecentSearchesSectionAction,
  FindTalentSectionAction,
} from '../../redux';

import { StackActions } from '@react-navigation/native';

import { BaseComponent, Root, Header, Body, Footer } from '../../components';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { Theme, Router } from '../../utils';

const ic_splash_screen_bg = require('../../../assets/images/ic_splash_screen_bg/ic_splash_screen_bg.png');

class LaunchView extends BaseComponent {
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

    props.selectDrawer(0);
    props.selectTab(0);

    props.setDummyData([
      {
        label: 'profile',
        data: [
          {
            profileId: '0',
            profileUri: 'https://kcplace.com/preview.png',
            feedUri: 'https://kcplace.com/preview.png',
            name: 'Neo 游學修',
            title: 'Artist',
            tags: [
              {
                tagId: '0',
                text: 'Male',
              },
              {
                tagId: '1',
                text: 'Chinese',
              },
              {
                tagId: '2',
                text: 'Cantonese',
              },
              {
                tagId: '3',
                text: 'English',
              },
              {
                tagId: '4',
                text: 'Black Eye',
              },
              {
                tagId: '4',
                text: 'Black Eye',
              },
              {
                tagId: '5',
                text: '175 CM',
              },
              {
                tagId: '6',
                text: '32 Age',
              },
            ],
          },
          {
            profileId: '1',
            profileUri: 'https://kcplace.com/preview.png',
            feedUri: 'https://kcplace.com/preview.png',
            name: 'Kaki 岑珈琪',
            title: 'Artist',
            tags: [
              {
                tagId: '0',
                text: 'Male',
              },
              {
                tagId: '1',
                text: 'Chinese',
              },
              {
                tagId: '2',
                text: 'Cantonese',
              },
              {
                tagId: '3',
                text: 'English',
              },
              {
                tagId: '4',
                text: 'Black Eye',
              },
              {
                tagId: '5',
                text: '175 CM',
              },
              {
                tagId: '6',
                text: '32 Age',
              },
            ],
          },
          {
            profileId: '2',
            profileUri: 'https://kcplace.com/preview.png',
            feedUri: 'https://kcplace.com/preview.png',
            name: 'Kay 謝安琪',
            title: 'Artist',
            tags: [
              {
                tagId: '0',
                text: 'Female',
              },
              {
                tagId: '1',
                text: 'Chinese',
              },
              {
                tagId: '2',
                text: 'Cantonese',
              },
              {
                tagId: '3',
                text: 'English',
              },
              {
                tagId: '4',
                text: 'Black Eye',
              },
              {
                tagId: '5',
                text: '170 CM',
              },
              {
                tagId: '6',
                text: '45 Age',
              },
            ],
          },
          {
            profileId: '3',
            profileUri: 'https://kcplace.com/preview.png',
            feedUri: 'https://kcplace.com/preview.png',
            name: 'Tony C',
            title: 'Director',
            tags: [
              {
                tagId: '0',
                text: 'Male',
              },
              {
                tagId: '1',
                text: 'Chinese',
              },
              {
                tagId: '2',
                text: 'English',
              },
              {
                tagId: '3',
                text: 'Japanese',
              },
              {
                tagId: '4',
                text: 'Brown Eye',
              },
              {
                tagId: '5',
                text: '175 CM',
              },
              {
                tagId: '6',
                text: '25 Age',
              },
            ],
          },
          {
            profileId: '4',
            profileUri: 'https://kcplace.com/preview.png',
            feedUri: 'https://kcplace.com/preview.png',
            name: 'Peter',
            title: 'Camera Man',
            tags: [
              {
                tagId: '0',
                text: 'Male',
              },
              {
                tagId: '1',
                text: 'Chinese',
              },
              {
                tagId: '2',
                text: 'English',
              },
              {
                tagId: '3',
                text: 'Korean',
              },
              {
                tagId: '4',
                text: 'Blue Eye',
              },
              {
                tagId: '5',
                text: '175 CM',
              },
              {
                tagId: '6',
                text: '30 Age',
              },
            ],
          },
          {
            profileId: '5',
            profileUri: 'https://kcplace.com/preview.png',
            feedUri: 'https://kcplace.com/preview.png',
            name: 'Leon',
            title: 'Screen Writer',
            tags: [
              {
                tagId: '0',
                text: 'Male',
              },
              {
                tagId: '1',
                text: 'Chinese',
              },
              {
                tagId: '2',
                text: 'English',
              },
              {
                tagId: '3',
                text: 'Mandarin',
              },
              {
                tagId: '4',
                text: 'Gray Eye',
              },
              {
                tagId: '5',
                text: '175 CM',
              },
              {
                tagId: '6',
                text: '25 Age',
              },
            ],
          },
          {
            profileId: '6',
            profileUri: 'https://kcplace.com/preview.png',
            feedUri: 'https://kcplace.com/preview.png',
            name: 'Ronald 鄭中基',
            title: 'Artist',
            tags: [
              {
                tagId: '0',
                text: 'Male',
              },
              {
                tagId: '1',
                text: 'Chinese',
              },
              {
                tagId: '2',
                text: 'Cantonese',
              },
              {
                tagId: '3',
                text: 'English',
              },
              {
                tagId: '4',
                text: 'Mandarin',
              },
              {
                tagId: '5',
                text: 'Black Eye',
              },
              {
                tagId: '6',
                text: '175 CM',
              },
              {
                tagId: '7',
                text: '50 Age',
              },
            ],
          },
        ],
      },
      {
        label: 'tags',
        data: [
          {
            label: 'Languages',
            data: [
              {
                text: 'Cantonese',
              },
              {
                text: 'Czech',
              },
              {
                text: 'English',
              },
              {
                text: 'Filipino',
              },
              {
                text: 'French',
              },
              {
                text: 'German',
              },
              {
                text: 'Japanese',
              },
              {
                text: 'Korean',
              },
              {
                text: 'Malay',
              },
              {
                text: 'Putonghua',
              },
              {
                text: 'Shanghainese',
              },
              {
                text: 'Taiwanese Hokkien',
              },
              {
                text: 'Thai',
              },
            ],
          },
          {
            label: 'Occupation',
            data: [
              {
                text: 'Actor',
              },
              {
                text: 'Actress',
              },
              {
                text: 'Arranger',
              },
              {
                text: 'Artist',
              },
              {
                text: 'Choreographer',
              },
              {
                text: 'Cinematographer',
              },
              {
                text: 'Composer',
              },
              {
                text: 'DJ',
              },
              {
                text: 'Dancer',
              },
              {
                text: 'Director',
              },
              {
                text: 'Fashion Designer',
              },
              {
                text: 'Film Producer',
              },
              {
                text: 'Host',
              },
              {
                text: 'Illustrator',
              },
              {
                text: 'Journalist',
              },
              {
                text: 'KOL',
              },
              {
                text: 'Lyricist',
              },
              {
                text: 'Model',
              },
              {
                text: 'Narrator',
              },
              {
                text: 'Photographer',
              },
              {
                text: 'Producer',
              },
              {
                text: 'Production Designer',
              },
              {
                text: 'Singer',
              },
              {
                text: 'Video Editor',
              },
              {
                text: 'Writer',
              },
              {
                text: 'YouTuber',
              },
            ],
          },
          {
            label: 'Gender',
            data: [
              {
                text: 'Agender',
              },
              {
                text: 'Androgyne',
              },
              {
                text: 'Female',
              },
              {
                text: 'Gender-Noconforming',
              },
              {
                text: 'Male',
              },
              {
                text: 'Non-Binary',
              },
              {
                text: 'Trans Female',
              },
              {
                text: 'Trans Male',
              },
            ],
          },
          {
            label: 'Eye Color',
            data: [
              {
                text: 'Albino',
                dotColor: '#d5898c',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Black',
                dotColor: '#393b41',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Blind',
                dotColor: '#b2cdd8',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Blue',
                dotColor: '#075e9b',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Brown',
                dotColor: '#8a3919',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Dark Brown',
                dotColor: '#552531',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Gold',
                dotColor: '#e3b551',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Green',
                dotColor: '#1c7e41',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Orange',
                dotColor: '#e76732',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Purple',
                dotColor: '#5e3697',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Red',
                dotColor: '#a92332',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Teal',
                dotColor: '#1d8e95',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'White',
                dotColor: '#cdcbd2',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
            ],
          },
          {
            label: 'Hair Color',
            data: [
              {
                text: 'Ash blonde',
                dotColor: '#c1b2a2',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Black',
                dotColor: '#393b41',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Brown',
                dotColor: '#8a3919',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Dark Brown',
                dotColor: '#552531',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Dark Blonde',
                dotColor: '#5f4338',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Gold',
                dotColor: '#e3b551',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Light Blonde',
                dotColor: '#b79572',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Light Brown',
                dotColor: '#997658',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Lightest Yellow',
                dotColor: '#ffe69f',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Pink',
                dotColor: '#da475e',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Red',
                dotColor: '#a92332',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
            ],
          },
          {
            label: 'Skin Color',
            data: [
              {
                text: 'Beige',
                dotColor: '#f2c280',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Bronze',
                dotColor: '#733e17',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Honey',
                dotColor: '#ce965e',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Ivory',
                dotColor: '#fee3bf',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Pale Ivory',
                dotColor: '#f7ddc4',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Sand',
                dotColor: '#f8d998',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Warm Ivory',
                dotColor: '#f8e7c9',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
            ],
          },
          {
            label: 'Body Type',
            data: [
              {
                text: 'Apple',
              },
              {
                text: 'Athletic',
              },
              {
                text: 'Average',
              },
              {
                text: 'Heavy',
              },
              {
                text: 'Hourglass',
              },
              {
                text: 'Inverted Triangle',
              },
              {
                text: 'Lean',
              },
              {
                text: 'Muscular',
              },
              {
                text: 'Pear',
              },
              {
                text: 'Rectangle',
              },
              {
                text: 'Thin',
              },
            ],
          },
          {
            label: 'Nationality',
            data: [
              {
                text: 'Australia',
              },
              {
                text: 'British National (Overseas)',
              },
              {
                text: 'Canada',
              },
              {
                text: 'China',
              },
              {
                text: 'Hong Kong',
              },
              {
                text: 'Indonesia',
              },
              {
                text: 'Macau',
              },
              {
                text: 'Malaysia',
              },
              {
                text: 'New Zealand',
              },
              {
                text: 'Philippines',
              },
              {
                text: 'Portugal',
              },
              {
                text: 'Spain',
              },
              {
                text: 'Taiwan',
              },
              {
                text: 'United Kingdom',
              },
              {
                text: 'United States',
              },
            ],
          },
        ].map((groupFrame, groupFrameId) => {
          return {
            groupFrameId: groupFrameId.toString(),
            label: groupFrame.label,
            data: groupFrame.data.map((tag, tagId) => {
              return {
                ...tag,
                tagId: tagId.toString(),
              };
            }),
          };
        })
      },
    ]);

    // props.setCriteriaTags([
    //   {
    //     groupFrameId: '0',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Male',
    //         rightAccessoryType: 'delete',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Blue Eye',
    //         dotColor: Theme.colors.dot.blue,
    //         leftAccessoryType: 'dot',
    //         rightAccessoryType: 'delete',
    //       },
    //     ]
    //   },
    // ]);

    // props.setRecentSearchesTags([
    //   {
    //     groupFrameId: '0',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Muscular',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Black Hair',
    //         dotColor: Theme.colors.dot.black,
    //         leftAccessoryType: 'dot',
    //       },
    //     ]
    //   },
    //   {
    //     groupFrameId: '1',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Female',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Red Eye',
    //         dotColor: Theme.colors.dot.red,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '2',
    //         text: '~165CM',
    //       },
    //       {
    //         tagId: '3',
    //         text: 'Film',
    //       },
    //       {
    //         tagId: '4',
    //         text: 'Korean',
    //       },
    //     ],
    //   },
    // ]);

    // props.setFindTalentTags([
    //   {
    //     groupFrameId: '0',
    //     label: 'Gender',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Female',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Gender-Noconforming',
    //       },
    //       {
    //         tagId: '2',
    //         text: 'Non-Binary',
    //       },
    //       {
    //         tagId: '3',
    //         text: 'Trans Female',
    //       },
    //       {
    //         tagId: '4',
    //         text: 'Agender',
    //       },
    //       {
    //         tagId: '5',
    //         text: 'Androgyne',
    //       },
    //     ]
    //   },
    //   {
    //     groupFrameId: '1',
    //     label: 'Language',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Chinese',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'English',
    //       },
    //       {
    //         tagId: '2',
    //         text: 'Cantonese',
    //       },
    //       {
    //         tagId: '3',
    //         text: 'Mandarin',
    //       },
    //       {
    //         tagId: '4',
    //         text: 'Korean',
    //       },
    //       {
    //         tagId: '5',
    //         text: 'Japanese',
    //       },
    //     ],
    //   },
    //   {
    //     groupFrameId: '2',
    //     label: 'Eye Color',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Amber',
    //         dotColor: Theme.colors.dot.amber,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Black',
    //         dotColor: Theme.colors.dot.black,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '2',
    //         text: 'Blue',
    //         dotColor: Theme.colors.dot.blue,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '3',
    //         text: 'Brown',
    //         dotColor: Theme.colors.dot.brown,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '4',
    //         text: 'Gray',
    //         dotColor: Theme.colors.dot.gray,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '5',
    //         text: 'Green',
    //         dotColor: Theme.colors.dot.green,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '6',
    //         text: 'Hazel',
    //         dotColor: Theme.colors.dot.hazel,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '7',
    //         text: 'Red',
    //         dotColor: Theme.colors.dot.red,
    //         leftAccessoryType: 'dot',
    //       },
    //     ],
    //   },
    //   {
    //     groupFrameId: '3',
    //     label: 'Height',
    //     rightAccessoryType: 'check',
    //     checked: false,
    //     data: [
    //       {
    //         tagId: '0',
    //         type: 'input',
    //         value: '170',
    //         text: 'CM',
    //         maxLength: '3',
    //         regex: '[1-9][0-9]{0,2}',
    //         keyboardType: "number-pad",
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Deviation',
    //         leftAccessoryType: 'check',
    //         checked: false,
    //       },
    //     ],
    //   },
    //   {
    //     groupFrameId: '4',
    //     label: 'Age',
    //     rightAccessoryType: 'check',
    //     checked: false,
    //     data: [
    //       {
    //         tagId: '0',
    //         type: 'range',
    //         fromValue: '18',
    //         toValue: '25',
    //         regexOfFromValue: '[1-9][0-9]{0,1}',
    //         regexOfToValue: '[1-9][0-9]{0,1}',
    //         maxLengthOfFromValue: '2',
    //         maxLengthOfToValue: '2',
    //       },
    //     ],
    //   },
    // ]);

    Router.route(props, 'Login');
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

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body style={styles.body} />
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
            source={ic_splash_screen_bg}>
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
  root: {},
  header: {},
  body: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footer: {
    // backgroundColor: 'cyan',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    selectDrawer: (...args) => dispatch(DrawerAction.select(...args)),
    selectTab: (...args) => dispatch(MainTabAction.select(...args)),
    setDummyData: (...args) => dispatch(DataAction.setDummyData(...args)),
    setCriteriaTags: (...args) => dispatch(CriteriaSectionAction.setTags(...args)),
    setRecentSearchesTags: (...args) => dispatch(RecentSearchesSectionAction.setTags(...args)),
    setFindTalentTags: (...args) => dispatch(FindTalentSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchView);
