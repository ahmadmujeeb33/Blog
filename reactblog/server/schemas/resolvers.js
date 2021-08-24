const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
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
          console.log("theoridfffffffffffsdfkljfasldkf")
          console.log("userName " + userName);
          const userFound = await User.findOne({ userName: userName }).populate('posts');
          console.log("userfound " + userFound);
          return userFound
        },
        me: async (parent, args, context) => {
          console.log("----------------")
          console.log(context.user)
          if (context.user) {
            console.log("in thisss")
            console.log("_id " + context.user._id)
            return User.findOne({ _id: context.user._id }).populate('posts');
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        post: async(parent, {_id}, context) =>{
          console.log("+++++++++++++++++++++++++++++++++++++++++++++++")
          console.log("_id " + _id);
          const post =  await Post.findOne({_id: _id});
          console.log("post " + post);
          return post;
        }
    
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

        addPost: async (parent, { title, content,_id,date_Created}) => {

          console.log("in here");

          console.log("title " + title);
          console.log("content " + content);
          console.log("userId " + _id);
          console.log("date_Created " + date_Created);

          console.log("+=+=+=++++====++==++==++==")

          const postData = await Post.create({title,content,date_Created});

          console.log(postData);

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
            console.log("------------------")

            console.log("in here");

            console.log("title " + title);
            console.log("content " + content);
            console.log("userId " + _id);
            console.log("date_Created " + date_Created);


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
            console.log("updateDate " + updateData)

            return updateData

        },

        deletePost: async (parent, {_id}, context) =>{

          console.log("_id1 " + _id )
          const deleteData = await Post.deleteOne({_id:_id})
          console.log("context.user" + context.user)
          console.log("----------------------")
          console.log("contezxt.fwuse " + context.user._id);
          await User.findByIdAndUpdate(

            {_id:context.user._id},
            {
              $pull: {posts: _id}
            },
            { new: true }

          )
        },

        addFollower: async(parent,args) =>{
          console.log("Args._id " + args._id);
          console.log("followers " + args.follower);
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

          
        }
      }
        
}
module.exports = resolvers;