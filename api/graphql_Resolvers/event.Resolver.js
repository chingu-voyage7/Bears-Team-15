const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');

const {EventType} = require('../graphql_typedef/eventTypeDef');
const eventCtrl = require('../controllers/event.ctrl');

// ! testing
// const {UserType} = require('./user.Resolver');

// ! RESOLVERS -- THIS WILL BE CALLED ON graphql.RootQuery

module.exports = {
  getAllEvents: {
    type: new GraphQLList(EventType),
    resolve: async (parent, args) => {
      return await eventCtrl.getAllEvents();
    }
  },
  addNewEvent: {
    type: EventType,
    args: {
      //   organizerId: {type: GraphQLString},
      organizerId: {type: new GraphQLList(GraphQLID)},
      title: {type: GraphQLString},
      image: {type: GraphQLString},
      description: {type: GraphQLString},
      location: {type: GraphQLString},
      //   attendees: {type: GraphQLString},
      attendeesId: {type: new GraphQLList(GraphQLID)},
      supplies: {type: new GraphQLList(GraphQLID)}
    },
    resolve: async (parent, args) => {
      return await eventCtrl.addEvent(args);
    }
  }
};