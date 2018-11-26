const {buildSchema} = require('graphql');

const helloScheme = buildSchema(`
  type Query {
    hello: String
  }
`);

const test = buildSchema(`
  type Query {
    foo: String
  }
`);

module.exports = {
 helloScheme,
 //  test,
};
