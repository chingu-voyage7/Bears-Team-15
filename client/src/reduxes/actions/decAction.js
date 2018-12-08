import {DECREMENT} from './types';

export const decrement = (args) => {
  const diff = args - 1;
 return {
    type: DECREMENT,
    payload: diff,
  };
};
