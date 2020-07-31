const graphql = require('graphql');
const _ = require('lodash');


var usersData = [
    { id: '1', name: 'Bond', age: 36, profession: 'Consultant' },
    { id: '13', name: 'Anna', age: 26, profession: 'Professional killer' },
    { id: '211', name: 'Bella', age: 16, profession: 'Rugby player' },
    { id: '19', name: 'Gina', age: 26, profession: 'Doctor' },
    { id: '150', name: 'Georgina', age: 36, profession: 'Baker' }
];

var hobbiesData = [
    { id: '1', title: 'Programming', description: 'Desc programming', userId: '1' },
    { id: '2', title: 'Rowing', description: 'Desc rowing', userId: '1' },
    { id: '3', title: 'Swimming', description: 'Desc swimming', userId: '13' },
    { id: '4', title: 'Fencing', description: 'Desc fencing', userId: '211' },
    { id: '5', title: 'Haking', description: 'Desc haking', userId: '150' }
];

var postData = [
    { id: '1', comment: 'Very nice', userId: '1' },
    { id: '2', comment: 'Amazing thing', userId: '1'},
    { id: '3', comment: 'I cant belive it 19', userId: '19'},
    { id: '4', comment: 'I cant belive it 211', userId: '211'},
    { id: '5', comment: 'I cant belive it 13', userId: '13'},
]


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

// Create types

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, {userId: parent.id});
            }
        },
        hobbies: { 
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, {userId: parent.id});
            }
        }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Documentation for hobby',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId});
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Documentation for post...',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId});
            }
        }
    })
});


// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description for root query...',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(usersData, { id: args.id });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return usersData;
            }
        },
        hobby: {
            type: HobbyType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(hobbiesData, { id: args.id });
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbiesData;
            }
        },
        post: {
            type: PostType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(postData, { id: args.id });
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postData;
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLID}
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString}
            },
            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user;
            }
        },
        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID}
                comment: { type: GraphQLString },
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId
                }
                return post;
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                // id: {type: GraphQLID}
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                }
                return hobby;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    description: 'This is the general documentation',
    query: RootQuery,
    mutation: Mutation
})