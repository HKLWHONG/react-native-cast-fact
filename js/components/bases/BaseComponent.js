/**
 * @format
 * @flow strict-local
 */

import { Component } from 'react';

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);

    console.log(`[${this.constructor.name}] Component did create.`);
  }

  componentDidMount() {
    const { state } = this;

    console.log(`[${this.constructor.name}] Component did mount.`);
  }

  componentWillUnmount() {
    const { state } = this;

    console.log(`[${this.constructor.name}] Component will unmount.`);
  }
}
