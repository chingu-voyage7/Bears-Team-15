// const LOG_IN = 'LOG_IN';
// const SIGN_UP = 'SIGN_UP';
const SET_CURRENT_USER = 'SET_CURRENT_USER';

// ! this function should grab token
export default function (state = {}, action) {
  switch (action.type) {
    // case LOG_IN:
    //   return action.payload;
    // case SIGN_UP:
    //   return action.payload;
    case SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
}
