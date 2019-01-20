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
const {AddressType} = require('./addressTypeDef');
const {UserType} = require('./userTypeDef');
const {SuppliesType} = require('./suppliesTypeDef');
const {getCurrentUser, getUsers} = require('../controllers/users.ctrl');

module.exports = {
    EventType: new GraphQLObjectType({
        name: 'Event',
        fields: () => ({
            id: {type: GraphQLID},
            organizer: {type: UserType},
            orgization: {type: GraphQLString},
            title: {type: GraphQLString},
            image: {type: GraphQLString},
            description: {type: GraphQLString},
            location: {type: AddressType},
            items: {type: GraphQLInt},
            date: {type: GraphQLString},
            attendees: {type: new GraphQLList(UserType)},
            supplies: {type: new GraphQLList(SuppliesType)},
            category: {type: GraphQLString}
            // test: {type: GraphQLString},
            // firstName: {type: GraphQLString},
            // lastName: {type: GraphQLString},
            // ! type relation
            // userRelatedToEvent: {
            //   type: UserType,
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
