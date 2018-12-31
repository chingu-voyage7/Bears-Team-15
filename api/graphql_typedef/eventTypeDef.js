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
const {getCurrentUser, getUsers} = require('../controllers/users.ctrl');

module.exports = {
    EventType: new GraphQLObjectType({
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
                resolve: async (parent, args) => {
                    const id = {
                        id: parent.organizer,
                    };
                    const test = await getCurrentUser(id);
                    // console.log(Buffer.from(test._id.id).toString());
                    return {...test, ...id};
                },
            },
        }),
    }),
};
