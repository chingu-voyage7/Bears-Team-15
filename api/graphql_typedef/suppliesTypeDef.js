const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql');

// const {EventType} = require('./eventTypeDef.js');

module.exports = {
    SuppliesType: new GraphQLObjectType({
        name: 'Supplies',
        fields: () => ({
            id: {type: GraphQLID},
            eventId: {type: GraphQLID},
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            quantity: {type: GraphQLInt},
            event: {
                type: new GraphQLList(require('./eventTypeDef.js').EventType),
            },
            OwnerId: {
                // type: new GraphQLList(UserType),
                type: GraphQLID,
            },
            //  eventWithSupplies: {
            //   type: require('./eventTypeDef.js').EventType,
            //   resolve: async (parent, args) => {
            //     console.log("myData:",parent.attendeesId);
            //     // const id = {
            //     //   id: parent.organizerId
            //     // };
            //     return await getCurrentUser(id);
            //   }
            // }
        }),
    }),
};
