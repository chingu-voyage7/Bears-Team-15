import { gql } from 'apollo-boost';

const testUserQuery = gql`
  {
    userGetAll {
      firstName
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
      token,
      statusCode,
      isSuccess,
      msg
    }
  }
`;

const addUser = gql`
  mutation($firstName: String = "", $lastName: String = "", $email: String = "", $password: String = "", $passwordTwo: String = "") 
  {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, passwordTwo: $passwordTwo) {
    token,
    statusCode,
    isSuccess,
    msg
  }
}
`

export { testUserQuery, userLogin, test, addUser };
