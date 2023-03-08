/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  ImageBackground,
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import {
  store,
  ProfileCastSheetEditionViewAction,
  SignUpStackNavigatorAction,
  ProfileInfoSetupViewAction,
  CalendarModalViewAction,
} from '../../redux';

import {
  BaseComponent,
  Root,
  Header,
  Body,
  Footer,
  SingleTouch,
  Image,
  List,
} from '../../components';

import {
  ProfileInfoSetupView,
  CastSheetItem,
  TextInput,
  Tag,
  Button,
} from '../../project-components';

import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import { CalendarProcessor } from '../../processors';

import {
  AuthProvider,
} from '../../providers';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

const ic_light_background = require('../../../assets/images/ic_light_background/ic_light_background.png');

export const IDENTIFIER = 'ProfileCastSheetEditionView';

class ProfileCastSheetEditionView extends BaseComponent {
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

    props.addSignUpStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
      console.log('[signUpViewAccount]', props.signUpViewAccount);
      console.log('[profileInfoSetupViewAccount]', props.profileInfoSetupViewAccount);
      console.log('[profileCastSheetEditionAccount]', JSON.stringify(store.getState().profileCastSheetEditionViewReducer.account));

      AuthProvider.register(props, {
        email: props.signUpViewAccount.credentials.email,
        password: props.signUpViewAccount.credentials.password,
      })
        .then(() => {
          Router.push(props, 'ProfileCompletionView');
        })
        .catch((error) => {
          console.error(error);
        });
    });
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

  renderImageBackground = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <ImageBackground
            style={styles.imageBackground}
            source={ic_light_background}
          />
        )}
      </Translation>
    );
  };

  renderProfileContainer = (params) => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <View style={styles.profileContainer}>
            <ProfileInfoSetupView
              hiddenInfoContainer
              index={2}
              text={t('views.profile_cast_sheet_edition.title')}
            />
          </View>
        )}
      </Translation>
    );
  };

  renderCastSheetInputItem = (key, list = [], single) => {
    const { props } = this;

    const info = props.account.info[key];

    let tags = [];
    let text = undefined;
    let state = undefined;
    let visible = undefined;

    if (info) {
      tags = info.tags || [];
      text = info.text;
      state = info.state;
      visible = info.visible;
    }

    let children = (
      Array(tags.length)
        .fill()
        .map((_, i) => i)
        .map((i) => {
          const info = tags[i];
          const { text } = info;

          return (
            <Tag
              key={i.toString()}
              info={info}
              style={styles.tag}
              text={text}
              rightAccessoryType="delete"
              fill
              onPressRightAccessory={(info) => {
                const { tagId } = info;

                let tags = (
                  (
                    store.getState().profileCastSheetEditionViewReducer.account.info[key]
                    &&
                    store.getState().profileCastSheetEditionViewReducer.account.info[key].tags
                  )
                  ||
                  []
                );

                tags = tags.filter((tag) => {
                  return tag.tagId !== tagId;
                })

                props.addAccountInfo(key, {
                  ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                  tags: tags,
                });
              }}
            />
          );
        })
    );

    let inputTag = undefined;

    if (!single || tags.length === 0) {
      inputTag = (
        <Tag
          style={styles.tag}
          type="input"
          state={state}
          text={text}
          rightAccessoryType="delete"
          fill
          onFocus={() => {
            props.addAccountInfo(key, {
              ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
              state: 'attention',
            });
          }}
          onBlur={(params) => {
            console.log('[params]', params);

            let tags = (
              (
                store.getState().profileCastSheetEditionViewReducer.account.info[key]
                &&
                store.getState().profileCastSheetEditionViewReducer.account.info[key].tags
              )
              ||
              []
            );

            if (text && text.length > 0 && state === 'success') {
              tags = [
                ...tags,
                {
                  text: text.trim(),
                },
              ];
            }

            tags = tags.map((tag, index) => {
              return {
                ...tag,
                tagId: index.toString(),
              };
            })

            props.addAccountInfo(key, {
              ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
              tags: tags,
              text: undefined,
              state: undefined,
            });
          }}
          onChangeText={(params) => {
            const { text } = params;

            let state = 'attention';

            let matched = list.length > 0 ? false : true;

            if (!matched) {
              list.forEach((item, i) => {
                if (item.trim().toLowerCase() === text.trim().toLowerCase()) {
                  matched = true;
                }
              });
            }

            state = matched ? 'success' : 'error';

            props.addAccountInfo(key, {
              ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
              text: text,
              state: state,
            });
          }}
          onPressRightAccessory={() => {
            props.deleteAccountInfo(key);
          }}
        />
      );
    }

    return (
      <Translation>
        {(t) => (
          <CastSheetItem
            text={t(`app.${key}`)}
            visible={visible}
            onPressVisibilityButton={(event) => {
              const { visible } = event;

              props.addAccountInfo(key, {
                ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                visible: !visible,
              });
            }}
          >
            {children}
            {inputTag}
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderCastSheetDateItem = (key) => {
    const { props } = this;

    const info = props.account.info[key];

    let text = undefined;
    let visible = undefined;

    if (info) {
      text = info.text;
      visible = info.visible;
    }

    return (
      <Translation>
        {(t) => (
          <CastSheetItem
            text={t(`app.${key}`)}
            visible={visible}
            onPressVisibilityButton={(event) => {
              const { visible } = event;

              props.addAccountInfo(key, {
                ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                visible: !visible,
              });
            }}
          >
            <SingleTouch
              onPress={() => {
                let initialDate = CalendarProcessor.toDateString(CalendarProcessor.formatDate(new Date()));

                if (text) {
                  initialDate = CalendarProcessor.toDateString(text);
                }

                props.setCalendarModalViewInitialDate(initialDate);

                props.setCalendarModalViewOnDayPress((date) => {
                  props.addAccountInfo(key, {
                    ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                    text: CalendarProcessor.formatDate(new Date(date.dateString)),
                  });
                });

                Router.push(props, 'CalendarModalView');
              }}
            >
              <Tag
                style={styles.tag}
                type="input"
                text={text}
                fill
                editable={false}
              />
            </SingleTouch>
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderBasicInformationContainer = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.castSheetContainer}>
            <Text style={styles.subtitle}>
              {section.title}
            </Text>
            {
              this.renderCastSheetInputItem(
                'gender',
                [
                  'Female',
                  'Male',
                ],
                true,
              )
            }
            {this.renderCastSheetDateItem('date_of_birth')}
            {this.renderCastSheetInputItem('place_of_birth')}
            {this.renderCastSheetInputItem('acting_year_start')}
            {this.renderCastSheetInputItem('acting_year_end')}
            {this.renderCastSheetInputItem('languages')}
            {this.renderCastSheetInputItem('working_bases')}
            {this.renderCastSheetInputItem('occupations')}
            {this.renderCastSheetInputItem('skills')}
            {this.renderCastSheetInputItem('alma_maters')}
            {this.renderCastSheetInputItem('awards')}
            {this.renderCastSheetInputItem('nationality')}
          </View>
        )}
      </Translation>
    );
  };

  renderAppearanceContainer = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.castSheetContainer}>
            <Text style={styles.subtitle}>
              {section.title}
            </Text>
            {this.renderCastSheetInputItem('height_by_cm')}
            {this.renderCastSheetDateItem('weight_by_kg')}
            {this.renderCastSheetInputItem('skin_color')}
            {this.renderCastSheetInputItem('dress_size')}
            {this.renderCastSheetInputItem('shirt_size')}
            {this.renderCastSheetInputItem('shoe_size')}
            {this.renderCastSheetInputItem('suit_cost_size')}
            {this.renderCastSheetInputItem('pants_size')}
            {this.renderCastSheetInputItem('hat_size')}
            {this.renderCastSheetInputItem('handedness')}
            {this.renderCastSheetInputItem('glove')}
            {this.renderCastSheetInputItem('hair_color')}
            {this.renderCastSheetInputItem('eye_color')}
            {this.renderCastSheetInputItem('body_type')}
          </View>
        )}
      </Translation>
    );
  };

  renderExperienceContainer = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.castSheetContainer}>
            <Text style={styles.subtitle}>
              {section.title}
            </Text>
            {this.renderCastSheetInputItem('licenses')}
            {this.renderCastSheetInputItem('movies')}
            {this.renderCastSheetInputItem('tv_shows')}
            {this.renderCastSheetInputItem('commercials')}
            {this.renderCastSheetInputItem('music_videos')}
            {this.renderCastSheetInputItem('stage_shows')}
            {this.renderCastSheetInputItem('variety_shows')}
            {this.renderCastSheetInputItem('performing_arts')}
            {this.renderCastSheetInputItem('broadcasts')}
            {this.renderCastSheetInputItem('modellings')}
            {this.renderCastSheetInputItem('voiceovers')}
            {this.renderCastSheetInputItem('onlines')}
            {this.renderCastSheetInputItem('events')}
          </View>
        )}
      </Translation>
    );
  };

  renderContactsContainer = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.castSheetContainer}>
            <Text style={styles.subtitle}>
              {section.title}
            </Text>
            {this.renderCastSheetInputItem('address')}
            {this.renderCastSheetInputItem('email')}
            {this.renderCastSheetInputItem('phone')}
            {this.renderCastSheetInputItem('agents')}
          </View>
        )}
      </Translation>
    );
  };

  renderSocialMediaContainer = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    return (
      <Translation>
        {(t) => (
          <View style={styles.castSheetContainer}>
            <Text style={styles.subtitle}>
              {section.title}
            </Text>
            {this.renderCastSheetInputItem('instagram')}
            {this.renderCastSheetInputItem('facebook')}
            {this.renderCastSheetInputItem('youtube')}
          </View>
        )}
      </Translation>
    );
  };

  renderItem = (params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    // console.log('[item]', item);
    // console.log('[index]', index);
    // console.log('[section]', section);
    // console.log('[separators]', separators);

    switch (section.index) {
      case 0:
        return this.renderProfileContainer(params);

      case 1:
        return this.renderBasicInformationContainer(params);

      case 2:
        return this.renderAppearanceContainer(params);

      case 3:
        return this.renderExperienceContainer(params);

      case 4:
        return this.renderContactsContainer(params);

      case 5:
        return this.renderSocialMediaContainer(params);

      default:
        break;
    }
  };

  renderBody = () => {
    const { props } = this;

    let sections = [
      {
        title: i18n.t(''),
        data: [''],
      },
      {
        title: i18n.t('views.profile_cast_sheet_edition.basic_information'),
        data: [''],
      },
      {
        title: i18n.t('views.profile_cast_sheet_edition.appearance'),
        data: [''],
      },
      {
        title: i18n.t('views.profile_cast_sheet_edition.experience'),
        data: [''],
      },
      {
        title: i18n.t('views.profile_cast_sheet_edition.contacts'),
        data: [''],
      },
      {
        title: i18n.t('views.profile_cast_sheet_edition.social_media'),
        data: [''],
      },
    ];

    return (
      <Translation>
        {(t) => (
          <Body
            style={styles.body}
            scrollable={false}
          >
            {this.renderImageBackground()}
            <List
              contentContainerStyle={styles.listContentContainer}
              sections={sections}
              renderItem={this.renderItem}
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

  // renderKeyboardAccessoryView = () => {
  //   const { props } = this;
  //
  //   return (
  //     <Translation>
  //       {(t) => (
  //         <KeyboardAccessoryView androidAdjustResize>
  //           {({ isKeyboardVisible }) => {
  //             return (
  //               <View>
  //                 <Text style={{ color: '#f00', padding: 16 }}>Always visible</Text>
  //                 {!isKeyboardVisible ? (
  //                   <Text>Hidden when keyboard is visible</Text>
  //                 ) : null}
  //               </View>
  //             );
  //           }}
  //         </KeyboardAccessoryView>
  //       )}
  //     </Translation>
  //   );
  // };

  render() {
    return (
      <Translation>
        {(t) => (
          <Root style={styles.root}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          {/* this.renderKeyboardAccessoryView() */}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  imageBackground: {
    // backgroundColor: '#f00',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 230 / 393,
  },
  listContentContainer: {
    paddingHorizontal: 0,
  },
  profileContainer: {
    // backgroundColor: "#f00",
    alignItems: 'center',
  },
  subtitle: {
    // backgroundColor: '#00f',
    color: Theme.colors.general.white,
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    marginVertical: 16,
  },
  castSheetContainer: {
    // backgroundColor: '#0f0',
    alignItems: 'center',
    marginVertical: 16,
  },
  tag: {
    backgroundColor: Theme.colors.background.secondary,
  },
  footer: {
    // backgroundColor: '#f00',
  },
});

function mapStateToProps(state) {
  return {
    account: state.profileCastSheetEditionViewReducer.account,
    signUpViewAccount: state.signUpViewReducer.account,
    profileInfoSetupViewAccount: state.profileInfoSetupViewReducer.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(ProfileCastSheetEditionViewAction.reset(...args)),
    addAccountInfo: (...args) => dispatch(ProfileCastSheetEditionViewAction.addAccountInfo(...args)),
    deleteAccountInfo: (...args) => dispatch(ProfileCastSheetEditionViewAction.deleteAccountInfo(...args)),
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
    setCalendarModalViewInitialDate: (...args) => dispatch(CalendarModalViewAction.setInitialDate(...args)),
    setCalendarModalViewOnDayPress: (...args) => dispatch(CalendarModalViewAction.setOnDayPress(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCastSheetEditionView);
