/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, ProfileInfoSetupViewActionType } from '../../../types';

const initState = () => {
  return {
    numberOfIndicators: 0,
    source: undefined,
    account: {
      info: {
        firstnameEn: undefined,
        lastnameEn: undefined,
        firstnameZh: undefined,
        lastnameZh: undefined,
        nickname: undefined,
        displayFormat: undefined,
      },
    },
  };
};

export default function profileInfoSetupViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case ProfileInfoSetupViewActionType.RESET:
      return initState();

    case ProfileInfoSetupViewActionType.NUMBER_OF_INDICATORS:
      return {
        ...state,
        numberOfIndicators: action.numberOfIndicators,
      };

    case ProfileInfoSetupViewActionType.SOURCE:
      return {
        ...state,
        source: action.source,
      };

    case ProfileInfoSetupViewActionType.ACCOUNT_FIRSTNAME_EN:
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

    case ProfileInfoSetupViewActionType.ACCOUNT_LASTNAME_EN:
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

    case ProfileInfoSetupViewActionType.ACCOUNT_FIRSTNAME_ZH:
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

    case ProfileInfoSetupViewActionType.ACCOUNT_LASTNAME_ZH:
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

    case ProfileInfoSetupViewActionType.ACCOUNT_NICKNAME:
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

    case ProfileInfoSetupViewActionType.ACCOUNT_DISPLAY_FORMAT:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            displayFormat: action.displayFormat,
          },
        },
      };

    default:
      return state;
  }
}
