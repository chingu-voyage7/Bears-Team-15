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
    SuppliesType: new GraphQLObjectType({
        name: 'Supplies',
        fields: () => ({
            id: {type: GraphQLID},
            eventId: {type: GraphQLID},
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            quantity: {type: GraphQLInt},
            OwnerId: {
                // type: new GraphQLList(UserType),
                type: GraphQLID,
            },
        }),
    }),
};
