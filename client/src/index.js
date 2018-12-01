import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {IndexPage, Locations, Barbers, About, Test} from './Pages';
import {Router} from '@reach/router';
import store from './store/store';
import {Provider} from 'react-redux';
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <IndexPage path="/" />
      <Locations path="/locations" />
      <Barbers path="/barbers" />
      <About path="/about" />
      <Test path="/test" />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
