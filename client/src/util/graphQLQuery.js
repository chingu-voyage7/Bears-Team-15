import {gql} from 'apollo-boost';

const testUserQuery = gql`
  {
    userGetAll {
      name
      id
    }
  }
`;

export {testUserQuery};
