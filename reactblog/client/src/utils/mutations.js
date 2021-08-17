import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      token
      user {
        _id
      }
    }
  }
  `;

export const ADD_USER = gql`
    mutation addUser($userName: String!, $email: String!, $password: String!) {
      addUser(userName: $userName, email: $email, password: $password) {
        token
        user {
          _id
          userName
        }
      }
    }
`;

export const ADD_POST = gql`

mutation addPost ($title: String, $content: String, $_id: ID,$date_Created: String){
  addPost(title:$title, content:$content,_id: $_id,date_Created:$date_Created){
  	_id
    posts{
      _id
      title
      content
      date_Created
    }  
  }
}

`;

export const DELETE_POST = gql`

  mutation( $_id: ID){
    deletePost(_id: $_id){
      _id
      
    }
  }
`


export const UPDATE_POST = gql`
  mutation($title: String, $content: String, $_id: ID,$date_Created: String){
    updatePost(title:$title, content:$content,_id: $_id,date_Created:$date_Created){
      _id
      title
      content
      date_Created
      
    }
  }
`