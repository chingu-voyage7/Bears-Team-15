// ! imported dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { gql } from 'apollo-boost';

// ! imported files
import Input from '../Common/Input/input';
import Button from '../Common/Button/button';
import { login } from '../../reduxes/actions/loginAction';

// ! imported query
import { userLogin, testUserQuery, test } from '../../util/graphQLQuery';


// email: "boo@boo.com", password: "password")
class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { email, password } = this.state;
    this.props.client.query({
      query: gql`
      query($email: String!  , $password: String! )
      {
        userLogin(email: $email, password: $password) {
          token 
        }
      }

    `,
      variables: {
        email: email,
        password: password
      },
    }).then(({ data }) => console.log(data, 'data'))
      .catch(error => console.error(error));
  }

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
    dispatch(login(args));
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  // graphql query from backend
  graphql(testUserQuery, { name: 'user' }),
  graphql(test, { name: 'test' })
  // graphql(userLogin,
  //   {
  //     options: (props) => {
  //       console.log(props, 'yow');
  //       return {
  //         variables: {
  //           email: props.state.email,
  //           password: props.state.password
  //         },
  //       }
  //     }
  //   }
  // )
)(Login);
