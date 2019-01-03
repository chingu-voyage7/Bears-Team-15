const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');

const usersCtrl = require('../controllers/users.ctrl.js');
const {UserType} = require('../graphql_typedef/userTypeDef.js');

module.exports = {
  userGetAll: {
    type: new GraphQLList(UserType),
    // no arguments because where getting every user in the db
    // args: {id: {type: GraphQLID}},
    resolve: async (parent, args) => {
      // code to get data in db mongodb query goes here.
      return await usersCtrl.getUsers();
    }
  },
  userLogin: {
    type: UserType,
    args: {
      email: {type: new GraphQLNonNull(GraphQLString)},
      password: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (parent, args) => {
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
      firstName: {type: GraphQLString},
      lastName: {type: GraphQLString},
      email: {type: GraphQLString},
      password: {type: GraphQLString},
      passwordTwo: {type: GraphQLString},
      age: {type: GraphQLInt},
      phone: {type: GraphQLInt},
      address: {type: GraphQLString}
    },
    resolve: (parent, args) => {
      const newUser = {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: args.password,
        passwordTwo: args.passwordTwo,
        age: args.age,
        phone: args.phone,
        address: args.address
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
  currentUser: {
    type: UserType,
    args: {
      id: {type: GraphQLString}
    },
    resolve: async (parent, args) => {
      return await usersCtrl.getCurrentUser(args);
    }
  },
  testQuery: {
    type: UserType,
    resolve: (parent, args) => {
      return {
        test: 'testing'
      };
    }
  }
};