
// ! imported dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

// ! imported files
import Input from '../../Common/Input/input';
import Button from '../../Common/Button/button';
import { login } from '../../../reduxes/actions/loginAction';
import { closeModal } from "../../../reduxes/actions/modal_actions";
import './session_form.css';

// ! imported query
import { userLogin, testUserQuery, test } from '../../../util/graphQLQuery';

// ! import helpers
import SetGetCookie from '../../../util/helper.cookie';
import JWTHelpers from '../../../util/jwt.helper';


// email: "boo@boo.com", password: "password")
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick() {
    const { email, password } = this.state;
    this.props.client.query({
      query: userLogin,
      variables: {
        email: email,
        password: password
      },
    }).then(({ data }) => {
      const { setCookie, getCookie } = new SetGetCookie();
      const { decodeJWT } = new JWTHelpers();
      const { token } = data.userLogin;
      this.props.login(token)
      setCookie('tokenizer', token)

      const hashToken = getCookie('tokenizer')
      console.log(decodeJWT(hashToken))
    })
      .catch(error => console.error(error));
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="session-form-container">
        <div className="session-form-elements">
          <Input
            height="30px"
            width="300px"
            value={email}
            onChange={this.handleChange}
            placeholder="email"
            name="email"
          />
          <Input
            height="30px"
            width="300px"
            value={password}
            onChange={this.handleChange}
            placeholder="password"
            name="password"
          />
          <Button onClick={this.handleClick}> Login </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
    // errors: state.errors.sessionErrors,
    formType: "login"
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (args) => dispatch(login(args)),
    closeModal: () => dispatch(closeModal()),
  }
};

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
)(LoginForm);
