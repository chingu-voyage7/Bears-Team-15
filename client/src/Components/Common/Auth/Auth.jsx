import React, {Component} from 'react';
import {navigate} from '@reach/router';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {openModal} from '../../../reduxes/actions/modal_actions';
// import jwtDecode from 'jwt-decode';
import {setCurrentUser} from '../../../reduxes/actions/session_actions';
// import {set} from 'mongoose';
// import SetGetCookie from '../../util/helper.cookie';

class Auth extends Component {
    checkAuthenticate = () => {
        const {component: Component, path, isAuth} = this.props;

        if (isAuth === true) {
            return <Component path={path} />;
        } else {
            navigate('/');
        }
    };

    render() {
        return <>{this.checkAuthenticate()}</>;
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
