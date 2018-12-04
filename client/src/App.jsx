import React from 'react';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import Layout from './Components/Common/Layout/index.js';
import{Drives, IndexPage, Locations, About, Test} from './Components/Pages/index';
const App = ({ store }) => (
  
  <Provider store={store}>
   <Layout>
     <Router> 
        <IndexPage path="/" />
        <Drives path="/drives" />
        <Locations path="/locations" />
        <About path="/about" />
        <Test path="/test" />
     </Router> 
   </Layout>
  </Provider>
);

export default App;
