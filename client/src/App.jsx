/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Redirect } from '@reach/router';
import Layout from './Components/Common/Layout/index.js';
import {
  Drives,
  IndexPage,
  Locations,
  About,
  Test,
  // Login,
  LoginForm
} from './Components/Pages/index';
import { ApolloProvider } from 'react-apollo';


import Auth from './Components/Common/Auth/Auth'
// import ApolloClient from 'apollo-boost';
// import { clientGraphQL } from './reduxes/actions/clientAction';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
    }
  }

  componentWillMount() {
    this.setState({
      client: this.props.store.getState().client
    })
  }


  render() {

    return (
      <ApolloProvider client={this.state.client}>
        <Provider store={this.props.store}>
          <Layout>
            <h1>APP.jsx</h1>
            {/* <Router>
              <LoginForm path="/login" />
              <Test path='/test' />
              <IndexPage path="/" />
              <Drives path="/drives" />
              <Locations path="/locations" />
              <About path="/about" />
              <Auth path="/test" component={Test} />
            </Router> */}

            <Router>
              <LoginForm path="/login" />
              <Auth path='/test' >
                <Test path='/test' />
              </Auth>
            </Router>

          </Layout>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;

