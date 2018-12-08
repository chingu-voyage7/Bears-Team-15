import {combineReducers} from 'redux';
import testReducers from './testReducer';
import incDecReducers from './inc_dec_reducers';
import allUsers from './userGrabReducer';

// pure functions that will be triggered
// combineReducers fn will receive all the reducers
export default combineReducers({
  test: testReducers,
  incDec: incDecReducers,
  allUsers: allUsers,
});
