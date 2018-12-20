/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import Layout from './Components/Common/Layout/index.js';
import {
  Drives,
  IndexPage,
  About,
  Test,
} from './Components/Pages/index';
import { ApolloProvider } from 'react-apollo';


import Auth from './Components/Common/Auth/Auth'


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
              <IndexPage default path="/" />
              <Drives path="/drives" />
              <Auth path="/test" component={Test} />
              <Auth path="/about" component={About} />
            </Router>
          </Layout>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;

