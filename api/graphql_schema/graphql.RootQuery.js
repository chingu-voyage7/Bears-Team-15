const {GraphQLObjectType, GraphQLSchema} = require('graphql');

const {
    userGetAll,
    userLogin,
    addUser,
    testQuery,
    currentUser,
} = require('../graphql_Queries/user.Query.js');

const {getAllEvents} = require('../graphql_Queries/event.Query.js');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        // ! user resolvers start
        userGetAll,
        userLogin,
        testQuery,
        currentUser,
        // ! user resolvers end
        // ! event query start
        getAllEvents,
        // ! event query end
    },
});

const mutate = new GraphQLObjectType({
    name: 'mutateQuery',
    fields: {
        addUser,
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutate,
});
