const {GraphQLObjectType, GraphQLSchema} = require('graphql');

const {
 userGetAll,
 userLogin,
 addUser
} = require('../graphql_Queries/user.Queries/user.Query.js');

const RootQuery = new GraphQLObjectType({
 name: 'RootQuery',
 fields: {
  userGetAll,
  userLogin
 }
});

const mutate = new GraphQLObjectType({
 name: 'userAdd',
 fields: {
  addUser
 }
});

module.exports = new GraphQLSchema({
 query: RootQuery,
 mutation: mutate
});
