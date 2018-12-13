import React from 'react';
import ReactDOM from 'react-dom';
// import jwt_decode from 'jwt-decode';
// import * as APIUtil from './util/session_api_util';
import configureStore from './reduxes/store/store';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore();
  // for front end auth, comment or replace commented out code below
  // // Check for token
  // if (localStorage.jwtToken) {
  //   // Set auth token header auth
  //   APIUtil.setAuthToken(localStorage.jwtToken);
  //   // Decode token and get user info and exp
  //   const decoded = jwt_decode(localStorage.jwtToken);
  //   // Set user and isAuthenticated
  //   store.dispatch(APIUtil.setCurrentUser(decoded));
  //
  //   // Check for expired token
  //   const currentTime = Date.now() / 1000;
  //   if (decoded.exp < currentTime) {
  //     // Logout user
  //     store.dispatch(APIUtil.logoutUser());
  //     // Redirect to login
  //     window.location.href = '/login';
  //   }
  // }
  const root = document.getElementById('root');
  ReactDOM.render(<App store={store} />, root);
  serviceWorker.register();
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
