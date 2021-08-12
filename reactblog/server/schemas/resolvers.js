const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const db = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');
const {GraphQLScalarType, Kind} = require('graphql')


const resolvers = {
  
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

        addPost: async (parent, { title, content,userId,date_Created}) => {

          console.log("in here");

          console.log("title " + title);
          console.log("content " + content);
          console.log("userId " + userId);
          console.log("date_Created " + date_Created);

          const postData = await Post.create({title,content,date_Created});

          console.log(postData);

          await User.findOneAndUpdate(
            { _id: userId },
            {
              $push: { posts: postData._id},
            },
            {
              new: true,
              runValidators: true,
            }

           )

        },
          
          
      }
        
}
module.exports = resolvers;