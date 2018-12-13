import {TEST_ING} from './types';

export const testLog = (args) => {
  return {
    type: TEST_ING,
    payload: args,
  };
};
