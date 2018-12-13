const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    error: { type: GraphQLString },
    test: { type: GraphQLString }
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
      console.log(args, 'args backend')
      return usersCtrl
        .loginUser(args)
        .then((result) => {
          // this results return bearer and token
          console.log(result)
          return result;
        })
        .catch((err) => {
          return { token: 'Incorrect Credentials' };
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
