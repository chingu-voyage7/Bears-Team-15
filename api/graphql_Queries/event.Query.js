const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql');

const eventType = new GraphQLObjectType({
    name: 'event',
    fields: () => ({
        id: {type: GraphQLID},
        organizer: {type: GraphQLString},
        title: {type: GraphQLString},
        image: {type: GraphQLString},
        description: {type: GraphQLString},
        location: {type: GraphQLString},
        items: {type: GraphQLInt},
        test: {type: GraphQLString},
    }),
});

const eventCtrl = require('../controllers/event.ctrl');

// ! RESOLVERS -- THIS WILL BE CALLED ON graphql.RootQuery

module.exports = {
    getAllEvents: {
        type: eventType,
        resolve(parent, args) {
            return eventCtrl.getAllEvents();
        },
    },
};
