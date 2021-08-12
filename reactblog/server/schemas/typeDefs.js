const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type User {
    _id: ID!
    userName: String
    email: String
    password: String
    totalPosts: [Post]
  }

  type Post{
    _id: ID!
    title: String
    content: String
    date_Created:String
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
  }
  
  type Mutation {
    addUser(userName: String!, email: String!, password:String!): Auth
    login(userName: String!, password: String!):Auth
    addPost(title: String,content:String,userId: ID, date_Created:String):User 
  }
`;

module.exports = typeDefs;

// addPost(title: String!, content:String!,date_Created:Date!)