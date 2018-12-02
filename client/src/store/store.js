import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const globalInitialState = {
  incDec: 0,
};
const middleware = [thunk];

// store will will take 3 args
// 1st is the reducers from mainReducer file
// 2nd main state
// 3rd middleware
// store is exported to layout index.js
const store = createStore(
  rootReducer,
  globalInitialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
