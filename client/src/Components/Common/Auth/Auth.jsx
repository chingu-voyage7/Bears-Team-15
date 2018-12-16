import React, { Component } from 'react';
import { LoginForm } from "../../Pages";
import { Router, Redirect, navigate } from '@reach/router';



class Auth extends Component {
 state = {
  authenticate: true,
 }

 checkAuthenticate = () => {
  const { component: Component, path } = this.props;
  console.log(this.props, path);
  const { authenticate } = this.state
  if (authenticate) {
   console.log('auth')
   return (
    this.props.children
    // <Component path={path} />

   )
  } else {
   console.log('false')
   return (
    // <LoginForm path='/login' />
    <Redirect from={path} to='/login' noThrow />
    // navigate("/login")
   )
  }
 }

 foo = () => {
  const { authenticate } = this.state
  if (authenticate) {
   return (
    <div>
     <h1>FOO</h1>
    </div>
   )
  } else {
   return (
    <div>
     <h1>BAR</h1>
    </div>
   )
  }
 }

 render() {
  return (
   <div>
    <h1>Auth</h1>
    {/* <Router> */}
    {
     this.checkAuthenticate()
     // this.foo()
    }
    {/* </Router> */}
   </div>
  )
 }
}

export default Auth;