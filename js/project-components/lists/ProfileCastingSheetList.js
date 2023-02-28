/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';
import {
  store,
  ProfileCastingSheetListAction,
} from '../../redux';

import {
  SimpleList,
} from '../../components';

import {
  Separator,
} from '../../project-components';

import { Theme } from '../../utils';

import { } from '../../processors';

import { } from '../../providers';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class ProfileCastingSheetList extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderItem = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    console.log('[item]', item.data.length);

    let children = (
      Array(item.data.length)
        .fill()
        .map((_, i) => i)
        .map((i) => {
          let data = item.data[i];

          let contents = (
            Array(data.data.length)
              .fill()
              .map((_, t) => t)
              .map((t) => {
                let content = data.data[t];

                return (
                  <Text
                    key={t.toString()}
                    style={{
                      // backgroundColor: '#f00',
                      color: Theme.colors.general.white,
                      fontSize: 15,
                      fontFamily: Theme.fonts.bold,
                      letterSpacing: 5,
                      textTransform: 'uppercase',
                    }}
                  >
                    {content}
                  </Text>
                );
              })
          );

          return (
            <View
              key={i.toString()}
              style={{
                // backgroundColor: i % 2 == 0 ? '#f0f' : '#0ff',
                flexDirection: 'row',
                marginVertical: 4,
              }}
            >
              <View
                style={{
                  // backgroundColor: '#f00',
                  flex: 2,
                  alignItems: 'flex-end',
                  marginRight: 4,
                }}
              >
                <Text
                  style={{
                    // backgroundColor: '#0ff',
                    color: Theme.colors.text.subtitle,
                    fontSize: 15,
                    fontFamily: Theme.fonts.light,
                    textTransform: 'uppercase',
                  }}
                >
                  {data.title}
                </Text>
              </View>
              <View
                style={{
                  // backgroundColor: '#0f0',
                  flex: 3,
                  marginLeft: 4,
                }}
              >
                {contents}
              </View>
            </View>
          );
        })
    );

    return (
      <Translation>
        {(t) => (
          <View style={styles.itemContainer}>
            <View
              style={{
                // backgroundColor: '#00f',
                alignItems: 'center',
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  // backgroundColor: '#f00',
                  color: Theme.colors.general.white,
                  fontSize: 15,
                  fontFamily: Theme.fonts.bold,
                  letterSpacing: 5,
                  textTransform: 'uppercase',
                }}
              >
                {item.title}
              </Text>
            </View>
            {children}
          </View>
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
          />
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ff0',
  },
  separator: {
    // backgroundColor: '#f00',
    marginTop: 8,
    marginBottom: 4,
  },
});

ProfileCastingSheetList.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  hidden: PropTypes.bool,
};

ProfileCastingSheetList.defaultProps = {
  onLayout: undefined,
  style: undefined,
  hidden: false,
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(ProfileCastingSheetListAction.reset(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCastingSheetList);
