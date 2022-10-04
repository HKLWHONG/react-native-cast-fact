/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform, Image } from 'react-native';

import { connect } from 'react-redux';
import {
  AppAction,
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

  initialize = async () => {
    const { props } = this;

    props.selectDrawer(0);
    props.selectTab(0);

    props.setCriteriaTags([
      {
        groupFrameId: '0',
        data: [
          {
            tagId: '0',
            text: 'Male',
            rightAccessoryType: 'delete',
          },
          {
            tagId: '1',
            text: 'Blue Eye',
            dotColor: Theme.colors.dot.blue,
            leftAccessoryType: 'dot',
            rightAccessoryType: 'delete',
          },
        ]
      },
    ]);

    props.setRecentSearchesTags([
      {
        groupFrameId: '0',
        data: [
          {
            tagId: '0',
            text: 'Muscular',
          },
          {
            tagId: '1',
            text: 'Black Hair',
            dotColor: Theme.colors.dot.black,
            leftAccessoryType: 'dot',
          },
        ]
      },
      {
        groupFrameId: '1',
        data: [
          {
            tagId: '0',
            text: 'Female',
          },
          {
            tagId: '1',
            text: 'Red Eye',
            dotColor: Theme.colors.dot.red,
            leftAccessoryType: 'dot',
          },
          {
            tagId: '2',
            text: '~165CM',
          },
          {
            tagId: '3',
            text: 'Film',
          },
          {
            tagId: '4',
            text: 'Korean',
          },
        ],
      },
    ]);

    props.setFindTalentTags([
      {
        groupFrameId: '0',
        label: 'Gender',
        data: [
          {
            tagId: '0',
            text: 'Female',
          },
          {
            tagId: '1',
            text: 'Gender-Noconforming',
          },
          {
            tagId: '2',
            text: 'Non-Binary',
          },
          {
            tagId: '3',
            text: 'Trans Female',
          },
          {
            tagId: '4',
            text: 'Agender',
          },
          {
            tagId: '5',
            text: 'Androgyne',
          },
        ]
      },
      {
        groupFrameId: '1',
        label: 'Ethnicities',
        data: [
          {
            tagId: '0',
            text: 'Option A',
          },
          {
            tagId: '1',
            text: 'Option B',
          },
          {
            tagId: '2',
            text: 'Option C',
          },
          {
            tagId: '3',
            text: 'Option D',
          },
          {
            tagId: '4',
            text: 'Option E',
          },
          {
            tagId: '5',
            text: 'Option F',
          },
        ],
      },
      {
        groupFrameId: '2',
        label: 'Body Type',
        data: [
          {
            tagId: '0',
            text: 'Option A',
          },
          {
            tagId: '1',
            text: 'Option B',
          },
          {
            tagId: '2',
            text: 'Option C',
          },
          {
            tagId: '3',
            text: 'Option D',
          },
          {
            tagId: '4',
            text: 'Option E',
          },
          {
            tagId: '5',
            text: 'Option F',
          },
        ],
      },
      {
        groupFrameId: '3',
        label: 'Eye Color',
        data: [
          {
            tagId: '0',
            text: 'Amber',
            dotColor: Theme.colors.dot.amber,
            leftAccessoryType: 'dot',
          },
          {
            tagId: '1',
            text: 'Brown',
            dotColor: Theme.colors.dot.brown,
            leftAccessoryType: 'dot',
          },
          {
            tagId: '2',
            text: 'Gray',
            dotColor: Theme.colors.dot.gray,
            leftAccessoryType: 'dot',
          },
          {
            tagId: '3',
            text: 'Green',
            dotColor: Theme.colors.dot.green,
            leftAccessoryType: 'dot',
          },
          {
            tagId: '4',
            text: 'Hazel',
            dotColor: Theme.colors.dot.hazel,
            leftAccessoryType: 'dot',
          },
          {
            tagId: '5',
            text: 'Red',
            dotColor: Theme.colors.dot.red,
            leftAccessoryType: 'dot',
          },
        ],
      },
      {
        groupFrameId: '4',
        label: 'Height',
        rightAccessoryType: 'check',
        checked: 'false',
        data: [
          {
            tagId: '0',
            type: 'input',
            value: '170',
            text: 'CM',
            maxLength: '3',
            regex: '[1-9][0-9]{0,2}',
            keyboardType: "number-pad",
          },
          {
            tagId: '1',
            text: 'Deviation',
            leftAccessoryType: 'check',
            checked: 'false',
          },
        ],
      },
      {
        groupFrameId: '5',
        label: 'Age',
        rightAccessoryType: 'check',
        checked: 'false',
        data: [
          {
            tagId: '0',
            type: 'range',
            fromValue: '18',
            toValue: '25',
            regexOfFromValue: '[1-9][0-9]{0,1}',
            regexOfToValue: '[1-9][0-9]{0,1}',
            maxLengthOfFromValue: '2',
            maxLengthOfToValue: '2',
          },
        ],
      },
    ]);

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
    setCriteriaTags: (...args) => dispatch(CriteriaSectionAction.setTags(...args)),
    setRecentSearchesTags: (...args) => dispatch(RecentSearchesSectionAction.setTags(...args)),
    setFindTalentTags: (...args) => dispatch(FindTalentSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchView);
