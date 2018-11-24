const graphqlHTTP = require('express-graphql');
const root = require('../controllers/test.graphql');
const schema = require('../models/test.graphql');

module.exports = graphqlHTTP({
 schema: schema,
 rootValue: root,
 graphiql: true,
});
