import React, { useState } from 'react';


import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

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
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.log("++++++++++++++++++++++++++++++++++++++++++++======")
      console.error(e);
    }
  };

  return (
        
            <div>
                <input
                    name="userName"
                    type="text"
                    value={formState.userName}
                    onChange={SignUpChange}>
                </input>
                <input
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={SignUpChange}>
                </input>
                <input
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={SignUpChange}>
                </input>
                <button
                    className="btn btn-block btn-info"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                    onClick = {SignUpSubmit}
                >
                    Submit
                </button>
            
            </div>
        
    );
};

export default Signup;