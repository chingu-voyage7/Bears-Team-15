import {TEST_ING} from './types';

export const testLog = (args) => (dispatch) => {
  dispatch({
    type: TEST_ING,
    payload: args,
  });
};
