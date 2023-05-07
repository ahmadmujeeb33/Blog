const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment } = require('../models');
const db = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');
const {GraphQLScalarType, Kind, PossibleTypeExtensionsRule} = require('graphql')


const resolvers = {
  
    Query: {
        users: async () => {
          return User.find();
        },
    
        user: async (parent, { userName }) => {
          const userFound = await User.findOne({ userName: userName }).populate('posts');
          return userFound
        },
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('posts');
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        post: async(parent, {_id}, context) =>{
          const post =  await Post.findOne({_id: _id}).populate('comments');
          return post;
        }
    
    },

    Mutation: {
        addUser: async (parent, { userName, email, password }) => {
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

    
          const token = signToken(user);
          return { token, user };
        },

        addPost: async (parent, { title, content,_id,date_Created}) => {

          const postData = await Post.create({title,content,date_Created});


          await User.findOneAndUpdate(
            { _id: _id },
            {
              $push: { posts: postData._id},
            },
            {
              new: true,
              runValidators: true,
            }

           )

        },

        updatePost: async (parent, { title, content,_id,date_Created}) => {
           
            const updateData = await Post.findOneAndUpdate(
              { _id: _id },
              {
                $set: {title: title, content:content, date_Created: date_Created},
              },
              {
                new: true,
                runValidators: true,
              }
            )

            return updateData

        },

        deletePost: async (parent, {_id}, context) =>{

          const deleteData = await Post.deleteOne({_id:_id})
         
          await User.findByIdAndUpdate(

            {_id:context.user._id},
            {
              $pull: {posts: _id}
            },
            { new: true }

          )
        },

        addFollower: async(parent,args) =>{
         
          return await User.findOneAndUpdate(
            { _id: args._id },
            {
              $push: { followers: args.follower},
            },
            {
              new: true,
              runValidators: true,
            }

          )

          
        },


        addComment: async (parent, {content,_id,date_Created,userName}) => {

         

          const commentData = await Comment.create({content,date_Created,userName});


          const data = await Post.findOneAndUpdate(
            { _id: _id },
            {
              $push: { comments: commentData._id},
            },
            {
              new: true,
              runValidators: true,
            }

           )

          return data;

        },
      }
        
}
module.exports = resolvers;
