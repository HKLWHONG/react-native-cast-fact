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

const config = {
  coreStacks: [
    'Launch',
    'Login',
    'SignUp',
    'Main',
  ],
};

export const route = (props, stack, name) => {
  if (!props || !props.navigation) {
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

  if (stack === 'SearchStack') {
    store.dispatch(MainTabAction.select(0));
  } else if (stack === 'Stub1Stack') {
    // store.dispatch(MainTabAction.select(1));
  } else if (stack === 'Stub2Stack') {
    // store.dispatch(MainTabAction.select(2));
  } else if (stack === 'Stub3Stack') {
    // store.dispatch(MainTabAction.select(3));
  }

  // if (
  //   stack !== 'Launch' &&
  //   stack !== 'Login' &&
  //   stack !== 'SignUp'
  // ) {
  //   props.navigation.dispatch(DrawerActions.closeDrawer());
  // }
};

export const jumpTo = (props, stack, name, params) => {
  if (!props || !props.navigation) {
    return;
  }

  props.navigation.jumpTo(stack, {
    screen: name,
    params: params,
  });

  // props.navigation.dispatch(DrawerActions.closeDrawer());
};

export const push = (props, stack, name, params) => {
  if (!props || !props.navigation) {
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
  if (!props || !props.navigation) {
    return;
  }

  props.navigation.popToTop();
};

export const goBack = (props) => {
  if (!props || !props.navigation) {
    return;
  }

  props.navigation.goBack();
};
