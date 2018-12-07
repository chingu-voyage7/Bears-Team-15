import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducxer';

const middlewares = [thunk];
const globalInitialState = {
  incDec: 0,
  allUsers: [],
};

if (process.env.NODE_ENV !== 'production') {
  // must use 'require' (import only allowed at top of file)
  const {logger} = require('redux-logger');
  middlewares.push(logger);
}
// store will will take 3 args
// 1st is the reducers from mainReducer file
// 2nd main state
// 3rd middleware
// store is exported to layout index.js
const configureStore = () =>
  createStore(
    // either the line above or below
    // const configureStore = (globalInitialState = {}) => createStore(
    rootReducer,
    globalInitialState,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

export default configureStore;
