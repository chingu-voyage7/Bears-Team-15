import { gql } from 'apollo-boost';

const testUserQuery = gql`
  {
    userGetAll {
      name
      id
    }
  }
`;

const userLogin = gql`
    {
      userLogin(email: "boo@boo.com", password: "password") {
        token
      }
    }
  `;


export { testUserQuery, userLogin };
