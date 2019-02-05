import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';

// ! imported files
import Input from '../../Common/Input/input';
import Button from '../../Common/Button/button';

// ! imported actions
import {signup} from '../../../reduxes/actions/session_actions';
import {closeModal} from '../../../reduxes/actions/modal_actions';
import {auth} from '../../../reduxes/actions/isAuthAction';

// ! style
import './session_form.css';

// ! imported query
import {
    // userSignup,
    testUserQuery,
    test,
    addUser,
} from '../../../util/graphQLQuery';

// ! import helpers
import SetGetCookie from '../../../util/helper.cookie';
// import JWTHelpers from '../../../util/jwt.helper';

// destructured helper functions for cookies
// setGetCookie constructor needs a key name type STRING
const {setCookie} = new SetGetCookie('tokenizer');
// destructured JWT helper method
// const {decodeJWT} = new JWTHelpers();
//
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
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
    }

    componentDidMount() {
        console.log(this.props, 'signup form');
    }

    handleChange(e) {
        const {value, name} = e.target;
        this.setState({
            [name]: value,
        });
    }

    handleClick() {
        const {
            firstName,
            lastName,
            email,
            passwordOne,
            passwordTwo,
        } = this.state;
        this.handleQuery(firstName, lastName, email, passwordOne, passwordTwo);
    }

    /**
     * this function handles user signup
     * @param {STRING} firstName
     * @param {STRING} lastName
     * @param {STRING} email
     * @param {STRING} passwordOne
     * @param {STRING} passwordTwo
     */
    async handleQuery(firstName, lastName, email, passwordOne, passwordTwo) {
        const {auth, signup, addUser} = this.props;

        try {
            const newUser = await addUser({
                variables: {
                    firstName,
                    lastName,
                    email,
                    password: passwordOne,
                    passwordTwo,
                },
            });

            const {data} = newUser;

            const {isSuccess, statusCode, token, msg} = data.addUser;
            if (isSuccess && statusCode === 200) {
                signup(token);
                auth(true);
                this.props.closeModal();
                setCookie(token);
            } else {
                console.log(msg, statusCode, isSuccess);
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    render() {
        const {
            firstName,
            lastName,
            email,
            passwordOne,
            passwordTwo,
        } = this.state;

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
        formType: 'signup',
        client: state.client,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (args) => dispatch(signup(args)),
        closeModal: () => dispatch(closeModal()),
        auth: (args) => dispatch(auth(args)),
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    // graphql query from back end
    graphql(testUserQuery, {name: 'user'}),
    graphql(test, {name: 'test'}),
    graphql(addUser, {
        name: 'addUser',
    })
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
