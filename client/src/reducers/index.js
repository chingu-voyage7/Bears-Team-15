import {combineReducers} from 'redux';
import testReducers from './testReducer';
import incDecReducers from './inc_dec_reducers';

// pure functions that will be triggered
export default combineReducers({
  test: testReducers,
  incDec: incDecReducers,
});
