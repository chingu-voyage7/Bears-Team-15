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
   const {UserType} = require('./userTypeDef');
 const {VolunteerType}= require('./VolunteerTypeDef')

module.exports = {
    SuppliesType: new GraphQLObjectType({
        name: 'Supplies',
        fields: () => ({
            id: {type: GraphQLID},
            // eventId: {type: GraphQLID},
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            quantity: {type: GraphQLInt},
            // event: {
            //     type: new GraphQLList(require('./eventTypeDef.js').EventType),
            // },
            volunteers: {type: new GraphQLList(VolunteerType)}
            })
         
        }),
};
