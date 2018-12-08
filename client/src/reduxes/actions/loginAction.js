import { userLogin } from '../../util/graphQLQuery';
import { graphql } from 'react-apollo';
import Login from '../../Components/Pages/UserLogin';



const LOG_IN = 'LOG_IN';

export const login = (args) => {
  console.log('action');

  return {
    type: LOG_IN,
    payload: args,
  };
};

export const loginTest = (email, password) => (dispatch) => {

  // return 
  console.log(graphql(userLogin(email, password))(Login));
  // .then((user) => {
  //   dispatch(login(user));
  // });
};
