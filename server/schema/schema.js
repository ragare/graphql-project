const graphql = require('graphql');
const _ = require('lodash');


var usersData = [
    {id:'1', name: 'Bond', age: 36, profession: 'Consultant'},
    {id:'13', name: 'Anna', age: 26, profession: 'Professional killer'},
    {id:'211', name: 'Bella', age: 16, profession: 'Rugby player'},
    {id:'19', name: 'Gina', age: 26, profession: 'Doctor'},
    {id:'150', name: 'Georgina', age: 36, profession: 'Baker'}
];

var hobbiesData = [
    {id:'1', title:'Programming', description:'Desc programming'},
    {id:'2', title:'Rowing', description:'Desc rowing'},
    {id:'3', title:'Swimming', description:'Desc swimming'},
    {id:'4', title:'Fencing', description:'Desc fencing'},
    {id:'5', title:'Haking', description:'Desc haking'}
]


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

// Create types

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Documentation for hobby',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})


// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description for root query...',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(usersData, {id: args.id});
            }
        },
        hobby: {
            type: HobbyType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(hobbiesData, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    description: 'This is the general documentation',
    query: RootQuery
})