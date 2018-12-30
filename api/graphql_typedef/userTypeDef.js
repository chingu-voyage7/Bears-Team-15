const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql');

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
        }),
    }),
};
