const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    // errors: { type: GraphQLString },
    test: { type: GraphQLString }, // testing query
    statusCode: { type: GraphQLInt },
    isSuccess: { type: GraphQLBoolean },
    msg: { type: GraphQLString }
  })
});

const usersCtrl = require('../../controllers/users.ctrl.js');

module.exports = {
  userGetAll: {
    type: new GraphQLList(UserType),
    // no arguments because where getting every user in the db
    // args: {id: {type: GraphQLID}},
    resolve(parent, args) {
      // code to get data in db mongodb query goes here.
      return usersCtrl.getUsers();
    }
  },
  userLogin: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
      return usersCtrl
        .loginUser(args)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          console.log(statusCode, isSuccess);
          return error;
        });
    }
  },
  addUser: {
    type: UserType,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      passwordTwo: { type: GraphQLString }
    },
    resolve(parent, args) {
      const newUser = {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: args.password,
        passwordTwo: args.passwordTwo
      };
      return usersCtrl
        .registerUser(newUser)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
    }
  },
  testQuery: {
    type: UserType,
    resolve(parent, args) {
      return {
        test: "testing"
      };
    }
  }
};
