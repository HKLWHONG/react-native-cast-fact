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
import {
  SignUpAccountTypeSelectionViewAction,
  SignUpStackNavigatorAction,
  MainTabNavigatorAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  SingleTouch,
  Image,
} from '../../components';

import {
  Button,
  Separator,
} from '../../project-components';

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

// import { TestApi } from '../../apis';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const preview = require('../../../assets/images/preview/preview.png');

class SignUpAccountTypeSelectionView extends BaseComponent {
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

    props.setSignUpStackNavigatorHiddenRight(true);
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

  renderTitleContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {t('views.sign_up_account_type_selection.title')}
            </Text>
            <Text style={styles.description}>
              {t('views.sign_up_account_type_selection.description')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderSubtitleContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              {t('views.sign_up_account_type_selection.subtitle')}
            </Text>
          </View>
        )}
      </Translation>
    );
  };

  renderSelectionButtonContainer = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.selectionButtonContainer}>
            <Button
              style={styles.selectionButton}
              buttonStyle={styles.selectionButtonButton}
              imageStyle={styles.selectionButtonImage}
              textStyle={styles.selectionButtonText}
              source={preview}
              text={t('app.artisit')}
              onPress={() => {
                Router.push(props, "ProfilePictureSelection");
              }}
            />
            <Button
              style={styles.selectionButton}
              buttonStyle={styles.selectionButtonButton}
              imageStyle={styles.selectionButtonImage}
              textStyle={styles.selectionButtonText}
              source={preview}
              text={t('app.viewer')}
              onPress={() => {
                // Router.push(props, "SignUp");
              }}
            />
          </View>
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
            {this.renderTitleContainer()}
            {this.renderSubtitleContainer()}
            {this.renderSelectionButtonContainer()}
          </Body>
        )}
      </Translation>
    );
  };

  // renderBody = () => {
  //   const { props } = this;
  //
  //   return (
  //     <Translation>
  //       {(t) => (
  //         <Body
  //           style={styles.body}
  //           scrollable={false}
  //         >
  //           <View
  //             style={{
  //               backgroundColor: '#f00',
  //               alignItems: 'center',
  //             }}
  //           >
  //             <Text
  //               style={{
  //                 backgroundColor: '#00f',
  //                 color: '#fff',
  //                 fontSize: 36,
  //               }}
  //             >
  //               {t('Hello!')}
  //             </Text>
  //           </View>
  //
  //           <View
  //             style={{
  //               backgroundColor: '#ff0',
  //               alignItems: 'center',
  //             }}
  //           >
  //             <Text
  //               style={{
  //                 backgroundColor: '#00f',
  //                 color: '#fff',
  //                 fontSize: 17,
  //                 textTransform: 'uppercase',
  //               }}
  //             >
  //               {t('Select Your Role.')}
  //             </Text>
  //           </View>
  //
  //           <View
  //             style={{
  //               backgroundColor: '#ff0',
  //               alignItems: 'center',
  //               marginTop: 64,
  //             }}
  //           >
  //             <Text
  //               style={{
  //                 backgroundColor: '#00f',
  //                 color: '#fff',
  //                 fontSize: 17,
  //                 textTransform: 'uppercase',
  //               }}
  //             >
  //               {t('Choose From')}
  //             </Text>
  //           </View>
  //
  //         {this.renderSelectionButtons()}
  //
  //         {
  //           /*
  //           <List
  //             innerRef={(ref) => {
  //               props.setListRef(3, props.navigation.getState().index, ref);
  //             }}
  //             contentContainerStyle={styles.listContentContainer}
  //             sections={sections}
  //             renderItem={this.renderItem}
  //             androidRefreshControlColor={Theme.colors.general.black}
  //             iosRefreshControlColor={Theme.colors.general.white}
  //             refreshing={props.refreshing}
  //             onRefresh={async (refreshing) => {
  //               // props.setRefreshing(true);
  //
  //               // props.setFeedsPagingPage(0);
  //               //
  //               // this.loadFeeds([]);
  //
  //               // await FeedProvider.prefetchFeeds(props);
  //               //
  //               // props.setRefreshing(false);
  //             }}
  //           />
  //           */
  //         }
  //         </Body>
  //       )}
  //     </Translation>
  //   );
  // };

  renderFooter = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Footer style={styles.footer}>
            <View style={styles.infoContainer}>
              <Text style={styles.for}>
                {t('For')}
              </Text>
              <Text style={styles.email}>
                {t('kclui@gmail.com')}
              </Text>
            </View>
          </Footer>
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
            safeArea={false}
            resizeMode="stretch"
            keyboardDismissing
          >
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
    // justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 32,
  },
  titleContainer: {
    // backgroundColor: '#f00',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 36,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 8,
    textTransform: 'uppercase',
  },
  description: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  subtitleContainer: {
    // backgroundColor: '#0ff',
    alignItems: 'center',
    marginTop: 96,
    marginBottom: 8,
  },
  subtitle: {
    // backgroundColor: '#00f',
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1.7,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginHorizontal: 64,
  },
  image: {
    // backgroundColor: '#0f0',
    width: 40,
    height: 40,
  },
  selectionButtonContainer: {
    // backgroundColor: '#f00',
    flexDirection: 'row',
    marginTop: 16,
  },
  selectionButton: {
    flex: 1,
    aspectRatio: 1,
    marginHorizontal: 8,
  },
  selectionButtonButton: {
    flex: 1,
  },
  selectionButtonImage: {
    width: 60,
    height: 60,
  },
  selectionButtonText: {
    marginTop: 16,
  },
  footer: {
    // backgroundColor: '#f00',
  },
  infoContainer: {
    // backgroundColor: '#f0f',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 64,
  },
  for: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.light,
    letterSpacing: 1,
  },
  email: {
    color: Theme.colors.text.subtitle,
    fontSize: 13,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1,
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setSignUpStackNavigatorHiddenRight: (...args) => dispatch(SignUpStackNavigatorAction.setHiddenRight(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpAccountTypeSelectionView);
