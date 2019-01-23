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



module.exports = {
  AddressType: new GraphQLObjectType({
      name: 'Location',
      fields: () => ({
        address: {type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        zip: {type: GraphQLInt},
        country:{type: GraphQLString}
      }),
  }),
};