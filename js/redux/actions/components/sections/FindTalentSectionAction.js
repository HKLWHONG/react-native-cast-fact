/**
 * @format
 * @flow strict-local
 */

import { FindTalentSectionActionType } from '../../../types';

export const reset = () => (dispatch) => {
  dispatch({
    type: FindTalentSectionActionType.RESET,
  });

  return Promise.resolve();
};
