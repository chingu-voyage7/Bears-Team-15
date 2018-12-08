import { gql } from 'apollo-boost';

const testUserQuery = gql`
  {
    userGetAll {
      name
      id
    }
  }
`;

const userLogin = function (email, password) {
  console.log(email, password, 'query');
  return gql`
    {
      userLogin(email: "boo@boo.com", password: "password") {
        token
      }
    }
  `;
};

export { testUserQuery, userLogin };
