import jwtDecode from 'jwt-decode';
import SetGetCookie from '../../util/helper.cookie';

const {
  setCookie,
  deleteCookie,
  getCookie
} = new SetGetCookie('tokenizer');

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
};

export const signup = (args) => dispatch => {
  setCookie(args)
  const user = jwtDecode(args);
  dispatch(setCurrentUser(user));
};

export const logout = () => dispatch => {
  deleteCookie('tokenizer');
  // const user = {};
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user
  }
};