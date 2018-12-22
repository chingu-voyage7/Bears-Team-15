
// ! imported dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

// ! imported files
import Input from '../../Common/Input/input';
import Button from '../../Common/Button/button';

// ! imported actions
import { login } from '../../../reduxes/actions/loginAction';
import { closeModal } from "../../../reduxes/actions/modal_actions";
import { auth } from '../../../reduxes/actions/isAuthAction';

// ! style
import './session_form.css';

// ! imported query
import { userLogin, testUserQuery, test } from '../../../util/graphQLQuery';

// ! import helpers
import SetGetCookie from '../../../util/helper.cookie';
import JWTHelpers from '../../../util/jwt.helper';


// destructured helper functions for cookies
// setGetCookie constructor needs a key name type STRING
const { setCookie, getCookie } = new SetGetCookie('tokenizer');
// destructured JWT helper method
const { decodeJWT } = new JWTHelpers();

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleQuery = this.handleQuery.bind(this)
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick() {
    const { email, password } = this.state;
    this.handleQuery(email, password);
  }

  handleQuery(email, password) {
    const { auth, login, client } = this.props;
    client.query({
      query: userLogin,
      variables: {
        email: email,
        password: password
      },
    })
      .then(({ data }) => {
        const { isSuccess, statusCode, token, msg } = data.userLogin;

        if (isSuccess && statusCode === 200) {
          login(token);
          auth(true)
          this.props.closeModal();
          // method in setting token into cookies
          setCookie(token);
          // const hashToken = getCookie('tokenizer');
          // console.log(hashToken);
          // console.log(decodeJWT(hashToken));
        } else {
          console.log(msg, statusCode, isSuccess)
        }

      })
      .catch(error => console.error(error, 'err here'));
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="session-form-container">
        <div className="session-form-elements">
          <Input
            height="45px"
            width="300px"
            value={email}
            onChange={this.handleChange}
            placeholder="email"
            name="email"
          />
          <Input
            height="45px"
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
    // errors: state.errors.sessionErrors,
    formType: "login",
    client: state.client
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (args) => dispatch(login(args)),
    closeModal: () => dispatch(closeModal()),
    auth: (args) => dispatch(auth(args))
  }
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  // graphql query from back end
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
