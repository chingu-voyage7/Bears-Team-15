/* eslint-disable no-unused-expressions */
import React, {Component} from 'react';
// import {graphql, compose} from 'react-apollo';
import {Provider, connect} from 'react-redux';
import {Router} from '@reach/router';
import Layout from './Components/Common/Layout/index.js';
import {
    Drives,
    IndexPage,
    About,
    Test,
    Search,
    Profile,
    Event,
    NotFound,
    // Login,
    LoginForm,
} from './Components/Pages/index';
import {ApolloProvider} from 'react-apollo';
// import jwtDecode from 'jwt-decode';

// ! helpers
// import SetGetCookie from './util/helper.cookie';

// ! components
import Auth from './Components/Common/Auth/Auth';

// ! action
import {auth} from './reduxes/actions/isAuthAction.js';
import {closeModal} from './reduxes/actions/modal_actions';
import ApolloClient from 'apollo-boost';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {setCurrentUser} from './reduxes/actions/session_actions';
// import {navigate} from '@reach/router/lib/history';
import {checkIfAuth} from './util/authChecker.js';

const cache = new InMemoryCache();

const client = new ApolloClient({
    uri: '/graph',
    link: new HttpLink(),
    cache,
});
// ! query

class App extends Component {
    // ! this hook check if user is authenticated
    componentWillMount() {
        // checkIfAuth fn will be called before mounting
        // pass boolean if to check that we are on the home page
        this.props.checkIfAuth(true);
    }

    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={this.props.store}>
                    <Layout>
                        <Router>
                            <NotFound default />
                            <IndexPage path="/" />
                            <Drives path="/drives" />
                            {/* <Locations path="/locations" /> */}
                            <LoginForm path="/login" />
                            {/* <Auth path="/test" component={Test} /> */}
                            <Auth path="/about" component={About} />
                            <Search path="/search" />
                            <Auth path="/profile" component={Profile} />
                            <Event path="/event/:EventId" />
                        </Router>
                    </Layout>
                </Provider>
            </ApolloProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    state,
});

const mapDispatchToProps = (dispatch) => ({
    auth: (args) => dispatch(auth(args)),
    closeModal: () => dispatch(closeModal()),
    setCurrUser: (args) => dispatch(setCurrentUser(args)),
    checkIfAuth: (args) => dispatch(checkIfAuth(args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
