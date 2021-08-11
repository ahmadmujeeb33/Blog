const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');
const {GraphQLScalarType, Kind} = require('graphql')

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});


const resolvers = {
    Date: dateScalar,


    Query: {
        users: async () => {
          return User.find();
        },
    
        user: async (parent, { userId }) => {
          return User.findOne({ _id: userId });
        },
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id });
          }
          throw new AuthenticationError('You need to be logged in!');
        },
    
    },

    Mutation: {
        addUser: async (parent, { userName, email, password }) => {
          console.log("-----------------------------------")
          const user = await User.create({ userName, email, password });
          const token = signToken(user);
    
          return { token, user };
        },
        login: async (parent, { userName, password }) => {
          const user = await User.findOne({ userName });
    
          if (!user) {
            throw new AuthenticationError('No profile with this email found!');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect password!');
          }

          console.log(user)
    
          const token = signToken(user);
          return { token, user };
        },

        // addPost: async (parent, { title, content}) => {
        //   const post = await Post.create({ title, content});
        //   return post;
        // },
          
          
      }
        
}
module.exports = resolvers;