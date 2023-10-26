import { CommonActionType, ProfileStackNavigatorActionType } from '../../../types';

const initState = () => {
    return {
        hiddenRight: false,
        enabledRight: false,
        callbacks: {
            onScreenAppearList: {},
            onRightButtonPressList: {},
        },
    };
};

export default function profileStackNavigatorReducer(state = initState(), action) {
    switch (action.type) {
        case CommonActionType.DESTROY_SESSION:
            return initState();

        case ProfileStackNavigatorActionType.RESET:
            return initState();

        case ProfileStackNavigatorActionType.HIDDEN_RIGHT:
            return {
                ...state,
                hiddenRight: action.hiddenRight,
            };

        case ProfileStackNavigatorActionType.ENABLED_RIGHT:
            return {
                ...state,
                enabledRight: action.enabledRight,
            };

        case ProfileStackNavigatorActionType.ADD_ON_SCREEN_APPEAR:
            if (!action.key) {
                return state;
            }

            state.callbacks.onScreenAppearList[action.key] = action.value;

            return state;

        case ProfileStackNavigatorActionType.ADD_ON_RIGHT_BUTTON_PRESS:
            if (!action.key) {
                return state;
            }

            state.callbacks.onRightButtonPressList[action.key] = action.value;

            return state;

        default:
            return state;
    }
}
