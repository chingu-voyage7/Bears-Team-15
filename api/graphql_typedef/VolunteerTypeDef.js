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

module.exports={
    VolunteerType: new GraphQLObjectType({
            name: 'volunteer',
            fields: ()=>({
                id: {type: GraphQLID},
        volunteer: {type: UserType},
        quantity: {type: GraphQLInt} 
    })
})
};