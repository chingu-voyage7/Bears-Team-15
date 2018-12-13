const LOG_IN = 'LOG_IN';

// ! this function should grab token
export default function (state = {}, action) {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    default:
      return state;
  }
}
