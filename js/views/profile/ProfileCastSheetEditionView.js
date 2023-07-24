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
  SettingsStackNavigatorAction,
  CalendarModalViewAction,
  ProfileInfoSetupViewAction,
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
  SimpleList,
} from '../../components';

import {
  ProfileInfoSetupView,
  CastSheetItem,
  TextInput,
  Tag,
  Button,
  GroupFrame,
  Separator,
} from '../../project-components';

import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

import { AppRegex } from '../../regex';

import { Theme, Router } from '../../utils';

import {
  CalendarProcessor,
  ProfileProcessor,
  StringProcessor,
} from '../../processors';

import {
  AuthProvider,
  UserProvider,
} from '../../providers';

import {
  CastSheetConstants,
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

    if (props.userProfile) {
      console.log('[userProfile]', JSON.stringify(props.userProfile));

      let info = store.getState().profileCastSheetEditionViewReducer.account.info;

      CastSheetConstants.CAST_SHEET_INFO.forEach((category) => {
        category.keys.forEach((key) => {
          if (key.isMultiple && key.properties) {
            info = this.fetchProfileMultipleField(info, key.name);
          } else if (key.isMultiple) {
            info = this.fetchProfileFields(info, key.name);
          } else {
            info = this.fetchProfileField(info, key.name);
          }
        });
      });

      props.setAccountInfo(info);

      props.addSettingsStackNavigatorOnScreenAppear(IDENTIFIER, () => {
        props.setSettingsStackNavigatorEnabledRight(true);
      });

      props.addSettingsStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
        console.log('[signUpViewAccount]', props.signUpViewAccount);
        console.log('[profileInfoSetupViewAccount]', props.profileInfoSetupViewAccount);
        console.log('[profileInfoSetupViewPhoto]', props.profileInfoSetupViewPhoto);
        console.log('[profileCastSheetEditionAccount]', JSON.stringify(store.getState().profileCastSheetEditionViewReducer.account));

        let profile = props.userProfile;

        CastSheetConstants.CAST_SHEET_INFO.forEach((category) => {
          category.keys.forEach((key) => {
            if (key.super && key.isMultiple && key.properties) {
              profile = {
                ...profile,
                [key.super]: [
                  ...(profile[key.super] || []),
                  ...ProfileProcessor.fetchApiMultipleField(key.name, key.properties)
                    .map((item) => {
                      return {
                        ...item,
                        type: StringProcessor.toCapitalize(key.name),
                      };
                  }),
                ],
              };
            } else if (key.isMultiple && key.properties) {
              profile = {
                ...profile,
                [key.name]: ProfileProcessor.fetchApiMultipleField(key.name, key.properties),
              };
            } else if (key.isMultiple) {
              profile = {
                ...profile,
                [key.name]: ProfileProcessor.fetchApiFields(key.name),
              };
            } else {
              profile = {
                ...profile,
                [key.name]: ProfileProcessor.fetchApiField(key.name),
              };
            }
          });
        });

        console.log('[profile]', profile);

        console.log('call api...');

        UserProvider.updateProfile(
          props,
          profile,
        )
          .then((params) => {
            Router.popToTop(props);
          })
          .catch((error) => {
            console.error(error);

            Alert.alert(i18n.t('app.system_error'), i18n.t('app.error.general_message'));
          });
      });
    } else {
      props.addSignUpStackNavigatorOnScreenAppear(IDENTIFIER, () => {
        props.setSignUpStackNavigatorEnabledRight(true);
      });

      props.addSignUpStackNavigatorOnRightButtonPress(IDENTIFIER, () => {
        console.log('[signUpViewAccount]', props.signUpViewAccount);
        console.log('[profileInfoSetupViewAccount]', props.profileInfoSetupViewAccount);
        console.log('[profileInfoSetupViewPhoto]', props.profileInfoSetupViewPhoto);
        console.log('[profileCastSheetEditionAccount]', JSON.stringify(store.getState().profileCastSheetEditionViewReducer.account));

        let profile = {
            firstname_en: props.profileInfoSetupViewAccount.info.firstnameEn || '',
            lastname_en: props.profileInfoSetupViewAccount.info.lastnameEn || '',
            firstname_zh: props.profileInfoSetupViewAccount.info.firstnameZh || '',
            lastname_zh: props.profileInfoSetupViewAccount.info.lastnameZh || '',
            nickname: props.profileInfoSetupViewAccount.info.nickname || '',
            name_display_format: props.profileInfoSetupViewAccount.info.displayFormat.toString(),
        };

        CastSheetConstants.CAST_SHEET_INFO.forEach((category) => {
          category.keys.forEach((key) => {
            if (key.super && key.isMultiple && key.properties) {
              profile = {
                ...profile,
                [key.super]: [
                  ...ProfileProcessor.fetchApiMultipleField(key.name, key.properties)
                    .map((item) => {
                      return {
                        ...item,
                        type: StringProcessor.toCapitalize(key.name),
                      };
                  }),
                ],
              };
            } else if (key.isMultiple && key.properties) {
              profile = {
                ...profile,
                [key.name]: ProfileProcessor.fetchApiMultipleField(key.name, key.properties),
              };
            } else if (key.isMultiple) {
              profile = {
                ...profile,
                [key.name]: ProfileProcessor.fetchApiFields(key.name),
              };
            } else {
              profile = {
                ...profile,
                [key.name]: ProfileProcessor.fetchApiField(key.name),
              };
            }
          });
        });

        UserProvider.createAndLinkProfile(
          props,
          [profile],
        )
          .then(() => {
            if (
              store.getState().profileInfoSetupViewReducer.source
              &&
              store.getState().profileInfoSetupViewReducer.source.photo
              &&
              store.getState().profileInfoSetupViewReducer.source.photo.path
              &&
              store.getState().profileInfoSetupViewReducer.source.photo.mime
            ) {
              UserProvider.uploadProfileImage(
                props,
                {
                  key: 'image_path',
                  uri: 'file://' + store.getState().profileInfoSetupViewReducer.source.photo.path,
                  type: store.getState().profileInfoSetupViewReducer.source.photo.mime,
                },
              )
                .then((params) => {
                  this.login();
                })
                .catch((error) => {
                  console.error(error);

                  Alert.alert(
                    i18n.t('app.system_error'),
                    i18n.t('app.error.image_upload_message'),
                    [
                      {
                        text: i18n.t('app.ok').toUpperCase(),
                        onPress: () => {
                          props.setProfileInfoSetupViewSource(undefined);

                          this.login();
                        },
                      },
                    ],
                  );
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
    }
  };

  clearData = () => {
    const { props } = this;

    props.reset();
  };

  login = () => {
    const { props } = this;

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

  fetchProfileField = (info, key) => {
    const { props } = this;

    if (!props.userProfile || !props.userProfile[key]) {
      return info;
    }

    let tags =  [{
        tagId: '0',
        text: props.userProfile[key],
    }];

    return {
      ...info,
      [key]: {
        ...info[key],
        tags: tags,
        text: undefined,
        state: undefined,
      },
    };
  };

  fetchProfileFields = (info, key) => {
    const { props } = this;

    if (!props.userProfile || !props.userProfile[key]) {
      return info;
    }

    let tags = props.userProfile[key].map((tag, index) => {
      return {
        tagId: index.toString(),
        text: tag.text,
      };
    });

    return {
      ...info,
      [key]: {
        ...info[key],
        tags: tags,
        text: undefined,
        state: undefined,
      },
    };
  };

  fetchProfileMultipleField = (info, key) => {
    const { props } = this;

    if (!props.userProfile || !props.userProfile[key]) {
      return info;
    }

    tags = props.userProfile[key].map((tag, index) => {
      return Object.keys(tag).map((item) => {
        return {
          key: item,
          text: tag[item],
        }
      });
    });

    const groupFrames = tags.map((tag, index) => {
      const data = tag.map((property) => {
        return {
          key: property.key,
          text: property.text,
        };
      });

      return {
        groupFrameId: index.toString(),
        data: data,
      };
    });

    return {
      ...info,
      [key]: {
        ...info[key],
        groupFrames: groupFrames,
      },
    };
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

  renderCastSheetInputItem = (index, key, multiple) => {
    const { props } = this;

    if (!props.account.info) {
      return;
    }

    const info = props.account.info[key];
    const list = ProfileProcessor.fetchTagSuggessionList(key);

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
          onFocus={(info) => {
            const { textInputRef } = info;

            props.setFocusedTag({
              key: key,
              textInputRef: textInputRef,
            });

            props.addAccountInfo(key, {
              ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
              state: 'attention',
            });
          }}
          onBlur={() => {
            props.setFocusedTag(undefined);

            props.addAccountInfo(key, {
              ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
              tags: ProfileProcessor.addTag(key, text, state),
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
      <Translation key={index.toString()}>
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

  renderCastSheetDateItem = (index, key) => {
    const { props } = this;

    if (!props.account.info) {
      return;
    }

    const info = props.account.info[key];

    let tags = [{
      tagId: '0',
    }];
    let text = undefined;
    let visible = undefined;

    if (info) {
      tags = (info.tags && info.tags.length > 0) ? info.tags : tags;
      visible = info.visible;
    }

    let children = (
      Array(tags.length)
        .fill()
        .map((_, i) => i)
        .map((i) => {
          const info = tags[i];

          if (info.text && info.text.length > 0) {
            text = CalendarProcessor.formatDate(new Date(info.text));
          }

          return (
            <Tag
              key={i.toString()}
              info={info}
              style={styles.tag}
              type="input"
              text={text}
              rightAccessoryType="delete"
              editable={false}
              pressable
              onPress={() => {
                let initialDate = CalendarProcessor.toDateString(CalendarProcessor.formatDate(new Date()));

                if (text) {
                  initialDate = CalendarProcessor.toDateString(text);
                }

                props.setCalendarModalViewInitialDate(initialDate);

                props.setCalendarModalViewOnDayPress((date) => {
                  props.addAccountInfo(key, {
                    ...store.getState().profileCastSheetEditionViewReducer.account.info[key],
                    tags: ProfileProcessor.addTag(key, date.dateString),
                  });
                });

                Router.push(props, 'CalendarModalView');
              }}
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

    return (
      <Translation key={index.toString()}>
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

  renderCastSheetMultipleInputItem = (index, key, propertyList = []) => {
    const { props } = this;

    const groupFrames = ProfileProcessor.fetchGroupFrames(key).filter((groupFrame) => {
      return (
        groupFrame.groupFrameId !== 'input'
        &&
        !groupFrame.groupFrameId.startsWith('deleted')
      );
    });

    // const list = CastSheetConstants.CAST_SHEET_WHITE_LIST[key] || [];

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
      <Translation key={index.toString()}>
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

  renderCategoryContainer = (name, params) => {
    const { props } = this;
    const { item, index, section, separators } = params;

    let info = CastSheetConstants.CAST_SHEET_INFO.filter((category) => {
      return category.name === name;
    });

    let children = undefined;

    if (info.length > 0) {
      info = info[0];

      children = (
        Array(info.keys.length)
          .fill()
          .map((_, i) => i)
          .map((i) => {
            const key = info.keys[i];

            if (key.isMultiple && key.properties) {
              return this.renderCastSheetMultipleInputItem(i, key.name, key.properties);
            } else if (key.isDate) {
              return this.renderCastSheetDateItem(i, key.name);
            }

            return this.renderCastSheetInputItem(i, key.name, key.isMultiple);
          })
      );
    }

    return (
      <Translation>
        {(t) => (
          <View style={styles.castSheetContainer}>
            <Text style={styles.subtitle}>
              {section.title}
            </Text>
            {children}
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
        return this.renderCategoryContainer(CastSheetConstants.CAST_SHEET_CATEGORY_KEY_BASIC_INFORMATION, params);

      case 2:
        return this.renderCategoryContainer(CastSheetConstants.CAST_SHEET_CATEGORY_KEY_APPEARANCE, params);

      case 3:
        return this.renderCategoryContainer(CastSheetConstants.CAST_SHEET_CATEGORY_KEY_EXPERIENCE, params);

      case 4:
        return this.renderCategoryContainer(CastSheetConstants.CAST_SHEET_CATEGORY_KEY_CONTACTS, params);

      case 5:
        return this.renderCategoryContainer(CastSheetConstants.CAST_SHEET_CATEGORY_KEY_SOCIAL_MEDIA, params);

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
        title: i18n.t(`app.${CastSheetConstants.CAST_SHEET_CATEGORY_KEY_BASIC_INFORMATION}`),
        data: [''],
      },
      {
        title: i18n.t(`app.${CastSheetConstants.CAST_SHEET_CATEGORY_KEY_APPEARANCE}`),
        data: [''],
      },
      {
        title: i18n.t(`app.${CastSheetConstants.CAST_SHEET_CATEGORY_KEY_EXPERIENCE}`),
        data: [''],
      },
      {
        title: i18n.t(`app.${CastSheetConstants.CAST_SHEET_CATEGORY_KEY_CONTACTS}`),
        data: [''],
      },
      {
        title: i18n.t(`app.${CastSheetConstants.CAST_SHEET_CATEGORY_KEY_SOCIAL_MEDIAS}`),
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
                  const { props } = this;
                  // const gender = ProfileProcessor.fetchApiField(CastSheetConstants.CAST_SHEET_KEY_GENDER);
                  // const dateOfBirth = ProfileProcessor.fetchApiField(CastSheetConstants.CAST_SHEET_KEY_DATE_OF_BIRTH);
                  // const hairColors = ProfileProcessor.fetchApiFields(CastSheetConstants.CAST_SHEET_KEY_HAIR_COLORS);
                  // const alma_maters = ProfileProcessor.fetchApiMultipleField(
                  //   CastSheetConstants.CAST_SHEET_KEY_ALMA_MATERS,
                  //   [
                  //     CastSheetConstants.CAST_SHEET_PROPERTY_KEY_SCHOOL,
                  //     CastSheetConstants.CAST_SHEET_PROPERTY_KEY_MAJOR,
                  //   ],
                  // );
                  //
                  // const address = ProfileProcessor.fetchApiMultipleField(
                  //   CastSheetConstants.CAST_SHEET_KEY_ADDRESS,
                  //   [
                  //     CastSheetConstants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                  //     CastSheetConstants.CAST_SHEET_PROPERTY_KEY_TEXT,
                  //   ],
                  // )
                  //   .map((item) => {
                  //     return {
                  //       ...item,
                  //       type: 'Address',
                  //     };
                  //   });
                  //
                  // const contacts =
                  // [
                  //     ...ProfileProcessor.fetchApiMultipleField(
                  //       CastSheetConstants.CAST_SHEET_KEY_ADDRESS,
                  //       [
                  //         CastSheetConstants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                  //         CastSheetConstants.CAST_SHEET_PROPERTY_KEY_TEXT,
                  //       ],
                  //     )
                  //       .map((item) => {
                  //         return {
                  //           ...item,
                  //           type: 'Address',
                  //         };
                  //       }),
                  //     ...ProfileProcessor.fetchApiMultipleField(
                  //       CastSheetConstants.CAST_SHEET_KEY_EMAIL,
                  //       [
                  //         CastSheetConstants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                  //         CastSheetConstants.CAST_SHEET_PROPERTY_KEY_TEXT,
                  //       ],
                  //     )
                  //       .map((item) => {
                  //         return {
                  //           ...item,
                  //           type: 'Email',
                  //         };
                  //       }),
                  //     ...ProfileProcessor.fetchApiMultipleField(
                  //       CastSheetConstants.CAST_SHEET_KEY_PHONE,
                  //       [
                  //         CastSheetConstants.CAST_SHEET_PROPERTY_KEY_CATEGORY,
                  //         CastSheetConstants.CAST_SHEET_PROPERTY_KEY_TEXT,
                  //       ],
                  //     )
                  //       .map((item) => {
                  //         return {
                  //           ...item,
                  //           type: 'Phone',
                  //         };
                  //       }),
                  // ];
                  //
                  // const agents = ProfileProcessor.fetchApiMultipleField(
                  //   CastSheetConstants.CAST_SHEET_KEY_AGENTS,
                  //   [
                  //     CastSheetConstants.CAST_SHEET_PROPERTY_KEY_NAME,
                  //     CastSheetConstants.CAST_SHEET_PROPERTY_KEY_PHONE,
                  //     CastSheetConstants.CAST_SHEET_PROPERTY_KEY_EMAIL,
                  //     CastSheetConstants.CAST_SHEET_PROPERTY_KEY_AGENT_STATUS,
                  //   ],
                  // );
                  //
                  // console.log('[gender]', gender);
                  // console.log('[dateOfBirth]', dateOfBirth);
                  // console.log('[hairColors]', hairColors);
                  // console.log('[alma_maters]', alma_maters);
                  // console.log('[address]', address);
                  // console.log('[contacts]', contacts);
                  // console.log('[agents]', agents);

                  // let gender = ProfileProcessor.fetchTagSuggessionList(CastSheetConstants.CAST_SHEET_KEY_GENDER);
                  // console.log('[gender]', JSON.stringify(gender));
                }}
              />
              */
            }
          </Footer>
        )}
      </Translation>
    );
  };

  renderItemOfKeyboardAccessoryView = (params) => {
    const { props } = this;
    const { item, index, separators } = params;

    const { key, textInputRef } = props.focusedTag;

    const { text } = item;

    return (
      <Translation>
        {(t) => (
          <Tag
            key={index.toString()}
            style={styles.tag}
            text={text}
            onPress={() => {
              props.setFocusedTag(undefined);

              if (textInputRef.isFocused()) {
                textInputRef.blur();
              }

              let tags = (
                (
                  store.getState().profileCastSheetEditionViewReducer.account.info[key]
                  &&
                  store.getState().profileCastSheetEditionViewReducer.account.info[key].tags
                )
                ||
                []
              );

              if (text && text.length > 0) {
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
          />
        )}
      </Translation>
    );
  };

  renderKeyboardAccessoryView = () => {
    const { props } = this;

    console.log('[props.focusedTag]', props.focusedTag);

    if (!props.focusedTag) {
      return;
    }

    const { key } = props.focusedTag;

    const data = ProfileProcessor.fetchTagSuggessionList(key).map((text) => {
      return {
        text: text,
      };
    });

    return (
      <Translation>
        {(t) => (
          <KeyboardAccessoryView
            style={styles.keyboardAccessoryView}
            androidAdjustResize
          >
            {({ isKeyboardVisible }) => {
              return (
                <View style={styles.barContainer}>
                  <View style={styles.barSubContainer}>
                    <Text
                      style={styles.barText}
                    >
                      {t('app.suggested')}
                    </Text>
                  </View>
                  <Separator />
                  <View style={styles.barSubContainer}>
                    <SimpleList
                      data={data}
                      renderItem={this.renderItemOfKeyboardAccessoryView}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyboardAwareDisabled
                    />
                  </View>
                </View>
              );
            }}
          </KeyboardAccessoryView>
        )}
      </Translation>
    );
  };

  render() {
    return (
      <Translation>
        {(t) => (
          <Root style={styles.root}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
            {this.renderKeyboardAccessoryView()}
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
  keyboardAccessoryView: {
    backgroundColor: Theme.colors.general.transparent,
  },
  barContainer: {
    // backgroundColor: '#f00',
    backgroundColor: Theme.colors.background.primary,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.decorations.splitline,
  },
  barSubContainer: {
    // backgroundColor: '#00f',
    flexDirection: 'row',
    padding: 8,
  },
  barText: {
    color: Theme.colors.text.subtitle,
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    textTransform: 'uppercase',
  },
});

function mapStateToProps(state) {
  return {
    account: state.profileCastSheetEditionViewReducer.account,
    focusedTag: state.profileCastSheetEditionViewReducer.focusedTag,
    signUpViewAccount: state.signUpViewReducer.account,
    profileInfoSetupViewAccount: state.profileInfoSetupViewReducer.account,
    profileInfoSetupViewPhoto: state.profileInfoSetupViewReducer.photo,
    userProfile: state.dataReducer.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: (...args) => dispatch(ProfileCastSheetEditionViewAction.reset(...args)),
    setAccountInfo: (...args) => dispatch(ProfileCastSheetEditionViewAction.setAccountInfo(...args)),
    addAccountInfo: (...args) => dispatch(ProfileCastSheetEditionViewAction.addAccountInfo(...args)),
    deleteAccountInfo: (...args) => dispatch(ProfileCastSheetEditionViewAction.deleteAccountInfo(...args)),
    setFocusedTag: (...args) => dispatch(ProfileCastSheetEditionViewAction.setFocusedTag(...args)),
    setSignUpStackNavigatorEnabledRight: (...args) => dispatch(SignUpStackNavigatorAction.setEnabledRight(...args)),
    addSignUpStackNavigatorOnScreenAppear: (...args) => dispatch(SignUpStackNavigatorAction.addOnScreenAppear(...args)),
    addSignUpStackNavigatorOnRightButtonPress: (...args) => dispatch(SignUpStackNavigatorAction.addOnRightButtonPress(...args)),
    addSettingsStackNavigatorOnScreenAppear: (...args) => dispatch(SettingsStackNavigatorAction.addOnScreenAppear(...args)),
    setSettingsStackNavigatorEnabledRight: (...args) => dispatch(SettingsStackNavigatorAction.setEnabledRight(...args)),
    addSettingsStackNavigatorOnRightButtonPress: (...args) => dispatch(SettingsStackNavigatorAction.addOnRightButtonPress(...args)),
    setCalendarModalViewInitialDate: (...args) => dispatch(CalendarModalViewAction.setInitialDate(...args)),
    setCalendarModalViewOnDayPress: (...args) => dispatch(CalendarModalViewAction.setOnDayPress(...args)),
    setProfileInfoSetupViewSource: (...args) => dispatch(ProfileInfoSetupViewAction.setSource(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCastSheetEditionView);
