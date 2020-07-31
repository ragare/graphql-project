const graphql = require('graphql');
const _ = require('lodash');


const {
    GraphQLObjectType,
    GraphQLSchema
} = graphql;


// Scalar Types
const Person = new GraphQLObjectType({
    
})

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description for root query...',

});

module.exports = new GraphQLSchema({
    description: 'This is the general documentation',
    query: RootQuery
})