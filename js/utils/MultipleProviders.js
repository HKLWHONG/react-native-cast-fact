/**
 * @format
 * @flow strict-local
 */

import { store, AppAction } from '../redux';

import i18n from '../../i18n';

const LOGGING = false;

export default class MultipleProviders {
  constructor(props) {
    this.props = props;

    this.taskId = 0;

    this.taskList = [];

    this.isRunning = false;
  }

  get = (block, params, options) => {
    if (LOGGING) {
      console.log(`[get] Id=${this.taskId + 1}`);
    }

    if (this.taskList.length === 0) {
      store.dispatch(AppAction.showActivityIndicator(i18n.t('app.loading')));
    }

    this.taskList.push({
      id: (this.taskId += 1),
      block: block,
      params: params,
      options: options,
      completed: false,
    });

    if (LOGGING) {
      console.log('[get-task-list]', this.taskList);
    }

    this.run(this.fetch());

    return this;
  };

  then = (block) => {
    if (LOGGING) {
      console.log('[then]');
    }

    const task = this.fetch(this.taskId);

    if (!task) {
      if (LOGGING) {
        console.log('[then-error] Task not found.');
      }

      return this;
    }

    task.thenBlock = block;

    if (LOGGING) {
      console.log(`[then-assign] Id=${task.id}`);
    }

    return this;
  };

  catch = (block) => {
    if (LOGGING) {
      console.log('[catch]');
    }

    this.catchBlock = block;

    return this;
  };

  done = (doneBlock) => {
    if (LOGGING) {
      console.log('[done]');
    }

    this.doneBlock = () => {
      if (this.taskList.length) {
        store.dispatch(AppAction.hideActivityIndicator());
      }

      if (doneBlock) {
        doneBlock();
      }
    };
  };

  fetch = (taskId) => {
    let task;

    for (const item of this.taskList) {
      if (taskId) {
        if (item.id !== taskId) {
          continue;
        }
      } else {
        if (item.completed) {
          continue;
        }
      }

      task = item;

      break;
    }

    if (LOGGING && task) {
      console.log(`[fetch] Id=${task.id}`);
    }

    return task;
  };

  run = (task) => {
    if (!task || this.isRunning) {
      if (LOGGING && this.isRunning) {
        console.log('[run-error] There is already been running a task...');
      }

      if (!task) {
        if (LOGGING) {
          console.log('[run-done]', this.taskList);
        }

        if (this.doneBlock) {
          this.doneBlock();
        }
      }

      return;
    }

    if (LOGGING) {
      console.log(`[run-start] Id=${task.id}`);
    }

    this.isRunning = true;

    task
      .block(this.props, task.params, {
        ...task.options,
        disableActivityIndicator: true,
      })
      .then((result) => {
        if (LOGGING) {
          console.log('[run-completed]');
        }

        task.completed = true;

        if (task.thenBlock) {
          task.thenBlock(result);
        }

        this.isRunning = false;

        this.run(this.fetch());
      })
      .catch((error) => {
        if (LOGGING) {
          console.error('[run-catch]', error);
        }

        task.completed = true;

        if (this.catchBlock) {
          this.catchBlock(error);
        }

        this.isRunning = false;

        if (this.doneBlock) {
          this.doneBlock();
        }
      })
      .done();
  };
}
