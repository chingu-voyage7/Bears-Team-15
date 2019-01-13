/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Provider, connect } from 'react-redux';
import { Router } from '@reach/router';
import Layout from './Components/Common/Layout/index.js';
import {
  Drives,
  IndexPage,
  About,
  Test,
  Search,
  Profile,
  Event,
  // Login,
  LoginForm
} from './Components/Pages/index';
import { ApolloProvider } from 'react-apollo';
import jwtDecode from 'jwt-decode';

// ! helpers
import SetGetCookie from './util/helper.cookie'

// ! components
import Auth from './Components/Common/Auth/Auth'

// ! action
import { auth } from './reduxes/actions/isAuthAction.js';
import { closeModal } from './reduxes/actions/modal_actions';

// ! query
import { currUser } from './util/graphQLQuery';

const { getCookie } = new SetGetCookie('tokenizer');

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

  componentDidMount() {

    // TODO: make a condition that checks the token.
    // ! if token returns true then query, if not then let user login
    const { client } = this.props.state;
    // takes hashtoken from cookie
    const hashToken = getCookie();

    // checker if the theres a token in the cookie
    if (hashToken === '0' || !hashToken) {
      return
    }
    this.props.auth(true)
    this.props.closeModal();
    // decode the token and grab the ID
    // const { id } = jwtDecode(hashToken)
    // // query the user, takes id as a variables
    // const userWhoIsLoggedIn = await client.query({
    //   query: currUser,
    //   variables: {
    //     id: id,
    //   }
    // });

    // const { email, isSuccess } = userWhoIsLoggedIn.data.currentUser;
    // pass the email and isSuccess as an argument
    // this.handleUserCheckIfLoggedI(email, isSuccess);
  }

  /**
  //  * takes an string and bool
  //  * @param {STRING} email
  //  * @param {BOOL} stat
  //  */
  // handleUserCheckIfLoggedI = (email, stat) => {
  //   const { closeModal, auth } = this.props;
  //   if (email && stat) {
  //     auth(true)
  //     closeModal();
  //     console.log('success');
  //   } else {
  //     console.log('denied');
  //     auth(false);
  //     // TODO: call open modal here
  //   }
  // }


  render() {

    return (
      <ApolloProvider client={this.state.client}>
        <Provider store={this.props.store}>
          <Layout>
            <Router>
              <IndexPage default path="/" />
              <Drives path="/drives" />
              {/* <Locations path="/locations" /> */}
              <LoginForm path="/login" />
              <Auth path="/test" component={Test} />
              <Auth path="/about" component={About} />
              <Search path="/search" />
              <Auth path="/profile" component={Profile}/>
              <Event path="/event/:EventId" />
            </Router>
          </Layout>
        </Provider>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  auth: (args) => dispatch(auth(args)),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);