// ! imported dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

// ! imported files
import Input from '../../Common/Input/input';
import Button from '../../Common/Button/button';

// ! imported actions
import { signup } from '../../../reduxes/actions/session_actions';
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

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleQuery = this.handleQuery.bind(this)
  }

  componentDidMount() {
    console.log(this.props, 'signup form');
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick() {
    // console.log(this.props, 'signup')
    const { email, password } = this.state;
    console.log("submitting signup form")
    console.log(this.state, "signup form state");
    // this.handleQuery(email, password);
  }

  // THIS IS THE LOGIN QUERY CODE
  // handleQuery(email, password) {
  //   const { auth, login, client } = this.props;
  //   client.query({
  //     query: userLogin,
  //     variables: {
  //       email: email,
  //       password: password
  //     },
  //   })
  //     .then(({ data }) => {
  //       const { isSuccess, statusCode, token, msg } = data.userLogin;
  //
  //       if (isSuccess && statusCode === 200) {
  //         login(token);
  //         auth(true)
  //         this.props.closeModal();
  //         // method in setting token into cookies
  //         setCookie(token);
  //         // const hashToken = getCookie('tokenizer');
  //         // console.log(hashToken);
  //         // console.log(decodeJWT(hashToken));
  //       } else {
  //         console.log(msg, statusCode, isSuccess)
  //       }
  //
  //     })
  //     .catch(error => console.error(error, 'err here'));
  // }

  render() {
    const { firstName, lastName, email, passwordOne, passwordTwo } = this.state;

    // NEED TO IMPLEMENT THIS BETTER
    // const checkPasswords = (pwOne, pwTwo) => {
    //   if (pwOne !== pwTwo) {
    //     return (<span className="error">Please check that both passwords are the same</span>);
    //   } else {
    //     return (<span className="error"></span>)
    //   }
    // };
    // {checkPasswords}

    return (
      <div className="session-form-container">
        <div className="session-form-elements">
          <Input
            height="45px"
            width="300px"
            value={firstName}
            onChange={this.handleChange}
            placeholder="firstName"
            name="firstName"
          />
          <Input
            height="45px"
            width="300px"
            value={lastName}
            onChange={this.handleChange}
            placeholder="lastName"
            name="lastName"
          />
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
            value={passwordOne}
            onChange={this.handleChange}
            placeholder="passwordOne"
            name="passwordOne"
          />

          <Input
            height="45px"
            width="300px"
            value={passwordTwo}
            onChange={this.handleChange}
            placeholder="passwordTwo"
            name="passwordTwo"
          />

        <Button onClick={this.handleClick}> Sign Up </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // errors: state.errors.sessionErrors,
    formType: "signup",
    client: state.client
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (args) => dispatch(signup(args)),
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
)(SignupForm);
