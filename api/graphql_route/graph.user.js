const graphqlHTTP = require('express-graphql');
const schema = require('../graphql_schema/scheme.user.graphql');

module.exports = graphqlHTTP({
 schema,
 // rootValue: root,
 graphiql: true,
});
