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
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    error: { type: GraphQLString },
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
        .then(({ token, statusCode, isSuccess, msg }) => {
          return { token, statusCode, isSuccess, msg };
        })
        .catch(({ statusCode, isSuccess, msg }) => {
          console.log(statusCode, isSuccess);
          return { statusCode, isSuccess, msg };
        });
    }
  },
  addUser: {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    resolve(parent, args) {
      const newUser = {
        name: args.name,
        email: args.email,
        password: args.password
      };
      return usersCtrl
        .registerUser(newUser)
        .then((result) => result)
        .catch((err) => {
          return { error: err };
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
