/**
 * @format
 * @flow strict-local
 */

import { store, ProfileStackNavigatorActionType } from '../../../../redux';

export const reset = () => (dispatch) => {
    dispatch({
        type: ProfileStackNavigatorActionType.RESET,
    });

    return Promise.resolve(store.getState());
};

export const setHiddenRight = (hiddenRight) => (dispatch) => {
    dispatch({
        type: ProfileStackNavigatorActionType.HIDDEN_RIGHT,
        hiddenRight: hiddenRight,
    });

    return Promise.resolve(store.getState());
};

export const setEnabledRight = (enabledRight) => (dispatch) => {
    dispatch({
        type: ProfileStackNavigatorActionType.ENABLED_RIGHT,
        enabledRight: enabledRight,
    });

    return Promise.resolve(store.getState());
};

export const addOnScreenAppear = (key, value) => (dispatch) => {
    dispatch({
        type: ProfileStackNavigatorActionType.ADD_ON_SCREEN_APPEAR,
        key: key,
        value: value,
    });

    return Promise.resolve(store.getState());
};

export const addOnRightButtonPress = (key, value) => (dispatch) => {
    dispatch({
        type: ProfileStackNavigatorActionType.ADD_ON_RIGHT_BUTTON_PRESS,
        key: key,
        value: value,
    });

    return Promise.resolve(store.getState());
};
