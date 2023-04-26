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
  GroupFrame,
} from '../../project-components';

import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import { CalendarProcessor, ProfileProcessor } from '../../processors';

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

const ic_plus = require('../../../assets/images/ic_plus/ic_plus.png');

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
                name_display_format: props.profileInfoSetupViewAccount.info.displayFormat.toString(),
                [Constants.CAST_SHEET_KEY_GENDER]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_GENDER),
                [Constants.CAST_SHEET_KEY_DATE_OF_BIRTH]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_DATE_OF_BIRTH),
                [Constants.CAST_SHEET_KEY_PLACE_OF_BIRTH]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_PLACE_OF_BIRTH),
                [Constants.CAST_SHEET_KEY_ACTING_YEAR_START]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_ACTING_YEAR_START),
                [Constants.CAST_SHEET_KEY_ACTING_YEAR_END]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_ACTING_YEAR_END),
                [Constants.CAST_SHEET_KEY_HEIGHT]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_HEIGHT),
                [Constants.CAST_SHEET_KEY_WEIGHT]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_WEIGHT),
                [Constants.CAST_SHEET_KEY_SKIN_COLOR]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_SKIN_COLOR),
                [Constants.CAST_SHEET_KEY_DRESS_SIZE]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_DRESS_SIZE),
                [Constants.CAST_SHEET_KEY_SHIRT_SIZE]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_SHIRT_SIZE),
                [Constants.CAST_SHEET_KEY_SHOE_SIZE]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_SHOE_SIZE),
                [Constants.CAST_SHEET_KEY_SUIT_COST_SIZE]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_SUIT_COST_SIZE),
                [Constants.CAST_SHEET_KEY_PANTS_SIZE]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_PANTS_SIZE),
                [Constants.CAST_SHEET_KEY_HAT_SIZE]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_HAT_SIZE),
                [Constants.CAST_SHEET_KEY_HANDEDNESS]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_HANDEDNESS),
                [Constants.CAST_SHEET_KEY_GLOVE]: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_GLOVE),
                [Constants.CAST_SHEET_KEY_HAIR_COLORS]: ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_HAIR_COLORS),
                [Constants.CAST_SHEET_KEY_EYES_COLORS]: ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_EYES_COLORS),
                [Constants.CAST_SHEET_KEY_BODY_TYPES]: ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_BODY_TYPES),
                [Constants.CAST_SHEET_KEY_OCCUPATIONS]: ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_OCCUPATIONS),
                [Constants.CAST_SHEET_KEY_SKILLS]: ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_SKILLS),
                [Constants.CAST_SHEET_KEY_LANGUAGES]: ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_LANGUAGES),
                [Constants.CAST_SHEET_KEY_WORKING_BASES]: ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_WORKING_BASES),
                [Constants.CAST_SHEET_KEY_ALMA_MATERS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_ALMA_MATERS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_SCHOOL_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_MAJOR,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_AWARDS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_AWARDS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_AWARD_CEREMONY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_AWARD_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_WINNER,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_NATIONALITIES]: ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_NATIONALITIES),
                [Constants.CAST_SHEET_KEY_LICENSES]: ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_LICENSES),
                [Constants.CAST_SHEET_KEY_MOVIES]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_MOVIES,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_TV_SHOWS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_TV_SHOWS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_COMMERCIALS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_COMMERCIALS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_MUSIC_VIDEOS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_MUSIC_VIDEOS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_SINGER,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_STAGE_SHOWS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_STAGE_SHOWS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_SINGER,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_VARIETY_SHOWS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_VARIETY_SHOWS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_PERFORMING_ARTS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_PERFORMING_ARTS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_BROADCASTS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_BROADCASTS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_MODELLINGS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_MODELLINGS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_VOICEOVERS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_VOICEOVERS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_ONLINES]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_ONLINES,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_EVENTS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_EVENTS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                    Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                  ],
                ),
                [Constants.CAST_SHEET_KEY_CONTACTS]:
                [
                  ...ProfileProcessor.fetchApiMultipleField(
                    Constants.CAST_SHEET_KEY_CONTACTS_ADDRESS,
                    [
                      Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                      Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                    ],
                  )
                    .map((item) => {
                      return {
                        ...item,
                        type: 'Address',
                      };
                    }),
                  ...ProfileProcessor.fetchApiMultipleField(
                    Constants.CAST_SHEET_KEY_CONTACTS_EMAIL,
                    [
                      Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                      Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                    ],
                  )
                    .map((item) => {
                      return {
                        ...item,
                        type: 'Email',
                      };
                    }),
                  ...ProfileProcessor.fetchApiMultipleField(
                    Constants.CAST_SHEET_KEY_CONTACTS_PHONE,
                    [
                      Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                      Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                    ],
                  )
                    .map((item) => {
                      return {
                        ...item,
                        type: 'Phone',
                      };
                    }),
                ],
                [Constants.CAST_SHEET_KEY_SOCIAL_MEDIAS]:
                [
                  ...ProfileProcessor.fetchApiMultipleField(
                    Constants.CAST_SHEET_KEY_SOCIAL_MEDIAS_INSTAGRAM,
                    [
                      Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                      Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                    ],
                  )
                    .map((item) => {
                      return {
                        ...item,
                        type: 'Instagram',
                      };
                  }),
                  ...ProfileProcessor.fetchApiMultipleField(
                    Constants.CAST_SHEET_KEY_SOCIAL_MEDIAS_FACEBOOK,
                    [
                      Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                      Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                    ],
                  )
                    .map((item) => {
                      return {
                        ...item,
                        type: 'Facebook',
                      };
                  }),
                  ...ProfileProcessor.fetchApiMultipleField(
                    Constants.CAST_SHEET_KEY_SOCIAL_MEDIAS_YOUTUBE,
                    [
                      Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                      Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                    ],
                  )
                    .map((item) => {
                      return {
                        ...item,
                        type: 'YouTube',
                      };
                  }),
                ],
                [Constants.CAST_SHEET_KEY_CONTACTS_AGENTS]: ProfileProcessor.fetchApiMultipleField(
                  Constants.CAST_SHEET_KEY_CONTACTS_AGENTS,
                  [
                    Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                    Constants.CAST_SHEET_PROPERTY_KEY_PHONE,
                    Constants.CAST_SHEET_PROPERTY_KEY_EMAIL,
                    Constants.CAST_SHEET_PROPERTY_KEY_AGENT_STATUS,
                  ],
                ),
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

  clearData = () => {
    const { props } = this;

    props.reset();
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
              maxWidth={'85%'}
              text={text}
              rightAccessoryType="delete"
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
          maxWidth={'85%'}
          type="input"
          state={state}
          text={text}
          rightAccessoryType="delete"
          onFocus={() => {
            props.addAccountInfo(key, {
              ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
              state: 'attention',
            });
          }}
          onBlur={() => {
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
            props.addAccountInfo(key, {
              ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
              text: undefined,
              state: undefined,
            });
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
                rightAccessoryType="delete"
                editable={false}
                onPressRightAccessory={() => {
                  props.addAccountInfo(key, {
                    ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                    text: undefined,
                    state: undefined,
                  });
                }}
              />
            </SingleTouch>
          </CastSheetItem>
        )}
      </Translation>
    );
  };

  renderPropertyChildren = (key, propertyList = [], groupFrameId) => {
    const { props } = this;

    return (
      Array(propertyList.length)
        .fill()
        .map((_, t) => t)
        .map((t) => {
          const propertyKey = propertyList[t];

          let tag = ProfileProcessor.fetchTag(key, groupFrameId, propertyKey);

          let text = undefined;
          let state = undefined;

          if (tag) {
            text = tag.text;
            state = tag.state;
          }

          return (
            <View
              key={t.toString()}
              style={styles.castSheetMultipleInputItemPropertyContainer}
            >
              <View style={styles.castSheetMultipleInputItempropertyKeyContainer}>
                <Text style={styles.castSheetMultipleInputItempropertyKeyText}>
                  {i18n.t(`app.${propertyKey}`)}
                </Text>
              </View>
              <View style={styles.castSheetMultipleInputItemPropertyTagContainer}>
                <Tag
                  info={{
                    groupFrameId: groupFrameId,
                    tagKey: propertyKey,
                  }}
                  style={styles.tag}
                  maxWidth={'70%'}
                  type="input"
                  state={state}
                  text={text}
                  rightAccessoryType="delete"
                  onFocus={(params) => {
                    const { groupFrameId, tagKey } = params;

                    let tag = ProfileProcessor.fetchTag(key, groupFrameId, tagKey);

                    tag = {
                      ...tag,
                      state: 'attention',
                    };

                    const groupFrames = ProfileProcessor.updateTag(key, groupFrameId, tag);

                    props.addAccountInfo(key, {
                      ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                      groupFrames: groupFrames,
                    });
                  }}
                  onBlur={(params) => {
                    const { groupFrameId, tagKey } = params;

                    let tag = ProfileProcessor.fetchTag(key, groupFrameId, tagKey);

                    tag = {
                      ...tag,
                      state: undefined,
                    };

                    const groupFrames = ProfileProcessor.updateTag(key, groupFrameId, tag);

                    props.addAccountInfo(key, {
                      ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                      groupFrames: groupFrames,
                    });
                  }}
                  onChangeText={(params) => {
                    const { groupFrameId, tagKey, text } = params;

                    let state = 'attention';

                    let matched = true; //list.length > 0 ? false : true;

                    if (!matched) {
                      list.forEach((item, i) => {
                        if (item.trim().toLowerCase() === text.trim().toLowerCase()) {
                          matched = true;
                        }
                      });
                    }

                    state = matched ? 'success' : 'error';

                    let tag = ProfileProcessor.fetchTag(key, groupFrameId, tagKey);

                    tag = {
                      ...tag,
                      text: text,
                      state: state,
                    };

                    const groupFrames = ProfileProcessor.updateTag(key, groupFrameId, tag);

                    props.addAccountInfo(key, {
                      ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                      groupFrames: groupFrames,
                    });
                  }}
                  onPressRightAccessory={(params) => {
                    const { groupFrameId, tagKey } = params;

                    let tag = ProfileProcessor.fetchTag(key, groupFrameId, tagKey);

                    tag = {
                      ...tag,
                      text: undefined,
                      state: undefined,
                    };

                    const groupFrames = ProfileProcessor.updateTag(key, groupFrameId, tag);

                    props.addAccountInfo(key, {
                      ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                      groupFrames: groupFrames,
                    });
                  }}
                />
              </View>
            </View>
          );
        })
    );
  };

  renderCastSheetMultipleInputItem = (key, propertyList = []) => {
    const { props } = this;

    const groupFrames = ProfileProcessor.fetchGroupFrames(key).filter((groupFrame) => {
      return (
        groupFrame.groupFrameId !== 'input'
        &&
        !groupFrame.groupFrameId.startsWith('deleted')
      );
    });

    // const list = Constants.CAST_SHEET_WHITE_LIST[key] || [];

    const children = (
      Array(groupFrames.length)
        .fill()
        .map((_, i) => i)
        .map((i) => {
          const groupFrame = groupFrames[i];

          const groupFrameId = groupFrame.groupFrameId;

          let visible = undefined;

          if (groupFrame) {
            visible = groupFrame.visible;
          }

          const propertyChildren = this.renderPropertyChildren(key, propertyList, groupFrameId);

          return (
            <GroupFrame
              key={i.toString()}
              info={{
                groupFrameId: groupFrameId,
              }}
              style={styles.castSheetMultipleInputItemGroupFrame}
              contentContainerStyle={styles.castSheetMultipleInputItemGroupFrameContentContainer}
              rightAccessoryType="eye"
              visible={visible}
              onPress={(info) => {
                const { groupFrameId } = info;

                Alert.alert(
                  i18n.t('app.delete'),
                  i18n.t(''),
                  [
                    {
                      text: i18n.t('app.cancel').toUpperCase(),
                    },
                    {
                      text: i18n.t('app.ok').toUpperCase(),
                      onPress: () => {
                        const groupFrames = ProfileProcessor.deleteGroupFrame(key, groupFrameId);

                        props.addAccountInfo(key, {
                          ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                          groupFrames: groupFrames,
                        });
                      },
                    },
                  ],
                );
              }}
              onPressRightAccessory={(info) => {
                const { groupFrameId, visible } = info;

                let groupFrame = ProfileProcessor.fetchGroupFrame(key, groupFrameId);

                groupFrame = {
                  ...groupFrame,
                  visible: !visible,
                };

                const groupFrames = ProfileProcessor.updateGroupFrame(key, groupFrame);

                props.addAccountInfo(key, {
                  ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                  groupFrames: groupFrames,
                });
              }}
            >
              {propertyChildren}
            </GroupFrame>
          );
        })
    );

    const groupFrameId = 'input';

    const groupFrame = ProfileProcessor.fetchGroupFrame(key, groupFrameId);

    const propertyChildren = this.renderPropertyChildren(key, propertyList, groupFrameId);

    const inputGroupFrame = (
      <GroupFrame
        info={{
          groupFrameId: groupFrameId,
        }}
        style={styles.castSheetMultipleInputItemGroupFrame}
        contentContainerStyle={styles.castSheetMultipleInputItemGroupFrameContentContainer}
      >
        {propertyChildren}
      </GroupFrame>
    );

    return (
      <Translation>
        {(t) => (
          <View style={styles.castSheetMultipleInputItemContainer}>
            <Text style={styles.castSheetMultipleInputItemTitle}>
              {t(`app.${key}`)}
            </Text>
            {children}
            {inputGroupFrame}
            <Button
              style={styles.castSheetMultipleInputItemAddButton}
              type="small"
              source={ic_plus}
              resizeMode="center"
              onPress={() => {
                const groupFrames = ProfileProcessor.addGroupFrame(key);

                props.addAccountInfo(key, {
                  ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                  groupFrames: groupFrames,
                });
              }}
            />
          </View>
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
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_ALMA_MATERS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_SCHOOL_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_MAJOR,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_AWARDS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_AWARD_CEREMONY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_AWARD_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_WINNER,
                ],
              )
            }
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
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_MOVIES,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_TV_SHOWS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_COMMERCIALS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_MUSIC_VIDEOS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_SINGER,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_STAGE_SHOWS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_SINGER,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_VARIETY_SHOWS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_PERFORMING_ARTS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_BROADCASTS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_MODELLINGS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_VOICEOVERS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_ONLINES,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_EVENTS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_YEAR,
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
                  Constants.CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
                ],
              )
            }
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
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_CONTACTS_ADDRESS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                  Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_CONTACTS_EMAIL,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                  Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_CONTACTS_PHONE,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                  Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_CONTACTS_AGENTS,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                  Constants.CAST_SHEET_PROPERTY_KEY_PHONE,
                  Constants.CAST_SHEET_PROPERTY_KEY_EMAIL,
                  Constants.CAST_SHEET_PROPERTY_KEY_AGENT_STATUS,
                ],
              )
            }
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
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_SOCIAL_MEDIAS_INSTAGRAM,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                  Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_SOCIAL_MEDIAS_FACEBOOK,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                  Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                ],
              )
            }
            {
              this.renderCastSheetMultipleInputItem(
                Constants.CAST_SHEET_KEY_SOCIAL_MEDIAS_YOUTUBE,
                [
                  Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                  Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                ],
              )
            }
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
        title: i18n.t('app.basic_information'),
        data: [''],
      },
      {
        title: i18n.t('app.appearance'),
        data: [''],
      },
      {
        title: i18n.t('app.experience'),
        data: [''],
      },
      {
        title: i18n.t('app.contacts'),
        data: [''],
      },
      {
        title: i18n.t('app.social_media'),
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
          <Footer style={styles.footer}>
            {
              /*
              <Button
                text={'Check Result'}
                onPress={() => {
                  // const { info } = store.getState().profileCastSheetEditionViewReducer.account;
                  //
                  // console.log('[info]', JSON.stringify(info));

                  const gender = ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_GENDER);
                  const dateOfBirth = ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_DATE_OF_BIRTH);
                  const hairColors = ProfileProcessor.fetchApiFields(Constants.CAST_SHEET_KEY_HAIR_COLORS);
                  const alma_maters = ProfileProcessor.fetchApiMultipleField(
                    Constants.CAST_SHEET_KEY_ALMA_MATERS,
                    [
                      Constants.CAST_SHEET_PROPERTY_KEY_SCHOOL_NAME,
                      Constants.CAST_SHEET_PROPERTY_KEY_MAJOR,
                    ],
                  );

                  // const address = {
                  //     type: 'Address',
                  //     category: '',
                  //     text: ProfileProcessor.fetchApiField(Constants.CAST_SHEET_KEY_CONTACTS_ADDRESS),
                  // };

                  const address = ProfileProcessor.fetchApiMultipleField(
                    Constants.CAST_SHEET_KEY_CONTACTS_ADDRESS,
                    [
                      Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                      Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                    ],
                  )
                    .map((item) => {
                      return {
                        ...item,
                        type: 'Address',
                      };
                    });

                  const contacts =
                  [
                      ...ProfileProcessor.fetchApiMultipleField(
                        Constants.CAST_SHEET_KEY_CONTACTS_ADDRESS,
                        [
                          Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                          Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                        ],
                      )
                        .map((item) => {
                          return {
                            ...item,
                            type: 'Address',
                          };
                        }),
                      ...ProfileProcessor.fetchApiMultipleField(
                        Constants.CAST_SHEET_KEY_CONTACTS_EMAIL,
                        [
                          Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                          Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                        ],
                      )
                        .map((item) => {
                          return {
                            ...item,
                            type: 'Email',
                          };
                        }),
                      ...ProfileProcessor.fetchApiMultipleField(
                        Constants.CAST_SHEET_KEY_CONTACTS_PHONE,
                        [
                          Constants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                          Constants.CAST_SHEET_PROPERTY_KEY_TEXT,
                        ],
                      )
                        .map((item) => {
                          return {
                            ...item,
                            type: 'Phone',
                          };
                        }),
                  ];

                  const agents = ProfileProcessor.fetchApiMultipleField(
                    Constants.CAST_SHEET_KEY_CONTACTS_AGENTS,
                    [
                      Constants.CAST_SHEET_PROPERTY_KEY_NAME,
                      Constants.CAST_SHEET_PROPERTY_KEY_PHONE,
                      Constants.CAST_SHEET_PROPERTY_KEY_EMAIL,
                      Constants.CAST_SHEET_PROPERTY_KEY_AGENT_STATUS,
                    ],
                  );

                  console.log('[gender]', gender);
                  console.log('[dateOfBirth]', dateOfBirth);
                  console.log('[hairColors]', hairColors);
                  console.log('[alma_maters]', alma_maters);
                  console.log('[address]', address);
                  console.log('[contacts]', contacts);
                  console.log('[agents]', agents);
                }}
              />
              */
            }
          </Footer>
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
    alignSelf: 'center',
  },
  castSheetContainer: {
    // backgroundColor: '#0f0',
    // alignItems: 'center',
    marginVertical: 16,
  },
  castSheetMultipleInputItemContainer: {
    // backgroundColor: '#0ff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.general.transparent,
    padding: 8,
    marginVertical: 8,
  },
  castSheetMultipleInputItemTitle: {
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.regular,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
  },
  castSheetMultipleInputItemPropertyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  castSheetMultipleInputItempropertyKeyContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  castSheetMultipleInputItempropertyKeyText: {
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.regular,
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  castSheetMultipleInputItemPropertyTagContainer: {
    // backgroundColor: '#0ff',
    flex: 1,
    alignItems: 'flex-start',
  },
  castSheetMultipleInputItemGroupFrame: {
    marginVertical: 8,
  },
  castSheetMultipleInputItemGroupFrameContentContainer: {
    alignItems: 'center',
  },
  castSheetMultipleInputItemAddButton: {
    backgroundColor: Theme.colors.general.transparent,
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.colors.background.secondary,
    marginVertical: 16,
    padding: 4,
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
