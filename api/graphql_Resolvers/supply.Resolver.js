const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql');

const {UserType} = require('../graphql_typedef/userTypeDef');
const {SuppliesType} = require('../graphql_typedef/suppliesTypeDef.js');
const supplyCtrl = require('../controllers/supply.ctrl');

module.exports = {
    allSupplies: {
        type: new GraphQLList(SuppliesType),
        resolve: async (parent, args) => {
            return await supplyCtrl.getAllSupply();
        },
    },
    addSupplies: {
        type: SuppliesType,
        args: {
            eventId: {type: GraphQLID},
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            quantity: {type: GraphQLInt},
            fulfilled: {type: GraphQLInt},
            OwnerId: {
                // type: new GraphQLList(UserType),
                type: GraphQLID,
            },
        },
        resolve: async (parent, args) => {
            return await supplyCtrl.addSupply(args);
        },
    },
};
