const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql');

// const {EventType} = require('./eventTypeDef');
const {getAllEvents, getEventWithUserId} = require('../controllers/event.ctrl');

module.exports = {
    UserType: new GraphQLObjectType({
        name: 'User',
        fields: () => ({
            id: {type: GraphQLID},
            firstName: {type: GraphQLString},
            lastName: {type: GraphQLString},
            email: {type: GraphQLString},
            token: {type: GraphQLString},
            // errors: { type: GraphQLString },
            test: {type: GraphQLString}, // testing query
            statusCode: {type: GraphQLInt},
            isSuccess: {type: GraphQLBoolean},
            msg: {type: GraphQLString},
            event: {type: GraphQLString},
            eventRelatedToUser: {
                // TODO: fuck this shit!!!
                type: require('./eventTypeDef').EventType,
                resolve: async (parent, args) => {
                    // console.log(parent.event, 'parent');
                    const event = {
                        event: parent.event,
                    };
                    return await getEventWithUserId(event);
                },
            },
        }),
    }),
};
