import { connect } from 'react-redux';
import React, { Component } from 'react'
import { Link } from '@reach/router';

import { login } from "../../reduxes/actions/loginAction";
import { openModal } from "../../reduxes/actions/modal_actions.js";


class Header extends Component {

  render() {
    return (
      <div className="header">
        <h1 className="logo">ARC</h1>
        <nav>
          {/* <Link to="/">Home</Link>{"  "}
            <Link to="drives">Drives</Link>{"  "}
            <Link to="locations">Locations</Link>{"  "}
            <Link to="about">About</Link>{"  "}
            <Link to="test">Test</Link> */}
          <Link to="/signup">Sign Up</Link>{" "}
          <Link to='/login'>Login</Link>
          <Link to='/test'>Test</Link>
          <Link to='/about'>About</Link>
          <Link default to="/">Getting Started</Link>
        </nav>
      </div>
    )
  }
}

// const mapStateToProps = ({ session }) => ({
//   // currentUser: session.currentUser
// });

const mapDispatchToProps = dispatch => ({
  login: guestUser => dispatch(login(guestUser)),
  // logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mapDispatchToProps)(Header);
