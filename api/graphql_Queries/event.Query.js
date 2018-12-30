const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql');

const eventType = new GraphQLObjectType({
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
});

const eventCtrl = require('../controllers/event.ctrl');

// ! testing
const {UserType} = require('./user.Query');

// ! RESOLVERS -- THIS WILL BE CALLED ON graphql.RootQuery

module.exports = {
    getAllEvents: {
        type: new GraphQLList(eventType),
        async resolve(parent, args) {
            console.log(parent, 'parent');
            return await eventCtrl.getAllEvents();
        },
    },
    addNewEvent: {
        type: eventType,
        args: {
            organizer: {type: GraphQLString},
            title: {type: GraphQLString},
            image: {type: GraphQLString},
            description: {type: GraphQLString},
            location: {type: GraphQLString},
            // items: {type: GraphQLInt},
        },
        // async resolve(parent, args) {
        //     console.log(parent, 'parent');
        //     return await eventCtrl.addEvent(args);
        //     // const test = await eventCtrl.addEvent(args);
        //     // console.log(test, 'test');
        // },
    },
};
