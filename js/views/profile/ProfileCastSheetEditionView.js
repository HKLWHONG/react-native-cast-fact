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
  Alert,
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
  UserProvider,
} from '../../providers';

import {
  Constants,
} from '../../constants';

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

  fetchProperty = (key) => {
    const info = store.getState().profileCastSheetEditionViewReducer.account.info[key];

    if (info) {
      if (info.text && info.text.length > 0) {
        if (
          key === Constants.CAST_SHEET_KEY_DATE_OF_BIRTH
          ||
          key == Constants.CAST_SHEET_KEY_PLACE_OF_BIRTH
        ) {
          return CalendarProcessor.toApiDateString(info.text);
        }

        return info.text;
      } else if (info.tags && info.tags.length > 0) {
        return info.tags[0].text;
      }
    }

    return '';
  };

  fetchProperties = (key) => {
    const info = store.getState().profileCastSheetEditionViewReducer.account.info[key];

    let tags = (info && info.tags) || [];

    if (info && info.text && info.text.length > 0) {
      tags = [
        ...tags,
        {
          text: info.text,
        }
      ];
    }

    return tags.map((tag) => {
      let property = {};

      if (key === Constants.CAST_SHEET_KEY_ALMA_MATERS) {
        property = {
          "school_name": "Hong Kong Baptist University College of International Education",
          "major": "Creative Communication",
        };
      } else if (key === Constants.CAST_SHEET_KEY_AWARDS) {
        property = {
          "year": "",
          "award_ceremony_name": "",
          "award_name": "",
          "winner": "",
        };
      } else if (
        key === Constants.CAST_SHEET_KEY_MOVIES
        ||
        key === Constants.CAST_SHEET_KEY_TV_SHOWS
        ||
        key === Constants.CAST_SHEET_KEY_COMMERCIALS
        ||
        key === Constants.CAST_SHEET_KEY_VARIETY_SHOWS
        ||
        key === Constants.CAST_SHEET_KEY_PERFORMING_ARTS
        ||
        key === Constants.CAST_SHEET_KEY_BROADCASTS
        ||
        key === Constants.CAST_SHEET_KEY_MODELLINGS
        ||
        key === Constants.CAST_SHEET_KEY_VOICEOVERS
        ||
        key === Constants.CAST_SHEET_KEY_ONLINES
        ||
        key === Constants.CAST_SHEET_KEY_EVENTS
      ) {
        property = {
          "year": "",
          "name": "",
          "role_title": "",
          "role_name": "",
        };

        if (
          key === Constants.CAST_SHEET_KEY_MUSIC_VIDEOS
          ||
          key === Constants.CAST_SHEET_KEY_STAGE_SHOWS
        ) {
          property = {
            ...property,
            "singer": "",
          };
        }
      } else if (
        key === Constants.CAST_SHEET_KEY_CONTACTS
        ||
        key === Constants.CAST_SHEET_KEY_SOCIAL_MEDIAS
      ) {
        property = {
          "type": "Phone",
          "category": "Tester001",
          "text": "61234321",
        };
      } else if (key === Constants.CAST_SHEET_KEY_CONTACTS_AGENTS) {
        property = {
          "name": "Tester-Agent",
          "phone": "",
          "email": "",
          "agent_status": "",
        }
      } else {
        property = {
          text: tag.text,
        };
      }

      return property;
    });
  };

  initialize = () => {
    const { props } = this;

    props.addSignUpStackNavigatorOnScreenAppearList(IDENTIFIER, () => {
      props.setSignUpStackNavigatorEnabledRight(true);
    });

    props.addSignUpStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
      console.log('[signUpViewAccount]', props.signUpViewAccount);
      console.log('[profileInfoSetupViewAccount]', props.profileInfoSetupViewAccount);
      console.log('[profileInfoSetupViewPhoto]', props.profileInfoSetupViewPhoto);
      console.log('[profileCastSheetEditionAccount]', JSON.stringify(store.getState().profileCastSheetEditionViewReducer.account));

      UserProvider.createAndLinkProfile(
        props,
        [
            {
                firstname_en: props.profileInfoSetupViewAccount.info.firstnameEn || '',
                lastname_en: props.profileInfoSetupViewAccount.info.lastnameEn || '',
                firstname_zh: props.profileInfoSetupViewAccount.info.firstnameZh || '',
                lastname_zh: props.profileInfoSetupViewAccount.info.lastnameZh || '',
                nickname: props.profileInfoSetupViewAccount.info.nickname || '',
                name_display_format: props.profileInfoSetupViewAccount.info.displayFormat,
                [Constants.CAST_SHEET_KEY_GENDER]: this.fetchProperty(Constants.CAST_SHEET_KEY_GENDER),
                [Constants.CAST_SHEET_KEY_DATE_OF_BIRTH]: this.fetchProperty(Constants.CAST_SHEET_KEY_DATE_OF_BIRTH),
                [Constants.CAST_SHEET_KEY_PLACE_OF_BIRTH]: this.fetchProperty(Constants.CAST_SHEET_KEY_PLACE_OF_BIRTH),
                [Constants.CAST_SHEET_KEY_ACTING_YEAR_START]: this.fetchProperty(Constants.CAST_SHEET_KEY_ACTING_YEAR_START),
                [Constants.CAST_SHEET_KEY_ACTING_YEAR_END]: this.fetchProperty(Constants.CAST_SHEET_KEY_ACTING_YEAR_END),
                [Constants.CAST_SHEET_KEY_HEIGHT]: this.fetchProperty(Constants.CAST_SHEET_KEY_HEIGHT),
                [Constants.CAST_SHEET_KEY_WEIGHT]: this.fetchProperty(Constants.CAST_SHEET_KEY_WEIGHT),
                [Constants.CAST_SHEET_KEY_SKIN_COLOR]: this.fetchProperty(Constants.CAST_SHEET_KEY_SKIN_COLOR),
                [Constants.CAST_SHEET_KEY_DRESS_SIZE]: this.fetchProperty(Constants.CAST_SHEET_KEY_DRESS_SIZE),
                [Constants.CAST_SHEET_KEY_SHIRT_SIZE]: this.fetchProperty(Constants.CAST_SHEET_KEY_SHIRT_SIZE),
                [Constants.CAST_SHEET_KEY_SHOE_SIZE]: this.fetchProperty(Constants.CAST_SHEET_KEY_SHOE_SIZE),
                [Constants.CAST_SHEET_KEY_SUIT_COST_SIZE]: this.fetchProperty(Constants.CAST_SHEET_KEY_SUIT_COST_SIZE),
                [Constants.CAST_SHEET_KEY_PANTS_SIZE]: this.fetchProperty(Constants.CAST_SHEET_KEY_PANTS_SIZE),
                [Constants.CAST_SHEET_KEY_HAT_SIZE]: this.fetchProperty(Constants.CAST_SHEET_KEY_HAT_SIZE),
                [Constants.CAST_SHEET_KEY_HANDEDNESS]: this.fetchProperty(Constants.CAST_SHEET_KEY_HANDEDNESS),
                [Constants.CAST_SHEET_KEY_GLOVE]: this.fetchProperty(Constants.CAST_SHEET_KEY_GLOVE),
                [Constants.CAST_SHEET_KEY_HAIR_COLORS]: this.fetchProperties(Constants.CAST_SHEET_KEY_HAIR_COLORS),
                [Constants.CAST_SHEET_KEY_EYES_COLORS]: this.fetchProperties(Constants.CAST_SHEET_KEY_EYES_COLORS),
                [Constants.CAST_SHEET_KEY_BODY_TYPES]: this.fetchProperties(Constants.CAST_SHEET_KEY_BODY_TYPES),
                [Constants.CAST_SHEET_KEY_OCCUPATIONS]: this.fetchProperties(Constants.CAST_SHEET_KEY_OCCUPATIONS),
                [Constants.CAST_SHEET_KEY_SKILLS]: this.fetchProperties(Constants.CAST_SHEET_KEY_SKILLS),
                [Constants.CAST_SHEET_KEY_LANGUAGES]: this.fetchProperties(Constants.CAST_SHEET_KEY_LANGUAGES),
                [Constants.CAST_SHEET_KEY_WORKING_BASES]: this.fetchProperties(Constants.CAST_SHEET_KEY_WORKING_BASES),
                [Constants.CAST_SHEET_KEY_ALMA_MATERS]: [
                    // {
                    //     "school_name": "Buddhist Chung Wah Kornhill Primary School",
                    //     "major": ""
                    // },
                    // {
                    //     "school_name": "Chong Gene Hang College",
                    //     "major": ""
                    // },
                    // {
                    //     "school_name": "Hong Kong Baptist University College of International Education",
                    //     "major": "Creative Communication"
                    // }
                ],
                [Constants.CAST_SHEET_KEY_AWARDS]: [
                    // {
                    //     "year": "",
                    //     "award_ceremony_name": "",
                    //     "award_name": "",
                    //     "winner": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_NATIONALITIES]: this.fetchProperties(Constants.CAST_SHEET_KEY_NATIONALITIES),
                [Constants.CAST_SHEET_KEY_LICENSES]: this.fetchProperties(Constants.CAST_SHEET_KEY_LICENSES),
                [Constants.CAST_SHEET_KEY_MOVIES]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_TV_SHOWS]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_COMMERCIALS]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_MUSIC_VIDEOS]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "singer": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_STAGE_SHOWS]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "singer": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // },
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "singer": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_VARIETY_SHOWS]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_PERFORMING_ARTS]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_BROADCASTS]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_MODELLINGS]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_VOICEOVERS]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_ONLINES]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_EVENTS]: [
                    // {
                    //     "year": "",
                    //     "name": "",
                    //     "role_title": "",
                    //     "role_name": ""
                    // }
                ],
                [Constants.CAST_SHEET_KEY_CONTACTS]: [
                    // {
                    //     "type": "Phone",
                    //     "category": "Tester001",
                    //     "text": "61234321"
                    // }
                ],
                [Constants.CAST_SHEET_KEY_SOCIAL_MEDIAS]: [
                    // {
                    //     "type": "Instagram",
                    //     "category": "",
                    //     "text": "castfact-tester-ig"
                    // },
                    // {
                    //     "type": "Facebook",
                    //     "category": "",
                    //     "text": "castfact-tester-fb"
                    // },
                    // {
                    //     "type": "YouTube",
                    //     "category": "",
                    //     "text": "castfact-tester-yb"
                    // }
                ],
                [Constants.CAST_SHEET_KEY_CONTACTS_AGENTS]: [
                    // {
                    //     "name": "Tester-Agent",
                    //     "phone": "",
                    //     "email": "",
                    //     "agent_status": ""
                    // }
                ],
            }
        ],
      )
        .then(() => {
          if (
            store.getState().profileInfoSetupViewReducer.photo
            &&
            store.getState().profileInfoSetupViewReducer.photo.path
            &&
            store.getState().profileInfoSetupViewReducer.photo.mime
          ) {
            UserProvider.uploadProfileImage(
              props,
              {
                key: 'image',
                uri: 'file://' + store.getState().profileInfoSetupViewReducer.photo.path,
                type: store.getState().profileInfoSetupViewReducer.photo.mime,
              },
            )
              .then((params) => {
                this.login();
              })
              .catch((error) => {
                console.error(error);

                Alert.alert(i18n.t('app.system_error'), i18n.t('app.error.general_message'));
              });
          } else {
            this.login();
          }
        })
        .catch((error) => {
          console.error(error);

          Alert.alert(i18n.t('app.system_error'), i18n.t('app.error.general_message'));
        });
    });
  };

  login = () => {
    AuthProvider.login(props, {
      email: props.signUpViewAccount.credentials.email,
      password: props.signUpViewAccount.credentials.password,
    })
      .then(async () => {
        Router.push(props, 'ProfileCompletionView');
      })
      .catch((error) => {
        console.error(error);

        Alert.alert(
          i18n.t('app.system_error'),
          i18n.t('app.error.general_message'),
          [{
            text: i18n.t('app.ok').toUpperCase(),
          }],
        );
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

  renderCastSheetInputItem = (key, multiple) => {
    const { props } = this;

    const info = props.account.info[key];
    const list = Constants.CAST_SHEET_WHITE_LIST[key] || [];

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

    if (multiple || tags.length === 0) {
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
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_GENDER)}
            {this.renderCastSheetDateItem(Constants.CAST_SHEET_KEY_DATE_OF_BIRTH)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_PLACE_OF_BIRTH)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_ACTING_YEAR_START)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_ACTING_YEAR_END)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_LANGUAGES, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_WORKING_BASES, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_OCCUPATIONS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_SKILLS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_ALMA_MATERS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_AWARDS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_NATIONALITIES, true)}
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
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_HEIGHT)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_WEIGHT)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_SKIN_COLOR)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_DRESS_SIZE)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_SHIRT_SIZE)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_SHOE_SIZE)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_SUIT_COST_SIZE)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_PANTS_SIZE)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_HAT_SIZE)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_HANDEDNESS)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_GLOVE)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_HAIR_COLORS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_EYES_COLORS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_BODY_TYPES, true)}
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
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_LICENSES, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_MOVIES, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_TV_SHOWS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_COMMERCIALS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_MUSIC_VIDEOS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_STAGE_SHOWS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_VARIETY_SHOWS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_PERFORMING_ARTS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_BROADCASTS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_MODELLINGS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_VOICEOVERS, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_ONLINES, true)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_EVENTS, true)}
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
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_CONTACTS_ADDRESS)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_CONTACTS_EMAIL)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_CONTACTS_PHONE)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_CONTACTS_AGENTS)}
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
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_SOCIAL_MEDIA_INSTAGRAM)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_SOCIAL_MEDIA_FACEBOOK)}
            {this.renderCastSheetInputItem(Constants.CAST_SHEET_KEY_SOCIAL_MEDIA_YOUTUBE)}
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
    profileInfoSetupViewPhoto: state.profileInfoSetupViewReducer.photo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(ProfileCastSheetEditionViewAction.reset(...args)),
    addAccountInfo: (...args) => dispatch(ProfileCastSheetEditionViewAction.addAccountInfo(...args)),
    deleteAccountInfo: (...args) => dispatch(ProfileCastSheetEditionViewAction.deleteAccountInfo(...args)),
    setSignUpStackNavigatorEnabledRight: (...args) => dispatch(SignUpStackNavigatorAction.setEnabledRight(...args)),
    addSignUpStackNavigatorOnScreenAppearList: (...args) => dispatch(SignUpStackNavigatorAction.addOnScreenAppear(...args)),
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
    setCalendarModalViewInitialDate: (...args) => dispatch(CalendarModalViewAction.setInitialDate(...args)),
    setCalendarModalViewOnDayPress: (...args) => dispatch(CalendarModalViewAction.setOnDayPress(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCastSheetEditionView);
