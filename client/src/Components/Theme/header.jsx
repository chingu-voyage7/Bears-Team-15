import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import { login, logout } from '../../reduxes/actions/session_actions';
import { openModal } from '../../reduxes/actions/modal_actions.js';
import { auth } from '../../reduxes/actions/isAuthAction.js';

const linkStyle = {
	textDecoration  : 'none',
	color           : 'inherit',
	backgroundColor : 'inherit'
};

class Header extends Component {
	handleLogout = () => {
		console.log('logout');
		this.props.logout();
		this.props.auth(false);
		navigate('/');
	};

	render() {
		const loggedInLinks = () => {
			return (
				<span className="login-link" onClick={() => this.handleLogout()}>
					Logout
				</span>
			);
		};

		const loggedOutLinks = () => {
			return (
				<span>
					<span className="login-link" onClick={() => this.props.openModal('login')}>
						Login
					</span>
					<span className="login-link" onClick={() => this.props.openModal('signup')}>
						Signup
					</span>
				</span>
			);
		};

		// console.log(this.props.currentUser === false, this.props.currentUser);

		return (
			<div className="header">
				<h1 className="logo">
					<Link to="/" style={linkStyle}>
						ARC
					</Link>
				</h1>
				<nav>
					{/*{"  "}
            <Link to="/">Home</Link>{"  "}
            <Link to="drives">Drives</Link>{"  "}
            <Link to="locations">Locations</Link>{"  "}
            <Link to="about">About</Link>{"  "}
            <Link to="test">Test</Link> */}
					<Link to="/search">Search</Link>{' '}
					{/* <span className="login-link" onClick={() => this.props.openModal("login")}>
            Login
            </span>{" "}
          <span className="login-link" onClick={() => this.props.openModal("signup")}>
            Signup
            </span>{" "} */}
					{this.props.state.isAuth ? loggedInLinks() : loggedOutLinks()}
					<Link to="/test">Test</Link>
					<Link to="/about">About</Link>
					<Link default to="/">
						Getting Started
					</Link>
					{/* <span className="login-link" onClick={() => this.handleLogout()}>
            Logout
            </span>{" "} */}
				</nav>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	state
});

const mapDispatchToProps = (dispatch) => ({
	login     : (guestUser) => dispatch(login(guestUser)),
	logout    : () => dispatch(logout()),
	openModal : (modal) => dispatch(openModal(modal)),
	auth      : (args) => dispatch(auth(args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
