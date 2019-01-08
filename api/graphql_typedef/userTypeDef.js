const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');

// const {EventType} = require('./eventTypeDef');
const {
  getAllEvents,
  getEventWithEventId
} = require('../controllers/event.ctrl');

module.exports = {
  UserType: new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: {type: GraphQLID},
      firstName: {type: GraphQLString},
      lastName: {type: GraphQLString},
      email: {type: GraphQLString},
      age: {type: GraphQLInt},
      token: {type: GraphQLString},
      image: {type: GraphQLString},
      phone: {type: GraphQLInt},
      address: {type: GraphQLString},
      eventsId: {type: new GraphQLList(GraphQLID)}, // <-- this will be the query for userRelatedToUser
      statusCode: {type: GraphQLInt},
      isSuccess: {type: GraphQLBoolean},
      msg: {type: GraphQLString},
      test: {type: GraphQLString}, // testing query
      // errors: { type: GraphQ LString },
      eventRelatedToUser: {
        // TODO: fuck this shit!!!
        type: require('./eventTypeDef').EventType,
        resolve: async (parent, args) => {
          const event = {
            event: parent.eventsId
          };
          return await getEventWithEventId(event);
        }
      }
    })
  })
};