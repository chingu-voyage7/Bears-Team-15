
// ! imported dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { navigate } from '@reach/router';

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
    this.handleQuery = this.handleQuery.bind(this)
  }

  componentDidMount() {
    console.log(this.props, 'shit');
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick() {
    console.log(this.props, 'loginf')
    const { email, password } = this.state;
    this.handleQuery(email, password);
  }

  handleQuery(email, password) {
    const { auth, login } = this.props;
    this.props.client.query({
      query: userLogin,
      variables: {
        email: email,
        password: password
      },
    })
      .then(({ data }) => {
        // destructured helper functions for cookies
        // setGetCookie constructor needs a key name type STRING
        const { setCookie, getCookie } = new SetGetCookie('tokenizer');
        // destructured JWT helper method
        const { decodeJWT } = new JWTHelpers();
        const { token } = data.userLogin;
        // dispatching action with payload of JWT token
        login(token);
        // method in setting token into cookies
        setCookie(token);

        // const hashToken = getCookie('tokenizer');
        // console.log(hashToken);
        // console.log(decodeJWT(hashToken));

        // ! dispatching action to store bool true if user has login
        auth(true)
        // this.props.history.push('/test');
        // navigate('/test');
        this.props.closeModal();
        // console.log(this.props.history.push('/test'), 'pathname');
      })
      .catch(error => console.error(error));
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
