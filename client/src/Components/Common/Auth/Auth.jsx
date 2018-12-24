import React, { Component } from 'react';
// import { Redirect } from '@reach/router';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { openModal } from '../../../reduxes/actions/modal_actions';

class Auth extends Component {

 checkAuthenticate = () => {
  const { component: Component, path, isAuth } = this.props;
  if (isAuth) {
   return (
    <Component path={path} />
   )
  } else {
   // return (
   //  <Redirect from={path} to='/login' noThrow />
   // )
   this.props.openModal('login');
  }
 }

 render() {
  return (
   <>
    {
     this.checkAuthenticate()
    }
   </>
  )
 }
}

const mapStateToProps = (state) => {
 return {
  isAuth: state.isAuth
 };
};

const mapDispatchToProps = (dispatch) => {
 return {
  openModal: (args) => dispatch(openModal(args)),
 }
};

export default compose(
 connect(
  mapStateToProps,
  mapDispatchToProps
 ),
)(Auth);
