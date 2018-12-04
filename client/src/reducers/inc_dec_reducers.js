import {INCREMENT, DECREMENT} from '../actions/types';

// const initialState = {
//   num: 0,
// };

export default function(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      // return {
      //   // ...state,
      //   num: action.payload,
      // };
      return action.payload;
    case DECREMENT:
      // return {
      //   // ...state,
      //   num: action.payload,
      // };
      return action.payload;
    default:
      return state;
  }
}
