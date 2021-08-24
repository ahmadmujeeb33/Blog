const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type User {
    _id: ID!
    userName: String
    email: String
    password: String
    posts: [Post]
    followers: [String]!
  }

  type Post{
    _id: ID
    title: String
    content: String
    date_Created:String
    comments: [Comment]
  }

  type Comment{
    _id: ID
    content: String
    date_Created:String
  }


  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(userName: String): User
    me: User
    post(_id:ID!):Post
  }
  
  type Mutation {
    addUser(userName: String!, email: String!, password:String!): Auth
    login(userName: String!, password: String!):Auth
    addPost(title: String,content:String, _id: ID, date_Created:String):User 
    updatePost(title: String,content:String, _id: ID, date_Created:String):Post
    deletePost( _id: ID):Post
    addFollower(_id: ID!, follower: String!):User
    addComment(_id: ID, content: String,date_Created:String):User
  }
`;

module.exports = typeDefs;

// addPost(title: String!, content:String!,date_Created:Date!)