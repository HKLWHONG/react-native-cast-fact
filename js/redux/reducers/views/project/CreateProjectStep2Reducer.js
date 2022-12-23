/**
 * @format
 * @flow strict-local
 */

import { CommonActionType, CreateProjectStep2ActionType } from '../../../types';

import { CalendarProcessor } from '../../../../processors';

function initState() {
  return {
    data: {
      availabilities: [],
    },
  };
}

export default function createProjectStep2Reducer(state = initState(), action) {
  switch (action.type) {
    case CommonActionType.DESTROY_SESSION:
      return initState();

    case CreateProjectStep2ActionType.RESET:
      return initState();

    case CreateProjectStep2ActionType.ADD_AVAILABILITY:
    {
      if (!action.availability) {
        return;
      }

      state.data.availabilities.push({
        availabilityId: state.data.availabilities.length,
        ...action.availability,
      });

      return {
        ...state,
        data: {
          ...state.data,
          availabilities: [...state.data.availabilities],
        },
      };
    }

    case CreateProjectStep2ActionType.UPDATE_AVAILABILITY:
    {
      let availabilities = state.data.availabilities.map((availability) => {
        if (availability.availabilityId == action.availabilityId) {
          availability = {
            ...availability,
            ...action.object,
          };
        }

        return availability;
      });

      return {
        ...state,
        data: {
          ...state.data,
          availabilities: availabilities,
        },
      };
    }

    case CreateProjectStep2ActionType.DELETE_AVAILABILITY:
    {
      let availabilities = state.data.availabilities.filter((availability) => {
        return availability.availabilityId != action.availabilityId;
      });

      return {
        ...state,
        data: {
          ...state.data,
          availabilities: availabilities,
        },
      };
    }

    default:
      return state;
  }
}
