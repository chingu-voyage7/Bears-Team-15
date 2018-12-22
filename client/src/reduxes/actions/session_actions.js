import jwtDecode from 'jwt-decode';

import SetGetCookie from '../../util/helper.cookie';

const { setCookie, deleteCookie } = new SetGetCookie('tokenizer');
const AUTHENTICATION = "AUTHENTICATION";

// export const login = (args) => {
//   return {
//     type: 'LOG_IN',
//     payload: args
//   };
// };

// export const signup = (args) => {
//   return {
//     type: 'SIGN_UP',
//     payload: args
//   };
// };

export const login = (args) => dispatch => {
  setCookie(args)
  const user = jwtDecode(args);
  dispatch(setCurrentUser(user));
  dispatch(auth(true));
};

export const signup = (args) => dispatch => {
  setCookie(args)
  const user = jwtDecode(args);
  dispatch(setCurrentUser(user));
  dispatch(auth(true));
};

export const logout = () => dispatch => {
  const user = {};
  deleteCookie('tokenizer');
  dispatch(setCurrentUser(user));
  dispatch(auth(false));
}

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user
  }
}

export const auth = (args) => dispatch => {
  return {
    type: AUTHENTICATION,
    payload: args,
  };
};