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
import { SearchResultProfileViewAction } from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
} from '../../components';

import {
  ProfilePreviewView,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

export const IDENTIFIER = 'SearchResultProfileView';

class SearchResultProfileView extends BaseComponent {
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

    props.reset();
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
          <Body
            style={styles.body}
            scrollable={false}
          >
            <ProfilePreviewView
              index={props.index}
              source={props.userProfileImage}
              profile={props.userProfile}
              onPress={(index) => {
                props.setIndex(index);
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
  return {
    userProfileImage: state.searchResultProfileViewReducer.userProfileImage,
    userProfile: state.searchResultProfileViewReducer.userProfile,
    index: state.searchResultProfileViewReducer.index,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SearchResultProfileViewAction.reset(...args)),
    setIndex: (...args) => dispatch(SearchResultProfileViewAction.setIndex(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultProfileView);
