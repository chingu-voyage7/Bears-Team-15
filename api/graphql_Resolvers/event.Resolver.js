const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLScalarType
    
} = require('graphql');
const {Kind} = require('graphql/language');
const {UserType} = require('../graphql_typedef/userTypeDef');
const {EventType} = require('../graphql_typedef/eventTypeDef');
const {SuppliesType} = require('../graphql_typedef/suppliesTypeDef.js');
const eventCtrl = require('../controllers/event.ctrl');
const {AddressType} = require('../graphql_typedef/addressTypeDef');
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
            id: {type: GraphQLString},
        },
        resolve: async (parent, args) => {
            return await eventCtrl.getEventById(args);
        },
    },
    addNewEvent: {
        type: EventType,
        args: {
            //   organizerId: {type: GraphQLString},
            organizer: {type: GraphQLID},
            organization: {type: GraphQLString},
            title: {type: GraphQLString},
            image: {type: GraphQLString},
            description: {type: GraphQLString},
            location: {
                type: new GraphQLInputObjectType({
                    name: 'inputLocation',
                    fields: () => ({
                        address: {type: GraphQLString},
                        city: {type: GraphQLString},
                        state: {type: GraphQLString},
                        zip: {type: GraphQLInt},
                        country: {type: GraphQLString},
                    }),
                }),
            },
            date: {type: new GraphQLScalarType({
                name: 'date',
                description: 'Date custom scalar type',
                parseValue(value) {
                    console.log(value);
                  return new Date(value); // value from the client
                },
                serialize(value) {
                  return value.getTime(); // value sent to the client
                },
                parseLiteral(ast) {
                  if (ast.kind === Kind.INT) {
                    return new Date(ast.value).toDateString(); // ast value is always in string format
                  }
                  return null;
                },

            })},


            //   attendees: {type: GraphQLString},
            attendees: {type: new GraphQLList(GraphQLID)},
            category: {type: GraphQLString},
            // supplies: {type: new GraphQLList(SuppliesType)},
        },
        resolve: async (parent, args) => {
            console.log('backend-args:',args);
            return await eventCtrl.addEvent(args);
        },
    },
    filterEvent: {
        type: new GraphQLList(EventType),
        args: {
            char: {type: GraphQLString},
        },
        resolve: async (parent, args) => {
            return await eventCtrl.filteredEventWith(args);
        },
    },
    deleteEvent: {
        type: UserType,
        args: {
            eventId: {type: GraphQLID},
            userId: {type: GraphQLID},
        },
        resolve: async (parent, args) => {
            return await eventCtrl.deleteEvent(args);
        },
    },
    updateEvent: {
        type: EventType,
        args: {
            id: {type: GraphQLID},
            title: {type: GraphQLString},
            organization: {type: GraphQLString},
            description: {type: GraphQLString},
            date: {type: GraphQLInt},
            location: {
                type: new GraphQLInputObjectType({
                    name: 'updateLocation',
                    fields: () => ({
                        address: {type: GraphQLString},
                        city: {type: GraphQLString},
                        state: {type: GraphQLString},
                        zip: {type: GraphQLInt},
                        country: {type: GraphQLString},
                    }),
                }),
            },
        },
        resolve: async (parent, args) => {
            
            return await eventCtrl.updateEvent(args);
        },
    },
};
