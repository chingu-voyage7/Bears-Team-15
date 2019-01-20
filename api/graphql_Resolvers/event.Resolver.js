const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLInputObjectType
} = require('graphql');
const {UserType} = require('../graphql_typedef/userTypeDef');
const {EventType} = require('../graphql_typedef/eventTypeDef');
const {SuppliesType} = require('../graphql_typedef/suppliesTypeDef.js');
const eventCtrl = require('../controllers/event.ctrl');
const { AddressType } = require('../graphql_typedef/addressTypeDef');
// ! testing
// const {UserType} = require('./user.Resolver');

// ! RESOLVERS -- THIS WILL BE CALLED ON graphql.RootQuery

module.exports = {
    getAllEvents: {
        type: new GraphQLList(EventType),
        resolve: async (parent, args) => {
            return await eventCtrl.getAllEvents();
        },
    },
    getEventById: {
        type: EventType,
        args: {
            id: { type: GraphQLString }
        },
        resolve: async (parent, args) => {
            return await eventCtrl.getEventById(args);
        },
    },
    addNewEvent: {
        type: EventType,
        args: {
            //   organizerId: {type: GraphQLString},
            organizer: { type: GraphQLID },
            title: { type: GraphQLString },
            image: { type: GraphQLString },
            description: { type: GraphQLString },
            location: { type: new GraphQLInputObjectType({
                    name: 'inputLocation',
                    fields: () => ({
                      address: {type: GraphQLString},
                      city: {type: GraphQLString},
                      state: {type: GraphQLString},
                      zip: {type: GraphQLInt},
                      country:{type: GraphQLString}
                    })
            })},
            //   attendees: {type: GraphQLString},
            attendees: {type: new GraphQLList(GraphQLID)},
            // supplies: {type: new GraphQLList(SuppliesType)},
        },
        resolve: async (parent, args) => {
            console.log(parent);
            return await eventCtrl.addEvent(args);
        },
    },
    filterEvent: {
        type: new GraphQLList(EventType),
        args: {
            char: { type: GraphQLString },
        },
        resolve: async (parent, args) => {
            return await eventCtrl.filteredEventWith(args);
        },
    },
};
