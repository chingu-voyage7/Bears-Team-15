import { combineReducers } from 'redux';
import testReducers from './testReducer';
import incDecReducers from './inc_dec_reducers';
import allUsers from './userGrabReducer';
import sessionReducer from './session_reducer';
import modal from './modal_reducer';
import client from './client_reducers';
import isAuth from './isAuthReducer';

// pure functions that will be triggered
// combineReducers fn will receive all the reducers
export default combineReducers({
  test: testReducers,
  incDec: incDecReducers,
  allUsers: allUsers,
  currentUser: sessionReducer,
  modal: modal,
  client: client,
  isAuth: isAuth
});
