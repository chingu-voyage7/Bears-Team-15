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
const {SuppliesType} = require('../graphql_typedef/suppliesTypeDef.js');
const supplyCtrl = require('../controllers/supply.ctrl');


const volunteerInputType= new GraphQLInputObjectType({
        name: 'newVolunteers',
        description: 'blah blah',
                    fields: ()=>({
                        volunteer: {type: GraphQLID},
                        quantity: {type: GraphQLInt}
                    })
    });



module.exports = {
    addSupply: {
        type: SuppliesType,
        args: {
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            quantity: {type: GraphQLInt},
            fulfilled: {type: GraphQLInt},
            // volunteers: {type: new GraphQLList(volunteerInputType)}
        },
        resolve: async (parent, args) => {
            return await supplyCtrl.addSupply(args);
        },
    },
    updateSupply:{
        type: SuppliesType,
        args:{
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        quantity: {type: GraphQLInt},
        fulfilled: {type: GraphQLInt},
        volunteers: {type: new GraphQLList(volunteerInputType)}
        },
        resolve: async(parent,args)=>{
            return await supplyCtrl.updateSupply(args);
        }
        
    },

};
