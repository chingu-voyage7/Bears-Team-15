import React, {Component} from 'react';
import {Redirect, navigate} from '@reach/router';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {openModal} from '../../../reduxes/actions/modal_actions';
import jwtDecode from 'jwt-decode';
import {setCurrentUser} from '../../../reduxes/actions/session_actions';
import {set} from 'mongoose';
import SetGetCookie from '../../../util/helper.cookie';
import {checkIfAuth} from '../../../util/authChecker';

class Auth extends Component {
    // this hook will have call checjIfAuth fn to check if the user is authenticated
    componentWillMount() {
        this.props.checkIfAuth(false);
    }

    checkAuthenticate = () => {
        const {
            component: Component,
            path,
            isAuth,
            currentUser,
            setCurrentUser,
        } = this.props;

        if (isAuth === true) {
            return <Component path={path} />;
        } else {
            navigate('/');
        }
    };

    render() {
        return <div>{this.checkAuthenticate()}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
        currentUser: state.currentUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (args) => dispatch(openModal(args)),
        setCurrentUser: (args) => dispatch(setCurrentUser(args)),
        checkIfAuth: (args) => dispatch(checkIfAuth(args)),
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Auth);
