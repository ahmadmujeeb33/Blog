import React, { useState } from 'react';


import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {
    const [loginState, setloginState] = useState({ userName: '', password: '' });
    const [login, { loginError, logindata }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const LoginChange = (event) => {
    const { name, value } = event.target;

    setloginState({
      ...loginState,
      [name]: value,
    });
  };

  // submit form
  const LoginSubmit = async (event) => {
    event.preventDefault();
    

    try {
        const { data } = await login({
            variables: { ...loginState },
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
                    value={loginState.userName}
                    onChange={LoginChange}>
                </input>
                <input
                    name="password"
                    type="password"
                    value={loginState.password}
                    onChange={LoginChange}>
                </input>
                <button
                    className="btn btn-block btn-info"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                    onClick = {LoginSubmit}
                >
                    Submit
                </button>

                
            
            </div>
        
    );
};

export default Login;