import { combineReducers } from 'redux';
import testReducers from './testReducer';
import incDecReducers from './inc_dec_reducers';
import allUsers from './userGrabReducer';
import login from './login_reducer';
import modal from './modal_reducer';
import client from './client_reducers';

// pure functions that will be triggered
// combineReducers fn will receive all the reducers
export default combineReducers({
  test: testReducers,
  incDec: incDecReducers,
  allUsers: allUsers,
  token: login,
  modal: modal,
  client: client,
});
