/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, Dimensions, View, Text } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { Image, SimpleList, SingleTouch, ViewMoreText } from '../../components';

import { Button, Separator } from '../../project-components';

import { Theme } from '../../utils';

import { UserProcessor } from '../../processors';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

const ic_placeholder = require('../../../assets/images/ic_placeholder/ic_placeholder.png');

const ic_list_unselected = require('../../../assets/images/ic_list_unselected/ic_list_unselected.png');
const ic_list_selected = require('../../../assets/images/ic_list_selected/ic_list_selected.png');

class SearchResultList extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderProfileImageIfNeeded = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    let source = preview;

    let image = item && item.profile && item.profile.image;

    if (image) {
      const { uri} = image;

      if (uri) {
        source = { uri: uri };
      }
    }

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            onPress={() => {
              if (!props.onPressProfile) {
                return;
              }

              props.onPressProfile(params);
            }}
            disabled
          >
            <Image
              style={styles.listAvatarImage}
              source={source}
              resizeMode={"contain"}
            />
          </SingleTouch>
        )}
      </Translation>
    );
  };

  renderListTopContainer = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    // console.log('[item]', item);

    return (
      <Translation>
        {(t) => (
          <View style={styles.listTopContainer}>
            {this.renderProfileImageIfNeeded(params)}
            <View style={styles.profileInfoContainer}>
              <Text style={styles.nameLabel}>
                {UserProcessor.toName(item)}
              </Text>
              <Text style={styles.titleLabel}>
                {item && item.profile && item.profile.title}
              </Text>
            </View>
            <Button
              style={styles.selectionButtonContainer}
              buttonStyle={styles.selectionButton}
              imageStyle={styles.selectionImage}
              type="small"
              source={item.selected ? ic_list_selected : ic_list_unselected}
              resizeMode="center"
              onPress={() => {
                if (!props.onPressSelection) {
                  return;
                }

                props.onPressSelection(params);
              }}
              disabled={!props.searchStackNavigatorRightViewEditModeEnabled}
              feedbackDisabled
            />
          </View>
        )}
      </Translation>
    );
  };

  renderGridTopContainer = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    // console.log('[item]', item);

    let source = preview;

    let image = item && item.profile && item.profile.image;

    if (image) {
      const { uri} = image;

      if (uri) {
        source = { uri: uri };
      }
    }

    let style = {};

    if (item.selected) {
      style = {
        ...style,
        borderWidth: 4,
        borderColor: Theme.colors.borders.green,
      };
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.gridTopContainer}>
            <View style={[styles.gridAvatarImageContainer, style]}>
              <Image
                style={styles.gridAvatarImage}
                source={source}
                resizeMode="contain"
              />
            </View>
          </View>
        )}
      </Translation>
    );
  };

  renderImageListItem = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    // console.log('[item]', item);

    let image = item && item.image;

    if (!image) {
      return;
    }

    const { uri, width, height} = image;

    if (!uri || !width || !height) {
      return;
    }

    let style = {
      width: 80 * width / height,
      height: 80,
    };

    return (
      <Translation>
        {(t) => (
          <Image
            style={[styles.image, style]}
            source={{ uri: uri }}
            resizeMode={"contain"}
          />
        )}
      </Translation>
    );
  };

  renderImageListItemSeparatorComponent = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Separator
            style={styles.imageListSeparator}
            lineStyle={styles.imageListSeparatorLine}
          />
        )}
      </Translation>
    );
  };

  renderNoPosts = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.noPostsContainer}>
            <Image
              style={styles.noPostsImage}
              source={ic_placeholder}
              resizeMode="center"
            />
            <Text style={styles.noPostsText}>
              {t('app.no_post_yet')}
            </Text>
          </View>
        )}
      </Translation>
    );
  }

  renderImageList = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    let data = item && item.posts;

    if (!data || data.length === 0) {
      return this.renderNoPosts(params);
    }

    data = data.filter((item, index) => {
      let image = item && item.image;

      if (!image) {
        return false;
      }

      const { uri, width, height} = image;

      if (!uri || !width || !height) {
        return false;
      }

      return true;
    });

    return (
      <Translation>
        {(t) => (
          <SimpleList
            contentContainerStyle={styles.imageListContentContainer}
            data={data}
            renderItem={this.renderImageListItem}
            ItemSeparatorComponent={this.renderImageListItemSeparatorComponent}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </Translation>
    );
  };

  renderListCenterContainer = (params) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.listCenterContainer}>
            {this.renderImageList(params)}
          </View>
        )}
      </Translation>
    );
  };

  renderInfoContainer = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>
                {UserProcessor.toName(item)}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.occupation}>
                {item && item.profile && item.profile.title}
              </Text>
            </View>
          </View>
        )}
      </Translation>
    );
  };

  renderGridCenterContainer = (params) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.gridCenterContainer}>
            {this.renderInfoContainer(params)}
          </View>
        )}
      </Translation>
    );
  };

  renderItem = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    let style = {};

    let topChildren = this.renderListTopContainer(params);
    let centerChildren = this.renderListCenterContainer(params);

    let disabled = true;

    // if (index % 2 == 0) {
    //   style = {
    //     ...style,
    //     backgroundColor: '#f00',
    //   };
    // } else {
    //   style = {
    //     ...style,
    //     backgroundColor: '#f0f',
    //   };
    // }

    if (
      props.type
      &&
      props.type.toLowerCase() === 'grid'.toLowerCase()
    ) {
      style = {
        ...style,
        width: Dimensions.get('window').width / 3,
      };

      topChildren = this.renderGridTopContainer(params);
      centerChildren = this.renderGridCenterContainer(params);

      disabled = !props.searchStackNavigatorRightViewEditModeEnabled;
    }

    return (
      <Translation>
        {(t) => (
          <SingleTouch
            style={[styles.itemContainer, style]}
            onPress={() => {
              if (!props.onPressSelection) {
                return;
              }

              props.onPressSelection(params);
            }}
            disabled={disabled}
            feedbackDisabled
          >
            {topChildren}
            {centerChildren}
          </SingleTouch>
        )}
      </Translation>
    );
  };

  renderItemSeparatorComponent = () => {
    const { props } = this;

    if (
      props.type
      &&
      props.type.toLowerCase() === 'grid'.toLowerCase()
    ) {
      return;
    }

    return (
      <Translation>
        {(t) => (
          <Separator
            style={styles.separator}
            lineStyle={styles.separatorLine}
          />
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    if (props.hidden) {
      return null;
    }

    let initialNumToRender = Platform.OS === 'android' ? 5 : undefined;
    let maxToRenderPerBatch = Platform.OS === 'android' ? 10 : undefined;
    let windowSize = Platform.OS === 'android' ? 10 : undefined;

    // console.log('[Platform.OS] ', Platform.OS);
    // console.log('[initialNumToRender] ', initialNumToRender);
    // console.log('[maxToRenderPerBatch] ', maxToRenderPerBatch);
    // console.log('[windowSize] ', windowSize);

    // console.log('[props.type]', props.type);

    let numColumns = undefined;

    if (
      props.type
      &&
      props.type.toLowerCase() === 'grid'.toLowerCase()
    ) {
      numColumns = 3;
    }

    return (
      <Translation>
        {(t) => (
          <SimpleList
            {...props}
            key={props.type}
            onLayout={props.onLayout}
            style={[styles.container, props.style]}
            contentContainerStyle={[
              styles.contentContainer,
              props.contentContainerStyle,
            ]}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderItemSeparatorComponent}
            numColumns={numColumns}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            initialNumToRender={initialNumToRender}
            maxToRenderPerBatch={maxToRenderPerBatch}
            windowSize={windowSize}
          />
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0ff',
  },
  contentContainer: {},
  itemContainer: {
    // backgroundColor: '#f00',
    flex: 1,
    paddingHorizontal: 16,
  },
  listTopContainer: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  gridTopContainer: {
    // backgroundColor: '#f00',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profileInfoContainer: {
    // backgroundColor: '#ff0',
    flex: 1,
    marginHorizontal: 12,
  },
  listAvatarImage: {
    // backgroundColor: '#0f0',
    width: 32,
    height: 32,
    alignSelf: 'center',
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.borders.gray,
  },
  gridAvatarImageContainer: {
    width: 108,
    height: 108,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: Theme.colors.general.transparent,
  },
  gridAvatarImage: {
    backgroundColor: Theme.colors.background.gray,
    width: 100,
    height: 100,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.borders.gray,
  },
  nameLabel: {
    // backgroundColor: '#0f0',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
    marginBottom: -5,
  },
  titleLabel: {
    // backgroundColor: '#00f',
    color: Theme.colors.text.subtitle,
    fontSize: 9,
    fontFamily: Theme.fonts.light,
  },
  selectionButtonContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    // marginRight: 10,
    marginTop: 1,
    marginBottom: 4,
  },
  selectionButton: {
    // backgroundColor: '#0ff',
    // paddingLeft: 6,
    // paddingRight: 4,
    // paddingVertical: 5,
  },
  selectionImage: {
    // backgroundColor: '#ff0',
  },
  listCenterContainer: {
    // backgroundColor: '#0f0',
  },
  imageListContentContainer: {
    paddingHorizontal: 0,
  },
  separator: {
    // backgroundColor: '#f00',
    height: 16,
  },
  separatorLine: {
    // backgroundColor: Theme.colors.general.transparent,
  },
  imageListSeparator: {
    // backgroundColor: '#00f',
    width: 8,
  },
  imageListSeparatorLine: {
    // backgroundColor: Theme.colors.general.transparent,
  },
  gridCenterContainer: {
    // backgroundColor: '#0f0',
  },
  noPostsContainer: {
    // backgroundColor: '#f00',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Theme.colors.background.secondary,
  },
  noPostsImage: {
    // backgroundColor: '#0f0',
    width: 15,
    height: 12,
  },
  noPostsText: {
    // backgroundColor: '#0ff',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    marginLeft: 8,
  },
  image: {
    // backgroundColor: '#0f0',
    borderRadius: 3,
  },
  infoContainer: {
    // backgroundColor: '#f00',
  },
  textContainer: {
    // backgroundColor: '#ff0',
    alignItems: 'center',
    borderRadius: 4,
  },
  name: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  occupation: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

SearchResultList.propTypes = {
  onLayout: PropTypes.func,
  onViewMoreTextLayout: PropTypes.func,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  type: PropTypes.string,
  onPressProfile: PropTypes.func,
  onPressSelection: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
};

SearchResultList.defaultProps = {
  onLayout: undefined,
  onViewMoreTextLayout: undefined,
  style: undefined,
  contentContainerStyle: undefined,
  hidden: false,
  type: undefined,
  onPressProfile: undefined,
  onPressSelection: undefined,
  onRefresh: undefined,
  refreshing: undefined,
};

function mapStateToProps(state) {
  return {
    searchStackNavigatorRightViewEditModeEnabled: state.searchStackNavigatorRightViewReducer.editModeEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultList);
