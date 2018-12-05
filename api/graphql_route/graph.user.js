const graphqlHTTP = require('express-graphql');
const schema = require('../graphql_schema/graphql.RootQuery.js');

module.exports = graphqlHTTP({
 schema,
 // rootValue: root,
 graphiql: true
});
