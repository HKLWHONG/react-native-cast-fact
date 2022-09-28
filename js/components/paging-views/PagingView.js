/**
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, View } from 'react-native';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';

export default class PagingView extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      SW: 0,
      contentContainerStyle: {},
      childrenFrame: [],
      index: 0,
      onScrollBeginDragContentOffset: undefined,
    };
  }

  componentDidMount() {}

  scrollTo = (index, animated = true) => {
    const { SW, childrenFrame } = this.state;

    if (!childrenFrame || childrenFrame.length <= index) {
      return;
    }

    const frame = childrenFrame[index];

    this.scrollView.scrollTo({
      x: frame.x + frame.width / 2 - SW / 2,
      y: 0,
      animated: animated,
    });

    this.setState({
      index: index,
      onScrollBeginDragContentOffset: undefined,
    });

    // console.log(`[index] ${index}`);
  };

  renderIndicatorView = (num) => {
    const { props, state } = this;

    let children = [];

    for (let i = 0; i < num; i += 1) {
      const style = {
        backgroundColor:
          state.index === i ? props.activeIndicatorColor : props.indicatorColor,
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 8,
      };

      children.push(<View key={i} style={style} />);
    }

    return <View style={styles.indicatorContainer}>{children}</View>;
  };

  render() {
    const { props, state } = this;

    if (props.hidden) {
      return null;
    }

    return (
      <View onLayout={props.onLayout} style={[styles.container, props.style]}>
        <ScrollView
          ref={(element) => {
            this.scrollView = element;
          }}
          onLayout={(e) => {
            if (!props.children) {
              return;
            }

            const SW = e.nativeEvent.layout.width;
            let PL = 0;
            let PR = 0;
            let measuredX = 0;
            let childrenFrame = state.childrenFrame;

            props.children.map((view, index) => {
              // console.log('[view]', view);

              const flattenStyles = StyleSheet.flatten(view.props.style);

              let VPX = 0;
              let VPY = 0;
              let VW = flattenStyles.width;
              let VH = flattenStyles.height;
              let VPL = 0;
              let VPR = 0;

              if (flattenStyles.marginLeft) {
                VPL = flattenStyles.marginLeft;
              } else if (flattenStyles.marginHorizontal) {
                VPL = flattenStyles.marginHorizontal;
              } else if (flattenStyles.margin) {
                VPL = flattenStyles.margin;
              }

              if (flattenStyles.marginRight) {
                VPR = flattenStyles.marginRight;
              } else if (flattenStyles.marginHorizontal) {
                VPR = flattenStyles.marginHorizontal;
              } else if (flattenStyles.margin) {
                VPR = flattenStyles.margin;
              }

              if (index === 0) {
                PL = (SW - VW) / 2 - VPL;

                if (PL < 0) {
                  PL = 0;
                }

                measuredX += PL + VPL;
              } else if (index === props.children.length - 1) {
                PR = (SW - VW) / 2 - VPR;

                if (PR < 0) {
                  PR = 0;
                }

                measuredX += VPL;
              } else {
                measuredX += VPL;
              }

              VPX = measuredX;

              let frame = {
                x: VPX,
                y: VPY,
                width: VW,
                height: VH,
              };

              childrenFrame = [...childrenFrame, frame];

              measuredX += VW + VPR;

              // console.log(`[view-${index}]`);
              // console.log('[frame]', frame);
            });

            // console.log(`[SW=${SW}], [PL=${PL}], [PR=${PR}]`);

            this.setState(
              {
                SW: SW,
                contentContainerStyle: {
                  paddingLeft: PL,
                  paddingRight: PR,
                },
                childrenFrame: childrenFrame,
              },
              () => {
                setTimeout(() => {
                  this.scrollTo(props.index);
                }, 0);
              },
            );
          }}
          contentContainerStyle={[
            styles.contentContainer,
            state.contentContainerStyle,
          ]}
          onScrollBeginDrag={(e) => {
            // const OX = e.nativeEvent.contentOffset.x;

            // console.log('[onScrollBeginDrag]', OX);

            this.setState({
              onScrollBeginDragContentOffset: e.nativeEvent.contentOffset,
            });
          }}
          onScrollEndDrag={(e) => {
            const {
              childrenFrame,
              index,
              onScrollBeginDragContentOffset,
            } = this.state;
            const OX = e.nativeEvent.contentOffset.x;
            let newIndex = index;

            // console.log('[onScrollEndDrag]', OX);
            // console.log('[childrenFrame-size]', childrenFrame.length);
            // console.log('[contentSize]', e.nativeEvent.contentSize);
            // console.log('[contentOffset]', e.nativeEvent.contentOffset);

            // console.log('[props.velocity]', props.velocity);
            // console.log('[value]', OX - onScrollBeginDragContentOffset.x);

            if (OX - onScrollBeginDragContentOffset.x < -props.velocity) {
              newIndex -= 1;

              if (newIndex < 0) {
                newIndex = 0;
              }
            } else if (OX - onScrollBeginDragContentOffset.x > props.velocity) {
              newIndex += 1;

              if (newIndex > childrenFrame.length - 1) {
                newIndex = childrenFrame.length - 1;
              }
            }

            this.scrollTo(newIndex);

            if (props.onSelect) {
              props.onSelect(newIndex);
            }
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal>
          {props.children}
        </ScrollView>
        {props.children
          ? this.renderIndicatorView(props.children.length)
          : undefined}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  contentContainer: {
    alignItems: 'center',
  },
  indicatorContainer: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
});

PagingView.propTypes = {
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  activeIndicatorColor: PropTypes.string,
  indicatorColor: PropTypes.string,
  hidden: PropTypes.bool,
  index: PropTypes.number,
  velocity: PropTypes.number,
  onSelect: PropTypes.func,
};

PagingView.defaultProps = {
  onLayout: undefined,
  children: undefined,
  style: undefined,
  activeIndicatorColor: '#000000',
  indicatorColor: '#BBBBBB',
  hidden: false,
  index: 0,
  velocity: 100,
  onSelect: undefined,
};
