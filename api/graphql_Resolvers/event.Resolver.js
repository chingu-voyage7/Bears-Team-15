const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql');

const {EventType} = require('../graphql_typedef/eventTypeDef');
const eventCtrl = require('../controllers/event.ctrl');

// const eventType = new GraphQLObjectType({
//     name: 'Event',
//     fields: () => ({
//         id: {type: GraphQLID},
//         organizer: {type: GraphQLString},
//         title: {type: GraphQLString},
//         image: {type: GraphQLString},
//         description: {type: GraphQLString},
//         location: {type: GraphQLString},
//         items: {type: GraphQLInt},
//         date: {type: GraphQLString},
//         test: {type: GraphQLString},
//         // ! type relation
//         userRelatedToEvent: {
//             type: UserType,
//             resolve(parent, args) {
//                 console.log(parent, 'yooow');
//                 return {id: 'mia khalifa'};
//             },
//         },
//     }),
// });

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
    addNewEvent: {
        type: EventType,
        args: {
            organizer: {type: GraphQLString},
            title: {type: GraphQLString},
            image: {type: GraphQLString},
            description: {type: GraphQLString},
            location: {type: GraphQLString},
            // items: {type: GraphQLInt},
        },
        resolve: async (parent, args) => {
            return await eventCtrl.addEvent(args);
        },
    },
};
