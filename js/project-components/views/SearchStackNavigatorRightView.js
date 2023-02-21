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

class SearchStackNavigatorRightView extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    const source = props.searchResultListType === 'grid' ? ic_list : ic_grid;

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
              source={source}
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
              source={ic_check}
              resizeMode="center"
              onPress={() => {
                let selected = true;

                if (store.getState().searchResultViewReducer.searchResultListData.length > 0) {
                  selected = !store.getState().searchResultViewReducer.searchResultListData[0].selected;
                }

                store.getState().searchResultViewReducer.searchResultListData.forEach((item) => {
                  if (item.selected) {
                    selected = false;
                  }
                });


                const data = store.getState().searchResultViewReducer.searchResultListData.map((item) => {
                  return {
                    ...item,
                    selected: selected,
                  }
                });

                props.setSearchResultViewSearchResultListData(data);
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchResultListType: (...args) => dispatch(SearchStackNavigatorRightViewAction.setSearchResultListType(...args)),
    setSearchResultViewSearchResultListData: (...args) => dispatch(SearchResultViewAction.setSearchResultListData(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStackNavigatorRightView);
