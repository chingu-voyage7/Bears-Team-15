import {TEST_ING} from '../actions/types';

const initialState = {
  logArr: ['foo', 'bar'],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_ING:
      return {
        // ...state,
        logArr: action.payload,
      };
    // return action.payload,
    default:
      return state;
  }
}
