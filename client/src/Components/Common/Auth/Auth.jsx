import React, {Component} from 'react';
import {Redirect, navigate} from '@reach/router';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {openModal} from '../../../reduxes/actions/modal_actions';
import jwtDecode from 'jwt-decode';
import {setCurrentUser} from '../../../reduxes/actions/session_actions';
import {set} from 'mongoose';
import SetGetCookie from '../../../util/helper.cookie';

class Auth extends Component {
    checkAuthenticate = () => {
        const {
            component: Component,
            path,
            isAuth,
            currentUser,
            setCurrentUser,
        } = this.props;

        console.log('auth.jsx', isAuth);
        if (isAuth === true) {
            // const {getCookie} = new SetGetCookie('tokenizer');

            // const hashToken = getCookie();
            // if (!currentUser.id) {
            //     // setCurrentUser(jwtDecode(hashToken));
            // }

            return <Component path={path} />;
        } else {
            // return (
            //  <Redirect from={path} to='/login' noThrow />
            // )
            this.props.openModal('LOGIN');
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
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Auth);
