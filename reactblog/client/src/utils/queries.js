import { gql } from '@apollo/client';



export const QUERY_USERS = gql`
  query allUsers {
    users {
      userName
      email
      password
    }
  }
`;

export const QUERY_SINGLE_USERS = gql`
  query singleUser($_id: ID!) {
    user(_id: $_id) {
      userName
      email
      password
    }
  }
`;

export const QUERY_ME = gql`
 {
    me {
      _id
      userName
      email
      password
      posts{
        _id
        title
        content
        date_Created
      }  

    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query singlePost($_id: ID!) {
    post(_id: $_id) {
      title
      content
      date_Created
    }
  }
`;
