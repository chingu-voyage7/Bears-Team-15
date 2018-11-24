const {buildSchema} = require('graphql');

const testSchema = buildSchema(`
  type Query {
    hello: String
  }
`);

module.exports = testSchema;
