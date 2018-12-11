import { gql } from 'apollo-boost';

const testUserQuery = gql`
  {
    userGetAll {
      name
      id
    }
  }
`;

const test = gql`
  {
    testQuery {
      test
    }
  }
`;

const userLogin = gql`
  query($email: String = "", $password: String = "")
  {
    userLogin(email:$email, password:$password) {
      token 
    }
  }
`;


export { testUserQuery, userLogin, test };
