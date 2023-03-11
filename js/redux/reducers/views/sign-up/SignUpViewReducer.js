/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, SignUpViewActionType } from '../../../types';

const initState = () => {
  return {
    refs: {},
    account: {
      info: {
        // firstnameEn: undefined,
        // lastnameEn: undefined,
        // firstnameZh: undefined,
        // lastnameZh: undefined,
        // nickname: undefined,
        phoneCode: '+852',
        phoneNumber: undefined,
      },
      credentials: {
        email: 'castfact-tester@gmail.com',
        password: 'a123456789A!',
      },
    },
    validation: {
      length: false,
      symbol: false,
      lowerCase: false,
      upperCase: false,
    },
  };
};

export default function signUpViewReducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case SignUpViewActionType.RESET:
      return initState();

    case SignUpViewActionType.ADD_REF:
      if (!action.key) {
        return state;
      }

      state.refs[action.key] = action.value;

      return state;

    // case SignUpViewActionType.ACCOUNT_FIRSTNAME_EN:
    //   return {
    //     ...state,
    //     account: {
    //       ...state.account,
    //       info: {
    //         ...state.account.info,
    //         firstnameEn: action.firstnameEn,
    //       },
    //     },
    //   };
    //
    // case SignUpViewActionType.ACCOUNT_LASTNAME_EN:
    //   return {
    //     ...state,
    //     account: {
    //       ...state.account,
    //       info: {
    //         ...state.account.info,
    //         lastnameEn: action.lastnameEn,
    //       },
    //     },
    //   };
    //
    // case SignUpViewActionType.ACCOUNT_FIRSTNAME_ZH:
    //   return {
    //     ...state,
    //     account: {
    //       ...state.account,
    //       info: {
    //         ...state.account.info,
    //         firstnameZh: action.firstnameZh,
    //       },
    //     },
    //   };
    //
    // case SignUpViewActionType.ACCOUNT_LASTNAME_ZH:
    //   return {
    //     ...state,
    //     account: {
    //       ...state.account,
    //       info: {
    //         ...state.account.info,
    //         lastnameZh: action.lastnameZh,
    //       },
    //     },
    //   };
    //
    // case SignUpViewActionType.ACCOUNT_NICKNAME:
    //   return {
    //     ...state,
    //     account: {
    //       ...state.account,
    //       info: {
    //         ...state.account.info,
    //         nickname: action.nickname,
    //       },
    //     },
    //   };

    case SignUpViewActionType.ACCOUNT_EMAIL:
      return {
        ...state,
        account: {
          ...state.account,
          credentials: {
            ...state.account.credentials,
            email: action.email,
          },
        },
      };

    case SignUpViewActionType.ACCOUNT_PHONE_CODE:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            phoneCode: action.phoneCode,
          },
        },
      };

    case SignUpViewActionType.ACCOUNT_PHONE_NUMBER:
      return {
        ...state,
        account: {
          ...state.account,
          info: {
            ...state.account.info,
            phoneNumber: action.phoneNumber,
          },
        },
      };

    case SignUpViewActionType.ACCOUNT_PASSWORD:
      return {
        ...state,
        account: {
          ...state.account,
          credentials: {
            ...state.account.credentials,
            password: action.password,
          },
        },
      };

    case SignUpViewActionType.ACCOUNT_PASSWORD_VALIDATION_LENGTH:
      return {
        ...state,
        validation: {
          ...state.validation,
          length: action.passwordValidationLength,
        },
      };

    case SignUpViewActionType.ACCOUNT_PASSWORD_VALIDATION_SYMBOL:
      return {
        ...state,
        validation: {
          ...state.validation,
          symbol: action.passwordValidationSymbol,
        },
      };

    case SignUpViewActionType.ACCOUNT_PASSWORD_VALIDATION_LOWER_CASE:
      return {
        ...state,
        validation: {
          ...state.validation,
          lowerCase: action.passwordValidationLowerCase,
        },
      };

    case SignUpViewActionType.ACCOUNT_PASSWORD_VALIDATION_UPPER_CASE:
      return {
        ...state,
        validation: {
          ...state.validation,
          upperCase: action.passwordValidationUpperCase,
        },
      };

    default:
      return state;
  }
}
