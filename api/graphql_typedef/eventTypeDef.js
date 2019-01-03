const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');

const {UserType} = require('./userTypeDef');
const {getCurrentUser, getUsers} = require('../controllers/users.ctrl');

module.exports = {
  EventType: new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
      id: {type: GraphQLID},
      organizerId: {type: new GraphQLList(GraphQLID)},
      title: {type: GraphQLString},
      image: {type: GraphQLString},
      description: {type: GraphQLString},
      location: {type: GraphQLString},
      items: {type: GraphQLInt},
      date: {type: GraphQLString},
      attendeesId: {type: new GraphQLList(GraphQLID)},
      supplies: {type: new GraphQLList(GraphQLString)},
      test: {type: GraphQLString},
      // ! type relation
      userRelatedToEvent: {
        type: UserType,
        resolve: async (parent, args) => {
          const id = {
            id: parent.organizerId
          };
          return await getCurrentUser(id);
        }
      }
    })
  })
};