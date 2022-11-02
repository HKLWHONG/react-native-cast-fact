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

import { Button, Separator } from '../../project-components';

import ViewMoreText from 'react-native-view-more-text';

import { Theme } from '../../utils';

import { UserProcessor } from '../../processors';

import { Translation } from 'react-i18next';

const ic_placeholder = require('../../../assets/images/ic_placeholder/ic_placeholder.png');
const ic_grid = require('../../../assets/images/ic_grid/ic_grid.png');
const ic_calendar = require('../../../assets/images/ic_calendar/ic_calendar.png');
const ic_calendar_plus = require('../../../assets/images/ic_calendar_plus/ic_calendar_plus.png');
const ic_heart = require('../../../assets/images/ic_heart/ic_heart.png');
const ic_heart_fill = require('../../../assets/images/ic_heart_fill/ic_heart_fill.png');
const ic_bubble = require('../../../assets/images/ic_bubble/ic_bubble.png');
const ic_star = require('../../../assets/images/ic_star/ic_star.png');
const ic_star_fill = require('../../../assets/images/ic_star_fill/ic_star_fill.png');

class FeedList extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderProfileImageIfNeeded = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    // console.log('[item]', item);

    let image = item && item.profile && item.profile.image;

    if (!image) {
      return;
    }

    const { uri} = image;

    if (!uri) {
      return;
    }

    return (
      <Translation>
        {(t) => (
          <Image
            style={styles.avatarImage}
            source={{ uri: uri }}
            resizeMode={"contain"}
          />
        )}
      </Translation>
    );
  };

  renderTopContainer = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.topContainer}>
            {this.renderProfileImageIfNeeded(params)}
            <View style={styles.profileInfoContainer}>
              <Text style={styles.nameLabel}>
                {UserProcessor.toName(item && item.profile)}
              </Text>
              <Text style={styles.titleLabel}>
                {item && item.profile && item.profile.title}
              </Text>
            </View>
            <Button
              style={styles.calendarButtonContainer}
              buttonStyle={styles.calendarButton}
              imageStyle={styles.calendarImage}
              type="small"
              source={ic_calendar_plus}
              resizeMode="center"
              onPress={() => {
                if (!props.onPressCalendar) {
                  return;
                }

                props.onPressCalendar(params);
              }}
            />
            <Button
              style={styles.followButtonContainer}
              buttonStyle={styles.followButton}
              textStyle={styles.followText}
              type="small"
              text={item && item.profile && item.profile.followed ? t('app.followed') : t('app.follow')}
              onPress={() => {
                if (!props.onPressFollow) {
                  return;
                }

                props.onPressFollow(params);
              }}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderImage = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    // console.log('[item]', item);

    let image = item && item.post && item.post.image;

    if (!image) {
      return;
    }

    const { uri, width, height } = image;

    if (!uri || !width || !height) {
      return;
    }

    let style = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width * height / width,
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

  renderItemForImages = (params) => {
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
            style={[styles.image, styles.images, style]}
            source={{ uri: uri }}
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

  renderImages = (params) => {
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
            data={data}
            renderItem={this.renderItemForImages}
            ItemSeparatorComponent={this.renderItemSeparatorComponentForImages}
            horizontal
            showsHorizontalScrollIndicator={false}
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
          <View style={styles.centerContainer}>
            {children}
          </View>
        )}
      </Translation>
    );
  };

  renderViewMore = (onPress) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Text
            style={styles.viewMoreText}
            onPress={onPress}
          >
            {t('components.feed_list.view_more')}
          </Text>
        )}
      </Translation>
    );
  };

  renderViewLess = (onPress) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View />
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
            <View style={styles.topBottomContainer}>
              <Button
                style={styles.likeButtonContainer}
                buttonStyle={styles.likeButton}
                imageStyle={styles.likeButtonImage}
                type="small"
                source={item && item.post && item.post.liked ? ic_heart_fill : ic_heart}
                resizeMode="center"
                onPress={() => {
                  if (!props.onPressLike) {
                    return;
                  }

                  props.onPressLike(params);
                }}
              />
              <Text style={styles.likeText}>
                {'279 LIKES'}
              </Text>
              <Button
                style={styles.messageButtonContainer}
                buttonStyle={styles.messageButton}
                imageStyle={styles.messageButtonImage}
                type="small"
                source={ic_bubble}
                resizeMode="center"
              />
              <Button
                style={styles.bookmarkButtonContainer}
                buttonStyle={styles.bookmarkButton}
                imageStyle={styles.bookmarkButtonImage}
                type="small"
                source={item && item.post && item.post.bookmarked ? ic_star_fill : ic_star}
                resizeMode="center"
                onPress={() => {
                  if (!props.onPressBookmark) {
                    return;
                  }

                  props.onPressBookmark(params);
                }}
              />
            </View>
            <View style={styles.centerBottomContainer}>
              <ViewMoreText
                numberOfLines={3}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
              >
                <Text style={styles.text}>
                  {item && item.post && item.post.description}
                </Text>
              </ViewMoreText>
            </View>
            <View style={styles.bottomBottomContainer}>
              <View style={styles.infoContainer}>
                <Image
                  style={styles.categoryImage}
                  source={ic_grid}
                  resizeMode="center"
                />
                <Text style={styles.categoryText}>
                  {item && item.post && item.post.eventType}
                </Text>
              </View>
              <View style={styles.scheduleContainer}>
                <Image
                  style={styles.scheduleImage}
                  source={ic_calendar}
                  resizeMode="center"
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
          <View style={styles.itemContainer}>
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
    width: 4,
  },
  itemContainer: {
    // backgroundColor: '#f00',
    // alignItems: 'center',
    // marginHorizontal: 10,
  },
  topContainer: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: 16,
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
  calendarButtonContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 1,
    marginBottom: 4,
  },
  calendarButton: {
    // backgroundColor: '#00f',
    paddingLeft: 6,
    paddingRight: 4,
    paddingVertical: 5,
  },
  calendarImage: {
    // backgroundColor: '#ff0',
    width: 21,
    height: 21,
  },
  followButtonContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    marginTop: 1,
    marginBottom: 4,
  },
  followButton: {
    // backgroundColor: '#00f',
    paddingLeft: 9.5,
    paddingRight: 8.5,
    paddingVertical: 5,
  },
  followText: {
    // backgroundColor: '#f0f',
    color: Theme.colors.general.white,
    fontSize: 11,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  centerContainer: {
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
    marginHorizontal: 16,
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
  },
  images: {
    borderRadius: 3,
  },
  bottomContainer: {
    // backgroundColor: '#00f',
  },
  topBottomContainer: {
    // backgroundColor: '#ff0',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  likeButtonContainer: {
    // backgroundColor: '#00f',
    backgroundColor: Theme.colors.general.transparent,
  },
  likeButton: {
    paddingRight: 8,
    paddingVertical: 0,
  },
  likeButtonImage: {
    width: 24,
    height: 24,
  },
  likeText: {
    // backgroundColor: '#0ff',
    flex: 1,
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    // marginTop: 4,
    // marginBottom: 1,
  },
  messageButtonContainer: {
    // backgroundColor: '#00f',
    backgroundColor: Theme.colors.general.transparent,
  },
  messageButton: {
    paddingLeft: 8,
    paddingRight: 0,
    paddingVertical: 0,
  },
  messageButtonImage: {
    width: 24,
    height: 24,
  },
  bookmarkButtonContainer: {
    backgroundColor: Theme.colors.general.transparent,
    marginLeft: 8,
  },
  bookmarkButton: {
    paddingLeft: 0,
    paddingVertical: 0,
  },
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
    // backgroundColor: '#ff0',
    color: Theme.colors.general.white,
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
  },
  viewMoreText: {
    // backgroundColor: '#f00',
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
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
    width: 15,
    height: 15,
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
    width: 15,
    height: 15,
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
  onPressCalendar: PropTypes.func,
  onPressFollow: PropTypes.func,
  onPressLike: PropTypes.func,
  onPressStar: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
};

FeedList.defaultProps = {
  onLayout: undefined,
  style: undefined,
  contentContainerStyle: undefined,
  hidden: false,
  type: undefined,
  onPressCalendar: undefined,
  onPressFollow: undefined,
  onPressLike: undefined,
  onPressBookmark: undefined,
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
