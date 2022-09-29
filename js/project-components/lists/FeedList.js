/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, View, Text, Image } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import { connect } from 'react-redux';

import { SimpleList, SingleTouch, FastImage } from '../../components';

import { Button, Separator } from '../../project-components';

import { Theme } from '../../utils';

import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class FeedList extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderTopContainer = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View
            style={styles.topContainer}>
            <FastImage
              style={styles.avatarImage}
              defaultSource={preview}
              source={{ uri: item && item.uri }}
              resizeMode={"contain"}
            />
            <View style={styles.profileInfoContainer}>
              <Text
                style={styles.nameLabel}>
                {item && item.name}
              </Text>
              <Text
                style={styles.titleLabel}>
                {item && item.title}
              </Text>
            </View>
            <Button
              style={styles.calendarButtonContainer}
              imageStyle={styles.calendarButton}
              type="small"
              source={preview} />
            <Button
              style={styles.followButtonContainer}
              textStyle={styles.followButton}
              type="small"
              text={t('app.follow')} />
          </View>
        )}
      </Translation>
    );
  };

  renderImage = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    return (
      <Translation>
        {(t) => (
          <FastImage
            style={styles.image}
            preSize={{ width: Dimensions.get('window').width }}
            defaultSource={preview}
            source={{ uri: item && item.uri }}
            resizeMode={"contain"}
          />
        )}
      </Translation>
    );
  };

  renderItemForImages = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    console.log('[item]', item);

    return (
      <Translation>
        {(t) => (
          <FastImage
            style={styles.image}
            preSize={{ height: 80 }}
            defaultSource={preview}
            source={{ uri: item && item.uri }}
            resizeMode={"contain"}
          />
        )}
      </Translation>
    );
  };

  renderItemSeparatorComponentForImages = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Separator lineStyle={styles.separatorForImages} />
        )}
      </Translation>
    );
  };

  renderImages = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    console.log('[item.uris]', item.uris);

    return (
      <Translation>
        {(t) => (
          <SimpleList
            data={item.uris}
            renderItem={this.renderItemForImages}
            ItemSeparatorComponent={this.renderItemSeparatorComponentForImages}
            horizontal
          />
        )}
      </Translation>
    );
  };

  renderCenterContainer = (params) => {
    const { props } = this;

    let children = this.renderImage(params);

    if (
      props.type
      &&
      props.type.toLowerCase() === 'simple'.toLowerCase()
    ) {
      children = this.renderImages(params);
    }

    return (
      <Translation>
        {(t) => (
          <View
            style={styles.centerContainer}>
            {children}
          </View>
        )}
      </Translation>
    );
  };

  renderBottomContainer = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    if (
      props.type
      &&
      props.type.toLowerCase() === 'simple'.toLowerCase()
    ) {
      return;
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.bottomContainer}>
            <View
              style={styles.topBottomContainer}>
              <Button
                style={styles.likeButton}
                imageStyle={styles.likeButtonImage}
                type="small"
                source={preview} />
              <Text
                style={styles.likeText}>
                {'279 LIKES'}
              </Text>
              <Button
                style={styles.messageButton}
                imageStyle={styles.messageButtonImage}
                type="small"
                source={preview} />
              <Button
                style={styles.bookmarkButton}
                imageStyle={styles.bookmarkButtonImage}
                type="small"
                source={preview} />
            </View>
            <View
              style={styles.centerBottomContainer}>
              <Text
                style={styles.text}>
                {'其實男女都應該在愛情上得到相等的愛。'}
              </Text>
            </View>
            <View style={styles.bottomBottomContainer}>
              <View style={styles.infoContainer}>
                <Image
                  style={styles.categoryImage}
                  source={preview}
                  resizeMode="contain"
                />
                <Text style={styles.categoryText}>
                  {'MV'}
                </Text>
              </View>
              <View style={styles.scheduleContainer}>
                <Image
                  style={styles.scheduleImage}
                  source={preview}
                  resizeMode="contain"
                />
                <Text style={styles.scheduleText}>
                  {'18 June 2022, 2 days'}
                </Text>
              </View>
            </View>
            <View style={styles.publishTimeContainer}>
              <Text style={styles.publishTimeText}>
                {'10 Minute Ago'}
              </Text>
            </View>
          </View>
        )}
      </Translation>
    );
  };

  renderItem = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View
            style={styles.itemContainer}>
            {this.renderTopContainer(params)}
            {this.renderCenterContainer(params)}
            {this.renderBottomContainer(params)}
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
            data={props.data}
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
    // backgroundColor: '#0f0',
  },
  contentContainer: {},
  separator: {
    backgroundColor: Theme.colors.general.transparent,
    height: 16,
  },
  separatorForImages: {
    backgroundColor: Theme.colors.general.transparent,
    width: 16,
  },
  itemContainer: {
    // backgroundColor: '#f00',
    // alignItems: 'center',
    // marginHorizontal: 10,
  },
  topContainer: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profileInfoContainer: {
    // backgroundColor: '#ff0',
    flex: 1,
    marginHorizontal: 12,
  },
  avatarImage: {
    // backgroundColor: '#0f0',
    width: 32,
    height: 32,
    alignSelf: 'center',
  },
  nameLabel: {
    // backgroundColor: '#0f0',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.medium,
  },
  titleLabel: {
    // backgroundColor: '#00f',
    color: Theme.colors.text.subtitle,
    fontSize: 9,
    fontFamily: Theme.fonts.light,
  },
  calendarButtonContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    marginRight: 10,
  },
  calendarButton: {
    // backgroundColor: '#ff0',
    width: 18,
    height: 15,
  },
  followButtonContainer: {
    // backgroundColor: '#ff0',
    flexDirection: 'row',
  },
  followButton: {
    // backgroundColor: '#f0f',
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.regular,
    textTransform: 'uppercase',
  },
  centerContainer: {
    // backgroundColor: '#0f0',
  },
  image: {
    // backgroundColor: '#0f0',
  },
  bottomContainer: {
    // backgroundColor: '#00f',
  },
  topBottomContainer: {
    // backgroundColor: '#ff0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {},
  likeButtonImage: {
    width: 24,
    height: 24,
  },
  likeText: {
    // backgroundColor: '#ff0',
    flex: 1,
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    marginHorizontal: 8,
  },
  messageButton: {
    marginRight: 4,
  },
  messageButtonImage: {
    width: 24,
    height: 24,
  },
  bookmarkButton: {},
  bookmarkButtonImage: {
    width: 24,
    height: 24,
  },
  centerBottomContainer: {
    // backgroundColor: '#0ff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  text: {
    flex: 1,
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
  },
  bottomBottomContainer: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  infoContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryImage: {
    width: 13,
    height: 13,
    marginRight: 4,
  },
  categoryText: {
    // backgroundColor: '#f00',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    textTransform: 'uppercase',
  },
  scheduleContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleImage: {
    width: 13,
    height: 13,
    marginRight: 4,
  },
  scheduleText: {
    // backgroundColor: '#f00',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
  },
  publishTimeContainer: {
    // backgroundColor: '#0f0',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  publishTimeText: {
    // backgroundColor: '#f00',
    color: Theme.colors.text.subtitle,
    fontSize: 11,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.44,
    textTransform: 'uppercase',
  },
});

FeedList.propTypes = {
  onLayout: PropTypes.func,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  hidden: PropTypes.bool,
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  onPressItem: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
};

FeedList.defaultProps = {
  onLayout: undefined,
  style: undefined,
  contentContainerStyle: undefined,
  hidden: false,
  type: undefined,
  data: undefined,
  onPressItem: undefined,
  onRefresh: undefined,
  refreshing: undefined,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);
