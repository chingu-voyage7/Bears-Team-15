/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import Layout from './Components/Common/Layout/index.js';
import {
  Drives,
  IndexPage,
  Locations,
  About,
  Test,
  Search,
  Profile,
  Event,
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
            <Router>
              <IndexPage path="/" />
              <Drives path="/drives" />
              <Locations path="/locations" />
              <LoginForm path="/login" />
              <Auth path="/test" component={Test} />
              <Auth path="/about" component={About} />
              <Search path= "/search"/>
              <Profile path= "/profile"/>
              <Event path="/group/event"/>
            </Router>
          </Layout>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;

