// ! imported dependecies
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { compose } from 'redux';
import { graphql, compose } from 'react-apollo';

// ! imported files
import Input from '../Common/Input/input';
import Button from '../Common/Button/button';
import { loginTest } from '../../reduxes/actions/loginAction';
import { login } from '../../reduxes/actions/loginAction';

// ! imported query
import { userLogin } from '../../util/graphQLQuery';


// email: "boo@boo.com", password: "password")
class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    // this.props.userLogin{
    //   variables: {
    //     email: "boo@boo.com",
    //       password: "password"
    //   }
    // }
    console.log(this.props.data.userLogin);
    // this.props.data.userLogin("boo@boo.com", "password");
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Input
          value={email}
          onChange={this.handleChange}
          placeholder="email"
          name="email"
        />
        <Input
          value={password}
          onChange={this.handleChange}
          placeholder="password"
          name="password"
        />
        <Button onClick={this.handleClick}> Login </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  login: (args) => {
    console.log(args, 'dis');
    dispatch(login(args));
    // dispatch(graphql(userLogin(args)));
  },
  // loginTest: (email, password) => {
  //   dispatch(loginTest(email, password));
  // },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  // graphql query from backend
  graphql(userLogin, {
    options: (props) => {
      return {
        variables: {
          email: "boo@boo.com",
          password: "password"
        }
      }
    }
  }) // <<<<<===== heres the query
)(Login);
