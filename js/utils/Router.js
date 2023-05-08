/**
 * @format
 * @flow strict-local
 */

import {
  CommonActions,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';

import { store, MainTabNavigatorAction } from '../redux';

const config = {
  coreStacks: [
    'LaunchView',
    'DrawerNavigator',
  ],
};

export const route = (props, stack, name) => {
  if (!props || !props.navigation || !props.navigation.dispatch) {
    return;
  }

  let isCoreStacks = false;

  config.coreStacks.forEach((item, i) => {
    if (item === stack) {
      isCoreStacks = true;
    }
  });

  if (isCoreStacks) {
    props.navigation.dispatch(StackActions.replace(stack));

    return;
  }

  let state;

  if (name) {
    if (Array.isArray(name)) {
      let routes = [];

      name.forEach((item, index) => {
        routes.push({ name: item });
      });

      state = { routes: routes };
    } else {
      state = { routes: [{ name: name }] };
    }
  }

  props.navigation.dispatch(
    CommonActions.reset({
      routes: [
        {
          name: 'MainTab',
          state: {
            routes: [
              {
                name: stack,
                state: state,
              },
            ],
          },
        },
      ],
    }),
  );

  if (stack === 'SearchStackNavigator') {
    store.dispatch(MainTabNavigatorAction.select(0));
  } else if (stack === 'Stub1') {
    // store.dispatch(MainTabNavigatorAction.select(1));
  } else if (stack === 'Stub2') {
    // store.dispatch(MainTabNavigatorAction.select(2));
  } else if (stack === 'Stub3') {
    // store.dispatch(MainTabNavigatorAction.select(3));
  }

  // if (
  //   stack !== 'LaunchView' &&
  //   stack !== 'LoginView' &&
  //   stack !== 'SignUpView'
  // ) {
  //   props.navigation.dispatch(DrawerActions.closeDrawer());
  // }
};

export const jumpTo = (props, stack, name, params) => {
  if (!props || !props.navigation || !props.navigation.jumpTo) {
    return;
  }

  props.navigation.jumpTo(stack, {
    screen: name,
    params: params,
  });

  // props.navigation.dispatch(DrawerActions.closeDrawer());
};

export const push = (props, stack, name, params) => {
  if (!props || !props.navigation || !props.navigation.navigate) {
    return;
  }

  let isCoreStacks = false;

  config.coreStacks.forEach((item, i) => {
    if (item === stack) {
      isCoreStacks = true;
    }
  });

  props.navigation.navigate(stack, {
    screen: name,
    params: params,
  });

  // if (!isCoreStacks) {
  //   props.navigation.dispatch(DrawerActions.closeDrawer());
  // }
};

export const popToTop = (props) => {
  if (!props || !props.navigation || !props.navigation.popToTop) {
    return;
  }

  props.navigation.popToTop();
};

export const goBack = (props) => {
  if (!props || !props.navigation || !props.navigation.goBack) {
    return;
  }

  props.navigation.goBack();
};

export const dismiss = (props) => {
  if (!props || !props.navigation || !props.navigation.canGoBack) {
    return;
  }

  popToTop(props);

  if (props.navigation.canGoBack()) {
    goBack(props);
  }
};
