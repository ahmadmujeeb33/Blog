import React, { useState } from 'react';


import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import '../styles/LoginSignUp.css';

const Signup = () => {
  const [formState, setFormState] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const SignUpChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const SignUpSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
        
            <div>
                
                <div className = "inputContainer">
                  <h4>SignUp</h4>
                  <input
                      name="userName"
                      type="text"
                      value={formState.userName}
                      onChange={SignUpChange}
                      placeholder = "Username">
                  </input>
                  <input
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={SignUpChange}
                      placeholder = "Email">
                  </input>
                  <input
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={SignUpChange}
                      placeholder = "Password">
                      
                  </input>
                  <button
                      className="btn btn-block btn-info"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                      onClick = {SignUpSubmit}
                  >
                      Sign Up
                  </button>

                </div>
                
            
            </div>
        
    );
};

export default Signup;