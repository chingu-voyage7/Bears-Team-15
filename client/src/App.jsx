import React from 'react';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import Layout from './Components/Common/Layout/index.js';
import {
  Drives,
  IndexPage,
  Locations,
  About,
  Test,
  Login
} from './Components/Pages/index';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '/graph',
});

const App = ({ store }) => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Layout>
        <Router>
          <IndexPage path="/" />
          <Drives path="/drives" />
          <Locations path="/locations" />
          <About path="/about" />
          <Test path="/test" />
          <Login path="/login" client={client} />
        </Router>
      </Layout>
    </Provider>
  </ApolloProvider>
);

export default App;
