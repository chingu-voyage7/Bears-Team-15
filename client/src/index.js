import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {IndexPage, Locations, Barbers, About} from './Pages';
import {Router} from '@reach/router'
ReactDOM.render(
<Router>
<IndexPage path="/" />   
<Locations path="/locations" />
<Barbers path="/barbers" /> 
<About path="/about" />
</Router> 
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
