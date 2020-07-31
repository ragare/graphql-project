const graphql = require('graphql');
const _ = require('lodash');

const User = require('../model/user');
const Hobby = require('../model/hobby');
const Post = require('../model/post');


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
                return Post.find({ userId: parent.id });
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return Hobby.find({ userId: parent.id });
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
                return User.findById(parent.userId);
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
                return User.findById(parent.userId);
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
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find();
            }
        },
        hobby: {
            type: HobbyType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Hobby.findById(args.id);
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return Hobby.find();
            }
        },
        post: {
            type: PostType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Post.findById(args.id);
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find();
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
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString }
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                });
                // save to our db
                user.save();
                return user;
            }
        },
        createPost: {
            type: PostType,
            args: {
                comment: { type: GraphQLString },
                userId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let post = new Post({
                    comment: args.comment,
                    userId: args.userId
                });
                post.save();
                return post;
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let hobby = new Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                });
                hobby.save();
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