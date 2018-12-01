import {combineReducers} from 'redux';
import testReducers from './testReducer';

// pure functions that will be triggered
export default combineReducers({
  test: testReducers,
});
