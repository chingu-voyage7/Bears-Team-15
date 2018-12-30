const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql');

const {UserType} = require('./userTypeDef');

module.exports = {
    eventType: new GraphQLObjectType({
        name: 'Event',
        fields: () => ({
            id: {type: GraphQLID},
            organizer: {type: GraphQLString},
            title: {type: GraphQLString},
            image: {type: GraphQLString},
            description: {type: GraphQLString},
            location: {type: GraphQLString},
            items: {type: GraphQLInt},
            date: {type: GraphQLString},
            test: {type: GraphQLString},
            // ! type relation
            userRelatedToEvent: {
                type: UserType,
                resolve(parent, args) {
                    console.log(parent, 'yooow');
                    return {id: 'mia khalifa'};
                },
            },
        }),
    }),
};
