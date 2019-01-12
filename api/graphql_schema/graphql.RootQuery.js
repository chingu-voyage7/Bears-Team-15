const {GraphQLObjectType, GraphQLSchema} = require('graphql');

const {
    userGetAll,
    userGet,
    userLogin,
    addUser,
    testQuery,
    currentUser,
} = require('../graphql_Resolvers/user.Resolver.js');

const {
    getAllEvents,
    addNewEvent,
    filterEvent,
} = require('../graphql_Resolvers/event.Resolver.js');

// const {EventType} = require('../graphql_typedef/eventTypeDef.js');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        // ! user resolvers start
        userGetAll,
        userLogin,
        testQuery,
        currentUser,
        userGet,
        // ! user resolvers end
        // ! event query start
        getAllEvents,
        filterEvent,
        // ! event query end
    }),
});

const mutate = new GraphQLObjectType({
    name: 'mutateQuery',
    fields: () => ({
        // ! user start
        addUser,
        // ! user end
        // ! event start
        addNewEvent,
        // ! event end
    }),
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutate,
});
