import {INCREMENT, DECREMENT} from '../actions/types';

const initialState = {
  num: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        // ...state,
        num: action.payload,
      };
    case DECREMENT:
      return {
        // ...state,
        num: action.payload,
      };
    default:
      return state;
  }
}
