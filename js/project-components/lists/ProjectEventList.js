/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, Dimensions, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Image, SimpleList, SingleTouch } from '../../components';

import { ProjectEventItem, Separator } from '../../project-components';

import { Theme } from '../../utils';

import { } from '../../processors';

import { Translation } from 'react-i18next';

// const ic_placeholder = require('../../../assets/images/ic_placeholder/ic_placeholder.png');
// const ic_category = require('../../../assets/images/ic_category/ic_category.png');
// const ic_calendar = require('../../../assets/images/ic_calendar/ic_calendar.png');
// const ic_calendar_plus = require('../../../assets/images/ic_calendar_plus/ic_calendar_plus.png');
// const ic_heart = require('../../../assets/images/ic_heart/ic_heart.png');
// const ic_heart_fill = require('../../../assets/images/ic_heart_fill/ic_heart_fill.png');
// const ic_bubble = require('../../../assets/images/ic_bubble/ic_bubble.png');
// const ic_star = require('../../../assets/images/ic_star/ic_star.png');
// const ic_star_fill = require('../../../assets/images/ic_star_fill/ic_star_fill.png');

class ProjectEventList extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderItem = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    return (
      <Translation>
        {(t) => (
          <ProjectEventItem style={styles.itemContainer} />
        )}
      </Translation>
    );
  };

  renderItemSeparatorComponent = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Separator lineStyle={styles.separator} />
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    // let initialNumToRender = Platform.OS === 'android' ? 5 : undefined;
    // let maxToRenderPerBatch = Platform.OS === 'android' ? 10 : undefined;
    // let windowSize = Platform.OS === 'android' ? 10 : undefined;

    // console.log('[Platform.OS] ', Platform.OS);
    // console.log('[initialNumToRender] ', initialNumToRender);
    // console.log('[maxToRenderPerBatch] ', maxToRenderPerBatch);
    // console.log('[windowSize] ', windowSize);

    return (
      <Translation>
        {(t) => (
          <SimpleList
            {...props}
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            contentContainerStyle={[
              styles.contentContainer,
              props.contentContainerStyle,
            ]}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderItemSeparatorComponent}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            // initialNumToRender={initialNumToRender}
            // maxToRenderPerBatch={maxToRenderPerBatch}
            // windowSize={windowSize}
          />
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0f0',
  },
  contentContainer: {},
  separator: {
    backgroundColor: Theme.colors.general.transparent,
    height: 16,
  },
  // separatorForImages: {
  //   backgroundColor: Theme.colors.general.transparent,
  //   width: 4,
  // },
  itemContainer: {
    // backgroundColor: '#f00',
    // height: 100,
    // alignItems: 'center',
    // marginHorizontal: 10,
  },
});

ProjectEventList.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
};

ProjectEventList.defaultProps = {
  onLayout: undefined,
  style: undefined,
  contentContainerStyle: undefined,
  hidden: false,
  onRefresh: undefined,
  refreshing: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEventList);
