const {
 GraphQLObjectType,
 GraphQLString,
 GraphQLList,
 GraphQLSchema,
 GraphQLID,
} = require('graphql');

const usersCtrl = require('../controllers/users.ctrl');

// this will be the schema of the user
const UserType = new GraphQLObjectType({
 name: 'User',
 fields: () => ({
  id: {type: GraphQLID},
  name: {type: GraphQLString},
  email: {type: GraphQLString},
  password: {type: GraphQLString},
  token: {type: GraphQLString},
 }),
});

// this will be the query root. to query the user info it should be done with this syntax user(id:){}
const RootQuery = new GraphQLObjectType({
 name: 'RootQuery',
 fields: {
  userLogin: {
   type: UserType,
   args: {email: {type: GraphQLString}, password: {type: GraphQLString}},
   resolve(parent, args) {
    // TODO: query users here!!!!
    // code to get data in db mongodb query goes here.
    return usersCtrl
     .loginUser(args)
     .then((result) => {
      // this results return bearer and token
      return result;
     })
     .catch((err) => {});
   },
  },
  userGetAll: {
   type: new GraphQLList(UserType),
   // no arguments because where getting every user in the db
   // args: {id: {type: GraphQLID}},
   resolve(parent, args) {
    // code to get data in db mongodb query goes here.
    return usersCtrl.getUsers();
   },
  },
 },
});

const mutateUser = new GraphQLObjectType({
 name: 'userAdd',
 // fields property will be the function to add or delete a user
 fields: {
  addUser: {
   type: UserType,
   args: {
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
   },
   resolve(parent, args) {
    return usersCtrl.registerUser();
   },
  },
 },
});

module.exports = new GraphQLSchema({
 query: RootQuery,
});
