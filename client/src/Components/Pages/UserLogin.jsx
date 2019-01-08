// ! imported dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';

// ! imported files
import Input from '../Common/Input/input';
import Button from '../Common/Button/button';
import {login} from '../../reduxes/actions/session_actions';

// ! imported query
import {userLogin, testUserQuery, test} from '../../util/graphQLQuery';

// ! import helpers
import SetGetCookie from '../../util/helper.cookie';
import JWTHelpers from '../../util/jwt.helper';

class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    handleChange = (e) => {
        const {value, name} = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleClick = () => {
        const {email, password} = this.state;
        this.props.client
            .query({
                query: userLogin,
                variables: {
                    email: email,
                    password: password,
                },
            })
            .then(({data}) => {
                const {setCookie, getCookie} = new SetGetCookie();
                const {decodeJWT} = new JWTHelpers();
                const {token} = data.userLogin;
                this.props.login(token);
                setCookie('tokenizer', token);

                const hashToken = getCookie('tokenizer');
                console.log(decodeJWT(hashToken), 'fasdfs');
            })
            .catch((error) => console.error(error));
    };

    render() {
        const {email, password} = this.state;
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
    },
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    // graphql query from backend
    graphql(testUserQuery, {name: 'user'}),
    graphql(test, {name: 'test'})
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
