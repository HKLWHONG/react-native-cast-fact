/**
 * @format
 * @flow strict-local
 */

import {
  CommonActions,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';

import { store, MainTabAction } from '../redux';

export const route = (props, stack, name) => {
  if (!props || !props.navigation) {
    return;
  }

  if (
    stack === 'Launch' ||
    stack === 'Login' ||
    stack === 'Main'
  ) {
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

  if (stack === 'FeedStack') {
    store.dispatch(MainTabAction.select(0));
  } else if (stack === 'Stub1Stack') {
    // store.dispatch(MainTabAction.select(1));
  } else if (stack === 'Stub2Stack') {
    // store.dispatch(MainTabAction.select(2));
  } else if (stack === 'Stub3Stack') {
    // store.dispatch(MainTabAction.select(3));
  }

  props.navigation.dispatch(DrawerActions.closeDrawer());
};

export const jumpTo = (props, stack, name, params) => {
  if (!props || !props.navigation) {
    return;
  }

  props.navigation.jumpTo(stack, {
    screen: name,
    params: params,
  });

  props.navigation.dispatch(DrawerActions.closeDrawer());
};

export const push = (props, stack, name, params) => {
  if (!props || !props.navigation) {
    return;
  }

  props.navigation.navigate(stack, {
    screen: name,
    params: params,
  });

  props.navigation.dispatch(DrawerActions.closeDrawer());
};

export const goBack = (props) => {
  if (!props || !props.navigation) {
    return;
  }

  props.navigation.goBack();
};
