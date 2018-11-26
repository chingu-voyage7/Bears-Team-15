const graphqlHTTP = require('express-graphql');
const {root} = require('../controllers/test.graphql');
const {helloScheme} = require('../models/test.graphql');

module.exports = graphqlHTTP({
 schema: helloScheme,
 rootValue: root,
 graphiql: true,
});

// module.exports = graphqlHTTP({
//  foo: {
//   schema: helloScheme,
//   rootValue: root,
//   graphiql: true,
//  },
//  // bar: {
//  //  schema: testScheme,
//  //  rootValue: test,
//  //  graphiql: true,
//  // },
// });
