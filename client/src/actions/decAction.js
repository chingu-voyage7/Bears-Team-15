import {DECREMENT} from './types';

export const decrement = (args) => (dispatch) => {
  const diff = args - 1;
  dispatch({
    type: DECREMENT,
    payload: diff,
  });
};
