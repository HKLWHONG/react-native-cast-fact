/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, AppActionType } from '../types';

const initialState = {
  activityIndicatorProps: {
    hidden: true,
    message: undefined,
    counter: 0,
    options: {
      holder: undefined,
    },
  },
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return {
        ...initialState,
        activityIndicatorProps: state.activityIndicatorProps,
      };

    case AppActionType.ACTIVITY_INDICATOR:
      let hidden = state.activityIndicatorProps.message;
      let message = state.activityIndicatorProps.message;
      let counter = state.activityIndicatorProps.counter;
      let options = state.activityIndicatorProps.options;

      if (options.holder && options.holder.length) {
        if (action.options && action.options.holder === options.holder) {
          if (action.hidden) {
            options.holder = undefined;
            counter = 0;
          }
        } else {
          console.log(
            `[activity-indicator-error] Already held by ${options.holder}.`,
          );
        }
      } else {
        if (
          action.options &&
          action.options.holder &&
          action.options.holder.length
        ) {
          if (action.hidden) {
            console.log(
              `[activity-indicator-error] Not hold by ${action.options.holder}.`,
            );
          } else {
            options.holder = action.options.holder;
            counter = 1;
          }
        } else {
          if (action.hidden) {
            counter -= 1;
          } else {
            counter += 1;
          }
        }
      }

      if (counter > 0) {
        hidden = false;

        if (!action.hidden) {
          message = action.message;
        }
      } else {
        hidden = true;
        message = undefined;
        counter = 0;
      }

      // console.log('[activity-indicator-props-action]', action);
      //
      // console.log(`[activity-indicator-props-hidden] ${hidden}`);
      // console.log(`[activity-indicator-props-message] ${message}`);
      console.log(`[activity-indicator-props-counter] ${counter}`);
      console.log('[activity-indicator-props-options]', options);

      return {
        ...state,
        activityIndicatorProps: {
          hidden: hidden,
          message: message,
          counter: counter,
          options: options,
        },
      };

    default:
      return state;
  }
}
