/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileInfoSetupSectionActionType } from '../../../types';

const initState = () => {
  return {
    numberOfIndicators: 3,
    photo: undefined,
    account: {
      info: {
        firstnameEn: undefined,
        lastnameEn: undefined,
        firstnameZh: undefined,
        lastnameZh: undefined,
        nickname: undefined,
      },
    },
  };
};

export default function profileInfoSetupSectionReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case ProfileInfoSetupSectionActionType.RESET:
      return initState();

    case ProfileInfoSetupSectionActionType.NUMBER_OF_INDICATORS:
      return {
        ...state,
        numberOfIndicators: action.numberOfIndicators,
      };

    case ProfileInfoSetupSectionActionType.PHOTO:
      return {
        ...state,
        photo: action.photo,
      };

    case ProfileInfoSetupSectionActionType.ACCOUNT_FIRSTNAME_EN:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            firstnameEn: action.firstnameEn,
          },
        },
      };

    case ProfileInfoSetupSectionActionType.ACCOUNT_LASTNAME_EN:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            lastnameEn: action.lastnameEn,
          },
        },
      };

    case ProfileInfoSetupSectionActionType.ACCOUNT_FIRSTNAME_ZH:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            firstnameZh: action.firstnameZh,
          },
        },
      };

    case ProfileInfoSetupSectionActionType.ACCOUNT_LASTNAME_ZH:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            lastnameZh: action.lastnameZh,
          },
        },
      };

    case ProfileInfoSetupSectionActionType.ACCOUNT_NICKNAME:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            nickname: action.nickname,
          },
        },
      };

    default:
      return state;
  }
}
