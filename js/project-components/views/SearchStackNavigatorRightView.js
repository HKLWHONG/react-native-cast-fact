/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';
import {
  store,
  SearchStackNavigatorRightViewAction,
  SearchResultViewAction,
} from '../../redux';

import { } from '../../components';

import {
  Button,
} from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const ic_list = require('../../../assets/images/ic_list/ic_list.png');
const ic_grid = require('../../../assets/images/ic_grid/ic_grid.png');

const ic_check = require('../../../assets/images/ic_check/ic_check.png');
const ic_check_green = require('../../../assets/images/ic_check_green/ic_check_green.png');

class SearchStackNavigatorRightView extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { props } = this;

    this.initialize();
  }

  componentWillUnmount() {

    this.clearData();
  }

  initialize = () => {
    const { props } = this;
  };

  clearData = () => {
    const { props } = this;

    props.reset();
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    const displayModeButtonSource = props.searchResultListType === 'grid' ? ic_grid : ic_list;

    const editModeButtonSource = props.editModeEnabled ? ic_check_green : ic_check;

    return (
      <Translation>
        {(t) => (
          <View
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
          >
            <Button
              style={{ marginRight: 4 }}
              type="circle"
              source={displayModeButtonSource}
              resizeMode="center"
              onPress={() => {
                if (store.getState().searchStackNavigatorRightViewReducer.searchResultListType !== 'grid') {
                  props.setSearchResultListType('grid');
                } else {
                  props.setSearchResultListType(undefined);
                }
              }}
            />
            <Button
              style={{ marginLeft: 4 }}
              type="circle"
              source={editModeButtonSource}
              resizeMode="center"
              onPress={() => {
                props.setSearchResultListEditModeEnabled(!store.getState().searchStackNavigatorRightViewReducer.editModeEnabled);
              }}
            />
          </View>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0f0',
    flexDirection: 'row',
  },
});

SearchStackNavigatorRightView.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
};

SearchStackNavigatorRightView.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
};

function mapStateToProps(state) {
  return {
    searchResultListType: state.searchStackNavigatorRightViewReducer.searchResultListType,
    editModeEnabled: state.searchStackNavigatorRightViewReducer.editModeEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(SearchStackNavigatorRightViewAction.reset(...args)),
    setSearchResultListType: (...args) => dispatch(SearchStackNavigatorRightViewAction.setSearchResultListType(...args)),
    setSearchResultListEditModeEnabled: (...args) => dispatch(SearchStackNavigatorRightViewAction.setSearchResultListEditModeEnabled(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStackNavigatorRightView);
