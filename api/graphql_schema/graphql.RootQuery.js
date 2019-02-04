const {GraphQLObjectType, GraphQLSchema} = require('graphql');

const {
    userGetAll,
    getUser,
    userLogin,
    addUser,
    testQuery,
    currentUser,
} = require('../graphql_Resolvers/user.Resolver.js');

const {
    getAllEvents,
    getEventById,
    addNewEvent,
    filterEvent,
    deleteEvent,
    updateEvent,
    attendEvent,
    unAttendEvent,
} = require('../graphql_Resolvers/event.Resolver.js');

const {addSupplies} = require('../graphql_Resolvers/supply.Resolver');

// const {EventType} = require('../graphql_typedef/eventTypeDef.js');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        // ! user resolvers start
        userGetAll,
        userLogin,
        testQuery,
        currentUser,
        getUser,

        // ! user resolvers end
        // ! event query start
        getEventById,
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
        deleteEvent,
        updateEvent,
        attendEvent,
        unAttendEvent,
        // ! event end
        // ! supply start
        addSupplies,
        // ! supply end
    }),
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutate,
});
