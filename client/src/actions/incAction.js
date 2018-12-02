import {INCREMENT} from './types';

export const increment = (args) => (dispatch) => {
  const sum = args + 1;
  dispatch({
    type: INCREMENT,
    payload: sum,
  });
};
