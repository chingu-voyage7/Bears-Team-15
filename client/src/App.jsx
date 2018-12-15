/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router } from '@reach/router';
import Layout from './Components/Common/Layout/index.js';
import {
  Drives,
  IndexPage,
  Locations,
  About,
  Test,
  Login,
  LoginForm
} from './Components/Pages/index';
import { ApolloProvider, compose } from 'react-apollo';
import ApolloClient from 'apollo-boost';
// import { clientGraphQL } from './reduxes/actions/clientAction';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {}
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
              <About path="/about" />
              <Test path="/test" />
              {/* <LoginForm path="/login" client={client} testing="test" /> */}
              {/* <Login path="/login" client={client} /> */}
            </Router>
          </Layout>
        </Provider>
      </ApolloProvider>
    );
  }
}



// const App = ({ store }) => (


//   <ApolloProvider client={store.client}>
//     <Provider store={store}>
//       <Layout>
//         <Router>
//           <IndexPage path="/" />
//           <Drives path="/drives" />
//           <Locations path="/locations" />
//           <About path="/about" />
//           <Test path="/test" />
//           {/* <LoginForm path="/login" client={client} testing="test" /> */}
//           {/* <Login path="/login" client={client} /> */}
//         </Router>
//       </Layout>
//     </Provider>
//   </ApolloProvider>
// )



export default App;

