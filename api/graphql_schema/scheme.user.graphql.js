const {
 GraphQLObjectType,
 GraphQLString,
 GraphQLInt,
 GraphQLSchema,
} = require('graphql');

const UserType = new GraphQLObjectType({
 name: 'User',
 fields: () => ({
  id: {type: GraphQLInt},
  name: {type: GraphQLString},
 }),
});

// this will be the query root. to query the user info it should be done with this syntax user(id:){}
const UserQuery = new GraphQLObjectType({
 name: 'RootQuery',
 fields: {
  user: {
   type: UserType,
   args: {id: {type: GraphQLInt}},
   resolve(parent, args) {
    // code to get data in db mongodb query goes here.
   },
  },
 },
});

module.exports = new GraphQLSchema({
 query: UserQuery,
});
